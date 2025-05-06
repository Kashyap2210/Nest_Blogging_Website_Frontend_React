import {
  getUserProfileApiCallFunction,
  searchUserByFilterApiCallFunction,
} from "@/api functions/users/users.api.calls.functions";
import { IUserEntity, IUserEntityFilterData } from "blog-common-1.0";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

export default function Creators() {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string | undefined>();
  const [users, setUsers] = useState<IUserEntity[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value } = e.target;
    setQuery(value);
  };

  const searchUserByInput = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filter: IUserEntityFilterData = {};
    if (query) {
      if (query.split("")[0] === "@") {
        filter.username = [query.slice(1)];
      } else {
        filter.name = [query];
      }
    }
    const response = await searchUserByFilterApiCallFunction(filter);
    if (response.length > 0) setUsers(response);
  };

  const goToUserProfile = async (id: number) => {
    // console.log(`Go to user ${id}'s profile`);
    const userProfileDetails = await getUserProfileApiCallFunction(id);
    // console.log("userProfileDetails", userProfileDetails);
    navigate("/api/profile", { state: userProfileDetails });
  };

  return (
    <div className=" h-auto flex flex-col items-center justify-center">
      <div className="w-full">
        <form
          action=""
          onSubmit={searchUserByInput}
          className=" mt-30 flex items-center justify-center gap-8"
        >
          <input
            type="text"
            onChange={handleChange}
            value={query}
            className="border border-gray-400 px-4 py-2 rounded"
            placeholder="Enter creators name"
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
      <div className="w-full px-4 text-black">
        <ul className="w-full max-w-2xl mx-auto mt-4">
          {users &&
            users.map((user) => (
              <li key={user?.id}>
                <div className="flex items-center gap-4 p-4 border-b border-gray-300">
                  <img
                    src={
                      user?.profilePictureUrl
                        ? `http://localhost:3000/uploads/${user.profilePictureUrl}`
                        : "/placeholder-profile.png"
                    }
                    alt="profilePic"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div
                    className="cursor-pointer"
                    onClick={() => goToUserProfile(user?.id)}
                  >
                    <div className="font-bold text-xl">{user?.name}</div>
                    <div className="underline italic text-gray-700">
                      @{user?.username}
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
