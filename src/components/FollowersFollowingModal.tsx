import axios from "axios";
import { IUserFolloweeResponse } from "blog-common-1.0";
import React from "react";
import { Button } from "./ui/button";


interface UserListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string; // e.g., "followers" or "following"
  users: IUserFolloweeResponse[];
}

const FollowersFollowingModal: React.FC<UserListModalProps> = ({
  isOpen,
  onClose,
  title,
  users,
}) => {
  if (!isOpen) return null;

  const onUnfollow = async (id: number) => {
    const unFollowResult = await axios.delete(
      `http://localhost:3000/api/followers/${id}`
    );
    console.log("unFollowResult", unFollowResult);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm bg-white/50 pt-20">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black text-2xl leading-none cursor-pointer"
          >
            &times;
          </button>
        </div>

        {users.length === 0 ? (
          <p className="text-center text-gray-500">
            No {title.toLowerCase()} found.
          </p>
        ) : (
          <ul className="space-y-4 max-h-80 overflow-y-auto">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex items-center space-x-4 border-b pb-3"
              >
                <img
                  src={
                    `http://localhost:3000/uploads/${user.profilePictureUrl}` ||
                    "/placeholder-profile.png"
                  }
                  alt="profilePic"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex items-center justify-between w-full">
                  <div>
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm text-gray-400">
                      @{user.username} {user.relationId}
                    </div>
                  </div>
                  {title && title === "following" && (
                    <Button
                      className="text-white"
                      onClick={() => onUnfollow(user.relationId)}
                    >
                      Unfollow
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FollowersFollowingModal;
