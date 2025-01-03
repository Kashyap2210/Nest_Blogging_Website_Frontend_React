import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [responseMessage, setResponseMessage] = useState(""); // State to store backend response message
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const [user, setUser] = useState(null); // State to store user information
  const [accessToken, setAccessToken] = useState(""); // State to store access token

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload
    console.log("Form Data Submitted: ", formData);

    try {
      // Send a POST request to the backend
      const response = await axios.post("http://localhost:3000/api/auth/login", formData);
      console.log("Backend Response: ", response.data);

      // Destructure response to get accessToken and user data
      const { accessToken, user } = response.data;

      // Set the backend response data in state
      setAccessToken(accessToken); // Store the accessToken
      setUser(user); // Store the user info

      setResponseMessage("Login successful!"); // Display success message
      setErrorMessage(""); // Clear error message
    } catch (error) {
      console.error("Error submitting the form: ", error);
      setResponseMessage(""); // Clear success message
      setErrorMessage("Failed to login. Please try again."); // Set error message
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
      {responseMessage && <div style={{ color: 'green' }}>{responseMessage}</div>}
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
