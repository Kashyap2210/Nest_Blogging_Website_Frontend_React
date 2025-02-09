import axios, { AxiosResponse } from "axios";
import { IBlogLikesCounterEntity, LikeStatus } from "blog-common-1.0";
import { getJwt } from "../../helpers/helper";
import { handleSubmitForBlogGetById } from "../blogs.api.calls.function";

export const createLikeEntityApiCallFunction = async (
  blogId: number,
  setLikesAndDislikeEntities?: React.Dispatch<
    React.SetStateAction<IBlogLikesCounterEntity[]>
  >
) => {
  console.log("inside the like function");
  try {
    const likeResponse: AxiosResponse<IBlogLikesCounterEntity> =
      await axios.post(
        `http://localhost:3000/api/likes-counter-blogs/`,
        {
          blogId: blogId,
          likedStatus: LikeStatus.LIKED,
        },
        {
          headers: {
            Authorization: `Bearer ${getJwt()}`,
          },
        }
      );

    if (setLikesAndDislikeEntities) {
      setLikesAndDislikeEntities((prevLikes) => [
        ...(prevLikes || []),
        likeResponse.data,
      ]);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    } else {
      console.log("this is hte error", error);
    }
  }
};

export const createDislikeEntityApiCallFunction = async (
  blogId: number,
  setLikesAndDislikeEntities?: React.Dispatch<
    React.SetStateAction<IBlogLikesCounterEntity[]>
  >
) => {
  console.log("inside the like function");
  try {
    const likeResponse: AxiosResponse<IBlogLikesCounterEntity> =
      await axios.post(
        `http://localhost:3000/api/likes-counter-blogs/`,
        {
          blogId: blogId,
          likedStatus: LikeStatus.DISLIKED,
        },
        {
          headers: {
            Authorization: `Bearer ${getJwt()}`,
          },
        }
      );

    if (setLikesAndDislikeEntities) {
      setLikesAndDislikeEntities((prevLikes) => [
        ...(prevLikes || []),
        likeResponse.data,
      ]);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    } else {
      console.log("this is hte error", error);
    }
  }
};

export const changeLikeStatusApiCallFunction = async (blogId: number) => {
  console.log("inside the double click function");
  try {
    const response: AxiosResponse<void> = await axios.post(
      `http://localhost:3000/api/likes-counter-blogs/${blogId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getJwt()}`,
        },
      }
    );
    console.log("this is the response from double click function", response);

    handleSubmitForBlogGetById(
      {
        preventDefault: () => {},
      } as React.FormEvent<HTMLFormElement>,
      blogId
    );
  } catch (error) {}
};
