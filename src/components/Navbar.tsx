import { searchBlogByFilterApiCallFunction } from "@/api functions/blogs/blogs.api.calls.function";
import { getUserProfileApiCallFunction } from "@/api functions/users/users.api.calls.functions";
import { useAuth } from "@/context/AuthProvider";
import { searchedBlog } from "@/redux/blogSlice";
import { RootState } from "@/redux/store";
import SearchIcon from "@mui/icons-material/Search";
import { IUserProfileResponse } from "blog-common-1.0";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Input } from "./ui/input";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useAuth();
  const [query, setQuery] = useState("");
  const searchedBlogFromApi = useSelector(
    (state: RootState) => state.blogs.blogs
  );
  console.log("this is the searched blog from api", searchedBlogFromApi);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    console.log(e.target.value);
    const { value } = e.target;
    setQuery(value);
  };

  const handleSearch = async () => {
    const response = await searchBlogByFilterApiCallFunction({
      title: [query],
    });
    console.log("A search event happened");
    console.log("this is the search response", response);
    if (response) dispatch(searchedBlog(response.map((res) => res.blog)));
    // add dispatches for users, likesAndDislikes, comments
  };

  const handleSearchClick = () => {
    handleSearch();
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  const getUserProfile = async () => {
    if (user.user?.id) {
      const userDetails: IUserProfileResponse =
        await getUserProfileApiCallFunction(user.user?.id);
      console.log("this is the user details", userDetails);
      navigate("/api/profile", { state: userDetails });
    }
  };

  return (
    <div className="h-20 w-full bg-black flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-end border border-white px-4 rounded-4xl border-black h-12 w-full">
          <Input
            type="text"
            placeholder="Search Blog"
            className="w-60 border-none focus-visible:ring-0 text-white focus-visible:ring-offset-0 shadow-none"
            onChange={handleChange}
            value={query}
            // onKeyDown={handleSubmit}
          />
          <SearchIcon
            className="cursor-pointer text-white"
            onClick={handleSearchClick}
          ></SearchIcon>
        </div>
      </form>
      <div
        onClick={getUserProfile}
        className="color-white cursor-pointer text-white ml-8"
      >
        See Profile
      </div>
    </div>
  );
}
