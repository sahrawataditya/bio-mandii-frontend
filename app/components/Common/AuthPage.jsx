"use client";
import { axiosService } from "@/app/lib/axiosService";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

const AuthPage = ({ title }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const apiRoute = pathname === "/register" ? "/register" : "/login";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosService.post(apiRoute, data);
      if (response.data.success) {
        toast.success(response.data.message);
        apiRoute === "/login" && Cookies.set("token", response.data.token);
        router.push(pathname === "/register" ? "/login" : "/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {title} in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex items-start gap-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <span className="text-red-500">*</span>
            </div>
            <div className="mt-2">
              <input
                {...register("username", {
                  required: "*This Field is required",
                })}
                id="username"
                name="username"
                type="text"
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6"
              />
              {errors.username && (
                <span className="text-red-500 text-xs">
                  {errors.username.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <div>
              <div className="flex items-start gap-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <span className="text-red-500">*</span>
              </div>
              <div className="mt-2">
                <input
                  {...register("password", {
                    required: "*This Field is required",
                  })}
                  id="password"
                  name="password"
                  type="password"
                  className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 disabled:bg-indigo-800"
            >
              {loading ? (
                <div className=" flex items-center gap-1">
                  <CgSpinner className="animate-spin h-5 w-5" />
                  Loading
                </div>
              ) : pathname === "/login" ? (
                "Login"
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          {pathname === "/login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <Link
            href={pathname === "/login" ? "/register" : "/login"}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            {pathname === "/login" ? "Register" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
