"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center bg-white rounded-full px-4 py-2 shadow">
      <Search size={20} className="text-gray-400" />
      <input
        type="text"
        placeholder="Search..."
        className="ml-3 w-full focus:outline-none"
      />
    </div>
  );
}
