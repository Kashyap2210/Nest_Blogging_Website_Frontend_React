import axios, { AxiosResponse } from "axios";
import { IUserEntity } from "blog-common-1.0";

export const createUserApiCallFunction = async (
  // e: React.FormEvent<HTMLFormElement>,
  formData: FormData
) => {
  const response: AxiosResponse<IUserEntity> = await axios.post(
    "http://localhost:3000/api/users",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", // Add token to header
      },
    }
  );
  return response?.data;
};
