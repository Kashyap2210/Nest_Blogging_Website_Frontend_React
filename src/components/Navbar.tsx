import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { Input } from "./ui/input";
import axios from "axios";
import { getJwt } from "@/helpers/helper";

export default function Navbar() {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    console.log(e.target.value);
    const { value } = e.target;
    setQuery(value);
  };

  const handleSearch = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/blog/search",
      {
        title: [query],
      },
      {
        headers: {
          Authorization: `Bearer ${getJwt()}`, // Add token to header
        },
      }
    );
    console.log("A search event happened");
    console.log("this is the search response", response);
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
            // onKeyDown={handleChange}
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
