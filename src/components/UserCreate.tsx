import axios from "axios";
import { IUserCreateDto, IUserEntity, UserGender } from "blog-common-1.0";
import { useState } from "react";
import { createUserApiCallFunction } from "../api functions/users/users.api.calls.functions";

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
    <div>
      This is the form to create new User
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userData.name}
          onChange={handleChange}
        />
        <br />
        <br />
        <br />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={handleChange}
        />
        <br />
        <br />
        <br />
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <br />
        <input
          type="text"
          name="emailId"
          placeholder="EmailId"
          value={userData.emailId}
          onChange={handleChange}
        />
        <br />
        <br />
        <br />
        <input
          type="text"
          name="contactNo"
          placeholder="Contact Number"
          value={userData.contactNo}
          onChange={handleChange}
        />
        {/* <br />
        <br />
        <br />
        <input
          type="text"
          name="profilePictureUrl"
          placeholder="Profile Picture"
          value={userData.profilePictureUrl}
          onChange={handleChange}
        /> */}
        <br />
        <br />
        <br />
        <input
          type="file"
          name="file"
          placeholder="Profile Picture File"
          onChange={handleFileUpload}
        />
        <br />
        <br />
        <br />
        <select
          name="gender"
          value={userData.gender}
          onChange={(e) =>
            setUserData({ ...userData, gender: e.target.value as UserGender })
          }
        >
          <option value={UserGender.MALE}>Male</option>
          <option value={UserGender.FEMALE}>Female</option>
          <option value={UserGender.PREFER_NOT_TO_SAY}>
            Prefer Not to Say
          </option>
        </select>
        <br />
        <button type="submit">Create User</button>
      </form>
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
