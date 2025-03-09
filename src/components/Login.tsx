import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import { Input } from "@heroui/react";
import axios, { AxiosResponse } from "axios";
import { IUserLoginResponse } from "blog-common-1.0";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [_responseMessage, setResponseMessage] = useState(""); // State to store backend response message

  const { login } = useAuth();

  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [_errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData.username.trim().length);
    if (
      formData.username.trim().length === 0 ||
      formData.password.trim().length === 0
    ) {
      setErrors({
        username: false,
        password: false,
      });
    }

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
      // setErrorMessage(""); // Clear error message
      navigate("/api");
    } catch (error) {
      console.error("Error submitting the form: ", error);
      // setErrors(true);
      setResponseMessage(""); // Clear success message
      if (axios.isAxiosError(error) && error?.response) {
        if (error) {
          setErrorMessage(error?.response.data.message); // Set error message
          console.log(
            "this is the error message",
            error?.response.data.message
          );
          window.alert(error?.response.data.message); // ✅ Show JavaScript alert for error
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 bg-gradient-to-tr from-dutchWine  to-wine">
      {/* <div className="bg-white rounded-sm shadow-2xl shadow-gray-600/20"> */}
      <div className="bg-white rounded-sm rounded-xl border border-gray-300 shadow-inner">
        <form
          noValidate
          onSubmit={handleSubmit}
          className="border p-8 rounded-lg shadow-lg "
        >
          {/* Username Input */}
          <span className="text-sm">Username</span>
          <Input
            isRequired
            // label="Username"
            name="username"
            placeholder={
              errors.username ? "Username is required" : "Enter username"
            }
            value={formData.username}
            onChange={handleChange}
            errorMessage={errors.username ? "Username is required." : ""}
            className={`border ${
              formData.username.trim().length === 0
                ? "border-red-500"
                : "border-black"
            } bg-white focus:ring-0 w-60 rounded-md mb-6`}
          />
          {/* <br /> */}
          {/* Password Input */}
          <span className="text-sm">Password</span>
          <Input
            isRequired
            type="password"
            // label="Password"
            name="password"
            placeholder={
              errors.username ? "Password is required" : "Enter password"
            }
            value={formData.password}
            onChange={handleChange}
            errorMessage={errors.password ? "Password is required." : ""}
            className={`border ${
              formData.password.trim().length === 0
                ? "border-red-500"
                : "border-black"
            } bg-white focus:ring-0 w-60 rounded-md mb-6`}
          />
          {/* <br /> */}
          {/* Submit Button */}
          <Button
            // onClick={handleSubmit}
            type="submit"
            size={"lg"}
            className="customButton w-full p-4 border-none"
          >
            Login
          </Button>
        </form>
      </div>

      <Button className="customButton w-60 p-4 border-none" size={"lg"}>
        <Link style={{ textDecoration: "none", color: "white" }} to="/api">
          Go To HomePage
        </Link>
      </Button>
    </div>
  );
}
