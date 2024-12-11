import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
// import { signup } from '../api/auth';
import axios from "axios";
const Signup = () => {
  const ip = import.meta.env.VITE_IP;
    const [formData, setFormData] = useState({
        name: '',
        mobile_no: '',
        email: '',
        date_of_birth: '',
        gender: '',
        password: ''
    });
    const [recaptchaToken, setRecaptchaToken] = useState(null); // State for reCAPTCHA token
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRecaptchaChange = (token) => {
        setRecaptchaToken(token); // Set the token on reCAPTCHA completion
    };
    const handlePageChange = async => {
        localStorage.clear()
        window.location.href = '/login';
    }
    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!recaptchaToken) {
            setErrorMessage('Please complete the reCAPTCHA');
            return;
        }

        try {
            const response = await axios.post(`${ip}/moox_events/api/auth/add_admin`, {
                ...formData, recaptchaToken
            });
            setSuccessMessage(response.data.message);

            if (response.data.message == "Signup successful. Verify OTP sent to your email.") {
                localStorage.setItem('emailid', formData.email);
                window.location.href = '/admin/verify';
            } else {
                window.location.reload();
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Signup error');
        }
    };

    return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Signup</h2>
    <form onSubmit={handleSignup}>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="mobile_no"
          className="block text-sm font-medium text-gray-700"
        >
          Mobile Number
        </label>
        <input
          type="text"
          name="mobile_no"
          id="mobile_no"
          value={formData.mobile_no}
          onChange={handleChange}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

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
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="date_of_birth"
          className="block text-sm font-medium text-gray-700"
        >
          Date of Birth
        </label>
        <input
          type="date"
          name="date_of_birth"
          id="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="gender"
          className="block text-sm font-medium text-gray-700"
        >
          Gender
        </label>
        <select
          name="gender"
          id="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
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
          value={formData.password}
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
        Already a User? Login...
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
        Sign Up
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

export default Signup;
