// import axios, { AxiosResponse } from "axios";
// import { IBlogLikesCounterEntity, LikeStatus } from "blog-common-1.0";
// import { getJwt } from "../../helpers/helper";
// import { getBlogByIdApiCallFunction } from "../blogs.api.calls.function";

// export const createLikeEntityApiCallFunction = async (
//   blogId: number,
//   setLikesAndDislikeEntities?: (
//     updateFn: (
//       prevLikes: IBlogLikesCounterEntity[]
//     ) => IBlogLikesCounterEntity[]
//   ) => void
// ) => {
//   console.log("inside the like function");
//   try {
//     const likeResponse: AxiosResponse<IBlogLikesCounterEntity> =
//       await axios.post(
//         `http://localhost:3000/api/likes-counter-blogs/`,
//         {
//           blogId: blogId,
//           likedStatus: LikeStatus.LIKED,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${getJwt()}`,
//           },
//         }
//       );

//     if (setLikesAndDislikeEntities) {
//       setLikesAndDislikeEntities((prevLikes) => [
//         ...(prevLikes || []),
//         likeResponse.data,
//       ]);
//     }
//     getBlogByIdApiCallFunction({
//       preventDefault: () => {},
//     } as React.FormEvent<HTMLFormElement>);
//     //   console.log("this is the like response", likeResponse);
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error(error.response?.data);
//     } else {
//       console.log("this is hte error", error);
//     }
//   }
// };
