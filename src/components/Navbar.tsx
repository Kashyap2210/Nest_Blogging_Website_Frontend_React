import { searchBlogByFilterApiCallFunction } from "@/api functions/blogs/blogs.api.calls.function";
import { getUserProfileApiCallFunction } from "@/api functions/users/users.api.calls.functions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  const { logOut } = useAuth();

  const handleLogout = () => {
    logOut();
  };
  const handleLogin = () => {
    navigate("/api/login");
  };

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

  const navigateToHomePage = () => {
    navigate("/api");
  };

  const navigateToCreators = () => {
    console.log("navigate...");
    navigate("/api/creators");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-20 z-[100] bg-white flex items-center justify-around border-b">
      <div
        className="text-xl font-semibold cursor-pointer"
        onClick={navigateToHomePage}
      >
        MECD. Tech.
      </div>
      <div>
        <form onSubmit={handleSubmit} className="">
          <div className="flex items-center justify-end px-4 rounded-4xl border border-black h-12 ">
            <Input
              type="text"
              placeholder="Search Blog"
              className="w-60 focus-visible:ring-0 text-black focus-visible:ring-offset-0 border-none shadow-none"
              onChange={handleChange}
              value={query}
              // onKeyDown={handleSubmit}
            />
            <SearchIcon
              className="cursor-pointer"
              onClick={handleSearchClick}
            ></SearchIcon>
          </div>
        </form>
      </div>
      <div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="cursor-pointer">
            <div
              className={
                user.user
                  ? "h-11 w-11 bg-emerald-300 rounded-full flex justify-center items-center"
                  : "h-11 w-11 bg-amber-600 rounded-full flex justify-center items-center"
              }
            >
              MT
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="cursor-pointer z-[1000]">
            <DropdownMenuItem onClick={getUserProfile}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={navigateToCreators}
            >
              Creators
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Trending
            </DropdownMenuItem>
            {user.user ? (
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={handleLogin}
                className="cursor-pointer"
              >
                Login
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
