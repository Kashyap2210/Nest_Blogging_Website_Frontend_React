// import React from "react"

import axios, { AxiosResponse } from 'axios';
import { IUserCreateDto, IUserEntity, UserGender } from 'blog-common-1.0';
import { useState } from 'react';

export default function UserCreate() {
  const [formData, setFormData] = useState<IUserCreateDto>({
    name: '',
    username: '',
    password: '',
    emailId: '',
    contactNo: '',
    profilePictureUrl: '',
    gender: UserGender.PREFER_NOT_TO_SAY,
  });
  const [newUser, setNewUser] = useState<IUserCreateDto | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('this is the user data: ', formData);
    try {
      const response: AxiosResponse<IUserEntity> = await axios.post(
        'http://localhost:3000/api/users',
        formData
      );
      console.log('this is the response from backend', response);
      const { data } = response;
      console.log('this is the new user create', data);
      setNewUser(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data); // Log the backend error response
      } else {
        console.error('Unexpected error:', error);
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
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <br />
        <br />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <br />
        <br />
        <br />
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <br />
        <input
          type="text"
          name="emailId"
          placeholder="EmailId"
          value={formData.emailId}
          onChange={handleChange}
        />
        <br />
        <br />
        <br />
        <input
          type="text"
          name="contactNo"
          placeholder="Contact Number"
          value={formData.contactNo}
          onChange={handleChange}
        />
        <br />
        <br />
        <br />
        <input
          type="text"
          name="profilePictureUrl"
          placeholder="Profile Picture"
          value={formData.profilePictureUrl}
          onChange={handleChange}
        />
        <br />
        <br />
        <br />
        <select
          name="gender"
          value={formData.gender}
          onChange={(e) =>
            setFormData({ ...formData, gender: e.target.value as UserGender })
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
    </div>
  );
}
