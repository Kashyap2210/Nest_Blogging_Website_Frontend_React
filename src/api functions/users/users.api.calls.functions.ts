import { getJwt } from "@/helpers/helper";
import axios, { AxiosResponse } from "axios";
import {
  IUserEntity,
  IUserEntityFilterData,
  IUserProfileResponse,
} from "blog-common-1.0";

export const createUserApiCallFunction = async (
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

export const searchUserByFilterApiCallFunction = async (
  filter: IUserEntityFilterData
): Promise<IUserEntity[]> => {
  const response: AxiosResponse<IUserEntity[]> = await axios.post(
    `http://localhost:3000/api/users/search`,
    filter,
    {
      headers: {
        Authorization: `Bearer ${getJwt()}`,
      },
    }
  );
  return response?.data;
};
