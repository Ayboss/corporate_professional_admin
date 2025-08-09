"use client";

import { searchForUsers } from "@/functions/users";
import { TUser } from "@/types/users";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import useSWRMutation from "swr/mutation";
import Skeleton from "react-loading-skeleton";
export default function SearchPage() {
  const [filters, setFilters] = useState({
    is_active: "",
    is_verified: "",
    recruiter_tag: "",
    industry: "",
    experience_level: "",
    has_warning: false,
    name: "",
    email: "",
    company: "",
    signupDateFrom: "",
    signupDateTo: "",
  });

  const { data, error, isMutating, trigger } = useSWRMutation(
    `/admin/users/enhanced-search`,
    searchForUsers
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== "" && val !== false) params.append(key, String(val));
    });
    const queryString = params.toString();
    console.log(queryString, "THIS IS SI SSISISPOS}S}");
    trigger({ query: queryString });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User Search</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <label>
          Active:
          <select
            name="is_active"
            value={filters.is_active}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
          >
            <option value="">Any</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </label>
        <label>
          Verified:
          <select
            name="is_verified"
            value={filters.is_verified}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
          >
            <option value="">Any</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </label>
        <label>
          Recruiter Tag:
          <select
            name="recruiter_tag"
            value={filters.recruiter_tag}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
          >
            <option value="">Any</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </label>
        <label>
          Industry:
          <select
            name="industry"
            value={filters.industry}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
          >
            <option value="">Any</option>
            {/* map industry options here */}
          </select>
        </label>
        <label>
          Experience Level:
          <select
            name="experience_level"
            value={filters.experience_level}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
          >
            <option value="">Any</option>
            {/* map levels here */}
          </select>
        </label>
        <label className="flex items-center mt-6">
          <input
            type="checkbox"
            name="has_warning"
            checked={filters.has_warning}
            onChange={handleChange}
            className="mr-2"
          />
          Has Warning
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={filters.email}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>
        <label>
          Company:
          <input
            type="text"
            name="company"
            value={filters.company}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>
        <label>
          Signup From:
          <input
            type="date"
            name="signupDateFrom"
            value={filters.signupDateFrom}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>
        <label>
          Signup To:
          <input
            type="date"
            name="signupDateTo"
            value={filters.signupDateTo}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>
      </div>
      <button
        onClick={handleSearch}
        className="px-6 py-2 bg-primary text-white rounded mb-6"
      >
        Search
      </button>
      {isMutating ? (
        <Skeleton className="h-[300px]" />
      ) : (
        <table className="min-w-full bg-white  rounded-lg overflow-hidden">
          <thead className="bg-gray-100 ">
            <tr>
              <th className="p-2">
                <input type="checkbox" />
              </th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Industry</th>
              <th className="p-2 text-left">Company</th>
              <th className="p-2 text-left">Job Title</th>
              {/* <th className="p-2 text-left">Recruiter</th> */}
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user) => (
              <UserRow user={user} key={user.id} />
            ))}
          </tbody>
        </table>
      )}

      {error && <p className="text-red-500">Search failed.</p>}
    </div>
  );
}

function UserRow({ user }: { user: TUser }) {
  return (
    <tr key={user.id} className="hover:bg-gray-50 ">
      <td className="p-2">
        <input type="checkbox" />
      </td>
      <td className="p-2">{user.full_name}</td>
      <td className="p-2">{user.industry}</td>
      <td className="p-2">{user.company || "nil"}</td>
      <td className="p-2">{user.job_title}</td>
      <td className="p-2">
        <Link href={`/user/${user.id}`}>View</Link>
      </td>
      {/* <td className="p-2">{user.recruiter_tag}</td> */}
    </tr>
  );
}
