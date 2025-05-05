import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";

export default function Creators() {
  const [query, setQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    console.log(e.target.value);
    const { value } = e.target;
    setQuery(value);
  };

  const searchUserByInput = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("This is the user searched", query);
    // const response = await axios.post(
    //     `http://localhost:3000/api/`
    // )
  };

  return (
    <div className="h-screen w-full">
      <form
        action=""
        onSubmit={searchUserByInput}
        className="h-full flex items-center justify-center gap-8"
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
  );
}
