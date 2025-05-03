import { getJwt } from "@/helpers/helper";
import { PhonelinkLockOutlined } from "@mui/icons-material";
import axios from "axios";
import { IUserProfileResponse } from "blog-common-1.0";
import { useState } from "react";
import { useLocation } from "react-router";
import BlogList from "./BlogList";
import FollowersFollowingModal from "./FollowersFollowingModal";

interface User {
  id: number;
  name: string;
  emailId: string;
  username: string;
  profilePictureUrl?: string;
}

export default function Profile() {
  const location = useLocation();
  const {
    userDetail,
    blogsOfUser,
    followersCount,
    followingCount,
  }: IUserProfileResponse = location.state || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUsers, setModalUsers] = useState<User[]>([]);
  const [modalTitle, setModalTitle] = useState("");

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

  const getFollowers = async () => {
    console.log("request received to fetch all followers of current User");
    try {
      const response = await axios.post(
        `http://localhost:3000/api/followers/search`,
        { userId: [userDetail.id] },
        { headers: { Authorization: `Bearer ${getJwt()}` } }
      );
      setModalTitle("followers");
      setModalUsers(response.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch followers", err);
    }
  };

  const getFollowing = async () => {
    console.log("request received to fetch all following of current User");
    try {
      const following = await axios.post(
        `http://localhost:3000/api/followers/search`,
        { followeeUserId: [userDetail.id] },
        { headers: { Authorization: `Bearer ${getJwt()}` } }
      );
      setModalTitle("following");
      setModalUsers(following.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch following", err);
    }
  };

  return (
    <div className="pt-20 bg-gray-100 min-h-screen">
      {/* <div className="pt-20 bg-gray-100 min-h-screen"> */}
      <div className=" min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-5xl w-full p-8  bg-white shadow-xl rounded-2xl flex gap-12 text-gray-900">
          {/* Left Side - Profile Info */}
          <div className="w-1/2 flex flex-col items-center gap-6 relative">
            <div className="w-48 h-48 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={`http://localhost:3000/uploads/${userDetail.profilePictureUrl}`}
                alt="profilePicture"
                className="w-full h-full object-cover"
              />
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
              <div
                className="flex flex-col items-center justify-center px-4 "
                onClick={getFollowers}
              >
                <div className="text-xl">{followersCount}</div>
                <div className="h-8 w-full flex items-center justify-center text-2xl  cursor-pointer">
                  Followers
                </div>
              </div>

              <div
                className="flex flex-col items-center justify-center px-4"
                onClick={getFollowing}
              >
                <div className="text-xl">{followingCount}</div>
                <div className="h-8 w-full flex items-center justify-center text-2xl cursor-pointer">
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
      <FollowersFollowingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        users={modalUsers}
      />
    </div>
  );
}
