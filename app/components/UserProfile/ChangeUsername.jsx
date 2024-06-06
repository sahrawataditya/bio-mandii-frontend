import { useUser } from "@/app/hooks/useUser";
import { axiosService } from "@/app/lib/axiosService";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

const ChangeUsername = () => {
  const { userData } = useUser();
  const [username, setUsername] = useState(userData?.username);
  const [loading, setLoading] = useState(false);
  const changeUsername = async () => {
    setLoading(true);
    try {
      const response = await axiosService.patch("/changeUsername", {
        username,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  function handleUsername() {
    changeUsername();
  }
  return (
    <>
      <p className="py-2 text-xl font-semibold">Username</p>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          defaultValue={userData?.username}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 rounded-lg text-sm outline-none border border-black"
        />
        <button
          disabled={loading}
          onClick={handleUsername}
          className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 px-4 py-2 rounded-lg disabled:bg-blue-800"
        >
          Change Username
          {loading && <CgSpinner size={20} className="animate-spin" />}
        </button>
      </div>
    </>
  );
};

export default ChangeUsername;
