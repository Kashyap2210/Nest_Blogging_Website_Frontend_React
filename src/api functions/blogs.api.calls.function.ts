import axios, { AxiosResponse } from "axios";
import { IBlogCreateDto, IBlogEntity } from "blog-common-1.0";
import { getJwt } from "../helpers/helper";

export const createBlogApiCallFunctionU = async (
  e: React.FormEvent<HTMLFormElement>,
  formData: IBlogCreateDto,
  setNewBlog?: (blog: IBlogEntity) => void
) => {
  e.preventDefault();
  //   console.log("this is the blog data", formData);

  const token: string | null = getJwt();

  try {
    const response: AxiosResponse<IBlogEntity> = await axios.post(
      "http://localhost:3000/api/blog",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to header
        },
      }
    );
    console.log("this is the response", response);
    const { data } = response;
    console.log("this is the new blog", data);
    if (setNewBlog) {
      setNewBlog(data);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.log("this is the response", response)
      console.error(error.response?.data); // Log the backend error response
    } else {
      console.error("Unexpected error:", error);
    }
  }
};
