import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
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

const Login = () => {
  const ip = import.meta.env.VITE_IP;
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [recaptchaToken, setRecaptchaToken] = useState(null); // To store the reCAPTCHA token
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleRecaptchaChange = (token) => {
        setRecaptchaToken(token); // Set the token when reCAPTCHA is completed
    };

    const handlePageChange = () => {
        localStorage.clear();
        window.location.href = '/admin/signup';
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!recaptchaToken) {
            setErrorMessage('Please complete the reCAPTCHA');
            return;
        }

        try {
            // Encrypt data before sending
            const encryptedData = encryptData({ ...credentials, recaptchaToken });

            // Send encrypted data to backend

            const response = await axios.post(`${ip}/moox_events/api/auth/login`, {
                encryptedData
            });

            // Decrypt the response from backend
            const decryptedResponse = decryptData(response.data.encryptedData);

            setSuccessMessage(decryptedResponse.message);

            if (decryptedResponse.message === 'Login successful') {
                localStorage.setItem('token', decryptedResponse.token);
                localStorage.setItem('userid', decryptedResponse.id);
                localStorage.setItem('emailid', decryptedResponse.email);
                localStorage.setItem('mobileno', decryptedResponse.mobile);
                localStorage.setItem('name', decryptedResponse.name);
                window.location.reload();
            } else {
                window.location.reload();
            }
        } catch (error) {
            const decryptedErrorMessage = error.response?.data?.encryptedData
                ? decryptData(error.response.data.encryptedData).message
                : 'Login error';

            setErrorMessage(decryptedErrorMessage);

            if (decryptedErrorMessage === 'Account not verified. OTP has been sent to your email.') {
                localStorage.setItem('emailid', credentials.email);
                window.location.href = '/admin/verify';
            }
        }
    };

    return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={credentials.email}
          onChange={handleChange}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="button"
        onClick={handlePageChange}
        className="text-blue-500 hover:underline text-sm mb-4"
      >
        New Here? Sign-Up...
      </button>

      <div className="mb-6">
        <ReCAPTCHA
          sitekey="6LfI7GoqAAAAANuq_7HftjCv1BumXG-61PS7h5Mh" // Replace with your site key
          onChange={handleRecaptchaChange}
          className="flex justify-center"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Log In
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

export default Login;
