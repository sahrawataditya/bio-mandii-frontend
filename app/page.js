"use client";
import Logout from "./components/Common/Logout";
import TaskTable from "./components/Home/TaskTable";
import { useUser } from "./hooks/useUser";
export default function Home() {
  const { userData, loading } = useUser();
  return (
    <header>
      <div className="mx-auto container px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Logout />
        <div className="flex sm:flex-row flex-col flex-wrap sm:justify-between items-center">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Welcome Back,{" "}
              {loading ? (
                <span className="animate-bounce">-</span>
              ) : (
                userData?.username
              )}
              !
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Let's create a new task! 🎉
            </p>
          </div>
          <div className="mt-4 gap-4 sm:mt-0">
            <button
              className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2"
              type="button"
            >
              Create Task
            </button>
          </div>
        </div>
        <TaskTable />
      </div>
    </header>
  );
}
