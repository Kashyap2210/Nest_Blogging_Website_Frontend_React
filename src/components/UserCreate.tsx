import { CloudUploadOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";
import { IUserCreateDto, IUserEntity, UserGender } from "blog-common-1.0";
import { useState } from "react";
import { Link } from "react-router";
import { createUserApiCallFunction } from "../api functions/users/users.api.calls.functions";
import {
  ColorButton,
  VisuallyHiddenInput,
} from "../styling functions/button.style.function";

export default function UserCreate() {
  const [userData, setUserData] = useState<IUserCreateDto>({
    name: "",
    username: "",
    password: "",
    emailId: "",
    contactNo: "",
    gender: UserGender.PREFER_NOT_TO_SAY,
  });
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<IUserCreateDto | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length) {
      setFile(e.target.files[0]); // Get the first file selected

      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setPreviewUrl(fileUrl);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("this is the user data: ");
    try {
      if (!file) {
        console.log("file should be there");
      }

      const formData = new FormData();

      if (file) {
        formData.append("file", file);
      }
      Object.entries(userData).forEach(([key, value]) => {
        if (typeof value === "string") {
          formData.append(key, value);
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value)); // Convert non-string values to string
        }
      });

      const newUser: IUserEntity = await createUserApiCallFunction(formData);
      // console.log("this is the response from backend", response);
      // const { data } = response;
      console.log("this is the new user create", newUser);
      setNewUser(newUser);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data); // Log the backend error response
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-left p-4">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Create New User!</h1>
      <div className="p-4">
        <form
          onSubmit={handleSubmit}
          className="border p-8 mb-8 flex flex-col gap-8 items-center justify-center"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userData.name}
            onChange={handleChange}
            className="border px-4"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={userData.username}
            onChange={handleChange}
            className="border px-4"
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            className="border px-4"
          />
          <input
            type="text"
            name="emailId"
            placeholder="EmailId"
            value={userData.emailId}
            onChange={handleChange}
            className="border px-4"
          />
          <input
            type="text"
            name="contactNo"
            placeholder="Contact Number"
            value={userData.contactNo}
            onChange={handleChange}
            className="border px-4"
          />
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadOutlined />}
            className="w-full"
          >
            Upload files
            <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
          </Button>
          <select
            name="gender"
            value={userData.gender}
            onChange={(e) =>
              setUserData({ ...userData, gender: e.target.value as UserGender })
            }
            className="w-full border"
          >
            <option value={UserGender.MALE}>Male</option>
            <option value={UserGender.FEMALE}>Female</option>
            <option value={UserGender.PREFER_NOT_TO_SAY}>
              Prefer Not to Say
            </option>
          </select>
          <ColorButton type="submit">Create User</ColorButton>
        </form>
        <ColorButton className="w-full">
          <Link style={{ textDecoration: "none", color: "white" }} to="/api">
            Go To HomePage
          </Link>
        </ColorButton>
      </div>
      {newUser && (
        <div>
          <h2>Welcome {newUser.name}</h2>
        </div>
      )}
      {previewUrl && (
        <img src={previewUrl} alt="Preview URL" width="200px" height="200px" />
      )}
    </div>
  );
}
