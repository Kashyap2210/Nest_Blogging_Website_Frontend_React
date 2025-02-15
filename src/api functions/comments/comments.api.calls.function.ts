import axios, { AxiosResponse } from "axios";
import { ICommentCreateDto, ICommentEntity } from "blog-common-1.0";
import { getJwt } from "../../helpers/helper";

export const createCommentApiCallFunction = async (
  formData: ICommentCreateDto
) => {
  try {
    const response: AxiosResponse<ICommentEntity | undefined> =
      await axios.post("http://localhost:3000/api/comments", formData, {
        headers: {
          Authorization: `Bearer ${getJwt()}`,
        },
      });

    if (response) {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data); // Log the backend error response
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export const deleteCommentByIdApiCallFunction = async (id: number) => {
  try {
    const response: AxiosResponse<boolean | undefined> = await axios.delete(
      `http://localhost:3000/api/comments/${id}`,
      {
        headers: {
          Authorization: `Bearer ${getJwt()}`,
        },
      }
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data); // Log the backend error response
    } else {
      console.error("Unexpected error:", error);
    }
  }
};
