import { getJwt } from "@/helpers/helper";
import axios, { AxiosResponse } from "axios";
import { IUserEntity, IUserProfileResponse } from "blog-common-1.0";

export const createUserApiCallFunction = async (
  // e: React.FormEvent<HTMLFormElement>,
  formData: FormData
) => {
  const response: AxiosResponse<IUserEntity> = await axios.post(
    "http://localhost:3000/api/users",
    formData,
    {
      headers: {
        Authorization: `Bearer ${getJwt()}`,
      },
    }
  );
  return response?.data;
};

export const getUserProfileApiCallFunction = async (
  // e: React.FormEvent<HTMLFormElement>,
  id: number
) => {
  const response: AxiosResponse<IUserProfileResponse> = await axios.get(
    `http://localhost:3000/api/users/search-user-profile/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getJwt()}`, // Add token to header
      },
    }
  );
  return response?.data;
};

export const searchUserByFilterApiCallFunction = async () =>
  {
    const response: AxiosResponse<Partial<IUserEntity>[]> = await axios.post(
      `http://localhost:3000/api/users/search`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getJwt()}`, // Add token to header
        },
      }
    );
    return response?.data;
  };
