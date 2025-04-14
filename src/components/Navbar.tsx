import { getJwt } from "@/helpers/helper";
import { searchedBlog } from "@/redux/blogSlice";
import { RootState } from "@/redux/store";
import SearchIcon from "@mui/icons-material/Search";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Input } from "./ui/input";
import { IBlogResponse } from "blog-common-1.0";
import { searchBlogByFilterApiCallFunction } from "@/api functions/blogs/blogs.api.calls.function";

export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
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

    // add dispatches for users, likesAndDislikes, comments
  };

  const handleSearchClick = () => {
    handleSearch();
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
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
    </div>
  );
}
