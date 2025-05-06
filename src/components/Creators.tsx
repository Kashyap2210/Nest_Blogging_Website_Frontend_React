import { searchUserByFilterApiCallFunction } from "@/api functions/users/users.api.calls.functions";
import { IUserEntity } from "blog-common-1.0";
import React, { useState } from "react";
import { Button } from "./ui/button";

export default function Creators() {
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<Partial<IUserEntity>[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    console.log(e.target.value);
    const { value } = e.target;
    setQuery(value);
  };

  const searchUserByInput = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("This is the user searched", query);
    const response = await searchUserByFilterApiCallFunction();
    if (response.length > 0) setUsers(response);
  };

  return (
    <div>
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
        <div className="h-30 text-black bg-red-300">
          <ul className="h-12 text-black">
            {users && users.map((user) => <li key={user?.id}>{user?.name}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
