import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from "axios";
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = "a76e9f32c4a0a9e7r8y5g6r4e8f9g6dgb271f51aa9785d29a3b1d4a76e9f32c4a7f400f6c1820a97856b7f400fef12ab08c7f630ec15b3d866a148634b43dfe3dc1820a978564e896db2"; // Replace with your secure key

// Utility functions for encryption and decryption
const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
};

const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const VerifyOTP = () => {
    const [otpData, setOtpData] = useState({
        email: localStorage.getItem('emailid'),
        otp: '',
        recaptchaToken: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setOtpData({
            ...otpData,
            [e.target.name]: e.target.value
        });
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            // Encrypt the data before sending
            const encryptedData = encryptData(otpData);

            // Send the encrypted data to the backend
            const response = await axios.post(
                'http://localhost:5000/moox_events/api/auth/verify-otp',
                { encryptedData }
            );

            // Decrypt the response data
            const decryptedResponse = decryptData(response.data.encryptedData);
            setSuccessMessage(decryptedResponse.message); // OTP verification success message

            if (decryptedResponse.message === 'Login successful') {
                localStorage.clear();
                localStorage.setItem('token', decryptedResponse.token);
                localStorage.setItem('userid', decryptedResponse.id);
                localStorage.setItem('emailid', decryptedResponse.email);
                localStorage.setItem('mobileno', decryptedResponse.mobile);
                localStorage.setItem('name', decryptedResponse.name);
                window.location.href='/admin';
            } else {
                window.location.reload();
            }
        } catch (error) {
            const decryptedErrorMessage = error.response?.data?.encryptedData
                ? decryptData(error.response.data.encryptedData).message
                : 'OTP verification error';
            setErrorMessage(decryptedErrorMessage);
        }
    };

    const handleRecaptchaChange = (token) => {
        setOtpData({ ...otpData, recaptchaToken: token });
    };

    return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
      Verify OTP
    </h2>
    <form onSubmit={handleVerify}>
      <div className="mb-4">
        <label
          htmlFor="otp"
          className="block text-sm font-medium text-gray-700"
        >
          OTP
        </label>
        <input
          type="text"
          name="otp"
          id="otp"
          value={otpData.otp}
          onChange={handleChange}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-6">
        <ReCAPTCHA
          sitekey="6LfI7GoqAAAAANuq_7HftjCv1BumXG-61PS7h5Mh" // Replace with your actual site key
          onChange={handleRecaptchaChange}
          className="flex justify-center"
        />
      </div>

      <button
        type="submit"
        disabled={!otpData.recaptchaToken}
        className={`w-full px-4 py-2 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
          otpData.recaptchaToken
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Verify OTP
      </button>
    </form>

    {errorMessage && (
      <p className="mt-4 text-sm text-red-500 text-center">{errorMessage}</p>
    )}
    {successMessage && (
      <p className="mt-4 text-sm text-green-500 text-center">
        {successMessage}
      </p>
    )}
  </div>
</div>

    );
};

export default VerifyOTP;
