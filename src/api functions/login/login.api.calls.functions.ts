import axios, { AxiosResponse } from "axios";
import { IUserLoginResponse, IUserSignDto } from "blog-common-1.0";

export const loginUserApiCallFunction = async (formData: IUserSignDto) => {
  try {
    // Send a POST request to the backend
    const response: AxiosResponse<IUserLoginResponse> = await axios.post(
      "http://localhost:3000/api/auth/login",
      formData
    );
    console.log("Backend Response: ", response.data);
    if (response) {
      return response;
    }
  } catch (error) {
    console.error("Error submitting the form: ", error);
  }
};
