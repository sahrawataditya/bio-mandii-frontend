import { axiosService } from "@/app/lib/axiosService";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { GoEye, GoEyeClosed } from "react-icons/go";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosService.patch("/changePassword", data);
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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="py-2 text-xl font-semibold">Password</p>
      <div className="flex items-center w-full">
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3 items-center w-full">
          <div className="sm:max-w-[200px] w-full">
            <label htmlFor="currentPassword">
              <span className="text-sm">Current Password</span>
            </label>
            <input
              type="password"
              {...register("currentPassword", {
                required: "*Current Password is required",
              })}
              id="currentPassword"
              className="w-full rounded-lg bg-white py-2 px-4 text-sm border border-black outline-none"
            />
            {errors.currentPassword && (
              <span className="text-red-500 text-sm">
                {errors.currentPassword.message}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 w-full">
            <div className="sm:max-w-[200px] w-full">
              <label htmlFor="newPassword">
                <span className="text-sm">New Password</span>
              </label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "*New Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  className="w-full rounded-lg bg-white py-2 px-4 text-sm border border-black outline-none"
                />
                <div className=" absolute right-2 bottom-1">
                  {showPassword ? (
                    <button onClick={() => setShowPassword(!showPassword)}>
                      <GoEye size={16} />
                    </button>
                  ) : (
                    <button onClick={() => setShowPassword(!showPassword)}>
                      <GoEyeClosed size={16} />
                    </button>
                  )}
                </div>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        disabled={loading}
        type="submit"
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white flex items-center gap-2 disabled:bg-blue-800 disabled:cursor-not-allowed"
      >
        Change Password
        {loading && <CgSpinner className="animate-spin" />}
      </button>
    </form>
  );
};

export default ChangePassword;
