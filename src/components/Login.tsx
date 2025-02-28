import axios, { AxiosResponse } from "axios";
import { IUserLoginResponse } from "blog-common-1.0";
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthProvider";
import { ColorButton } from "../styling functions/button.style.function";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "kash1997",
    password: "kash1997",
  });
  const [responseMessage, setResponseMessage] = useState(""); // State to store backend response message
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message

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
    console.log("Form Data Submitted: ", formData);
    try {
      // Send a POST request to the backend
      const response: AxiosResponse<IUserLoginResponse> = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );
      console.log("Backend Response: ", response.data);
      login(response.data);
      setResponseMessage("Login successful!"); // Display success message
      setErrorMessage(""); // Clear error message
    } catch (error) {
      console.error("Error submitting the form: ", error);
      setResponseMessage(""); // Clear success message
      setErrorMessage("Failed to login. Please try again."); // Set error message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-left">
      <form onSubmit={handleSubmit} className="border p-8">
        <input
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
          className="border px-4"
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          className="border px-4"
        />
        <br />
        <br />
        <ColorButton type="submit" className="w-full">
          Login
        </ColorButton>
      </form>

      {/* Display response or error message */}
      {responseMessage && (
        <div style={{ color: "green" }}>{responseMessage}</div>
      )}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

      {/* Display user info if logged in */}
      {user && (
        <div className="mx-auto mt-8 max-w-2xl w-full p-4 border break-all whitespace-pre-wrap overflow-x-auto">
          <h2>Welcome, {user.username}!</h2>
          <p>Email: {user.emailId}</p>
          <p>Access Token: {accessToken}</p>
        </div>
      )}
      <br />
      <br />
      <ColorButton className="border">
        <Link style={{ textDecoration: "none", color: "white" }} to="/api">
          Go To HomePage
        </Link>
      </ColorButton>
    </div>
  );
}
