import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { IUserLoginResponse } from 'blog-common-1.0';
import { useAuth } from '../context/AuthProvider';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [responseMessage, setResponseMessage] = useState(''); // State to store backend response message
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message

  const { login, user, accessToken } = useAuth(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Form Data Submitted: ', formData);

    try {
      // Send a POST request to the backend
      const response: AxiosResponse<IUserLoginResponse> = await axios.post(
        'http://localhost:3000/api/auth/login',
        formData
      );

      console.log('Backend Response: ', response.data);

      login(response.data);

      setResponseMessage('Login successful!'); // Display success message
      setErrorMessage(''); // Clear error message
    } catch (error) {
      console.error('Error submitting the form: ', error);

      setResponseMessage(''); // Clear success message
      setErrorMessage('Failed to login. Please try again.'); // Set error message
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Login</button>
      </form>

      {/* Display response or error message */}
      {responseMessage && (
        <div style={{ color: 'green' }}>{responseMessage}</div>
      )}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      {/* Display user info if logged in */}
      {user && (
        <div>
          <h2>Welcome, {user.username}!</h2>
          <p>Email: {user.emailId}</p>
          {/* You can also store the access token in localStorage or sessionStorage */}
          <p>Access Token: {accessToken}</p>
        </div>
      )}
    </div>
  );
}
