"use client";
import Link from "next/link";
import { TiArrowBack } from "react-icons/ti";
import ChangePassword from "../components/UserProfile/ChangePassword";
import ChangeUsername from "../components/UserProfile/ChangeUsername";

const UserProfile = () => {
  return (
    <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
      <div className="flex justify-between items-center border-b py-6">
        <h1 className="text-2xl font-semibold">User Profile</h1>
        <Link href={"/"} className="flex items-center gap-2">
          <TiArrowBack size={20} />
          <span className="text-sm">Go back</span>
        </Link>
      </div>
      <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
        <div className="col-span-12 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow mt-2 pt-3">
          <ChangeUsername />
          <hr className="mt-4 mb-8" />
          <ChangePassword />
          <hr className="mt-4 mb-8" />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
