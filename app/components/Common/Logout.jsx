"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LuLogOut } from "react-icons/lu";

const Logout = () => {
  const router = useRouter();
  const logoutFunction = () => {
    toast.success("Logout Successful");
    Cookies.remove("token");
    router.push("/login");
  };
  return (
    <button
      onClick={logoutFunction}
      className="fixed top-2 right-2 p-2 bg-red-500 rounded-full transition focus:ring ring-red-300"
    >
      <LuLogOut className="text-white h-5 w-5" />
    </button>
  );
};

export default Logout;
