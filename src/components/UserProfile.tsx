import { PhonelinkLockOutlined } from "@mui/icons-material";
import { IUserProfileResponse } from "blog-common-1.0";
import { useLocation } from "react-router";
import BlogList from "./BlogList";

export default function Profile() {
  const location = useLocation();
  const {
    userDetail,
    blogsOfUser,
    followersCount,
    followingCount,
  }: IUserProfileResponse = location.state || {};
  console.log("this is the userDetails", userDetail);
  //   console.log("this is name", userDetail.name);
  //   console.log("this is email", userDetail.emailId);
  //   console.log("this is phone", userDetail.contactNo);
  if (!userDetail.name || !userDetail.emailId || !userDetail.contactNo) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-red-600">
        ⚠️ User details not available. Please navigate from the appropriate
        page.
      </div>
    );
  }

  return (
    <div className="pt-20 bg-gray-100 min-h-screen">
      {/* <div className="pt-20 bg-gray-100 min-h-screen"> */}
      <div className=" min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-5xl w-full p-8  bg-white shadow-xl rounded-2xl flex gap-12 text-gray-900">
          {/* Left Side - Profile Info */}
          <div className="w-1/2 flex flex-col items-center gap-6 relative">
            <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm relative z-[10] ">
              No Profile Image
            </div>
            <div className="text-3xl font-bold">{userDetail.name}</div>
            <div className="text-lg text-gray-600">{userDetail.emailId}</div>
          </div>

          {/* Right Side - Additional Info */}
          <div className="w-1/2 flex flex-col justify-center gap-6">
            <div className="flex items-center gap-3 text-lg">
              <PhonelinkLockOutlined />
              <span>{userDetail.contactNo}</span>
            </div>
            <div className="text-sm text-black flex items-center justify-start gap-16">
              <div className="flex flex-col items-center justify-center">
                <div className="text-xl">{followersCount}</div>
                <div className="h-8 w-full flex items-center justify-center text-2xl px-4">
                  Followers
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="text-xl">{followingCount}</div>
                <div className="h-8 w-full flex items-center justify-center text-2xl px-4">
                  Following
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-8 h-auto ">
        {blogsOfUser.map((entity, index) => (
          <BlogList
            key={index}
            blog={entity.blog}
            likes={entity.likes}
            comments={entity.comments}
            users={entity.users}
          />
        ))}
      </div>
    </div>
  );
}
