import { useUser } from "@/app/hooks/useUser";
import { axiosService } from "@/app/lib/axiosService";
import moment from "moment";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import DeleteAllTasksModal from "../Tasks/DeleteAllTasksModal";
import DeleteSingleTasksModal from "../Tasks/DeleteSingleTaskModal";
import EditTaskModal from "../Tasks/EditTaskModal";
import ReadTaskModal from "../Tasks/ReadTaskModal";
import Pagination from "../Tasks/Pagination";

const TaskTable = () => {
  const { token } = useUser();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasks, setTasks] = useState(null);
  const [counts, setCounts] = useState(null);
  const getUserTasks = async () => {
    setLoading(true);
    try {
      const response = await axiosService.get(
        `/task/getTasks?page=${currentPage}`
      );
      if (response.data.success) {
        setCounts(response.data.counts);
        setTasks(response.data.tasks);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getUserTasks();
    }
  }, [currentPage]);

  return (
    <div className="bg-white flex  items-center justify-center pt-5 pb-14">
      <div className="w-full px-2">
        <div className="flex justify-between items-center">
          <h1 className="sm:text-xl text-base font-medium">All Tasks</h1>
          <DeleteAllTasksModal />
        </div>
        <div className="w-full overflow-x-scroll md:overflow-auto 2xl:max-w-none mt-2">
          <table className="table-auto overflow-scroll md:overflow-auto w-full text-left border mt-6">
            <thead className="rounded-lg text-base text-white font-semibold w-full">
              <tr className="bg-[#222E3A]/[6%]">
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold text-center whitespace-nowrap">
                  ID
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold text-center whitespace-nowrap">
                  Title
                </th>
                <th className="py-3 px-3  justify-center gap-1 text-[#212B36] sm:text-base font-bold text-center whitespace-nowrap">
                  Description
                </th>
                <th className="py-3 px-3  justify-center gap-1 text-[#212B36] sm:text-base font-bold text-center whitespace-nowrap">
                  Status
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold text-center whitespace-nowrap">
                  Created on
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold text-center whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr className=" w-full">
                  <td className="w-full p-4" colSpan="100%">
                    <div className="flex justify-center items-center gap-2">
                      <CgSpinner className="animate-spin h-5 w-5" />
                      Loading...
                    </div>
                  </td>
                </tr>
              )}
              {!loading &&
                tasks?.length > 0 &&
                tasks?.map((data, index) => (
                  <tr key={index}>
                    <td
                      className={`py-2 px-3 font-normal text-base ${
                        index == 0
                          ? "border-t border-black"
                          : index == tasks?.length
                          ? "border-y"
                          : "border-t"
                      } whitespace-nowrap text-center`}
                    >
                      {data?._id}
                    </td>
                    <td
                      className={`py-2 px-3 font-normal text-base ${
                        index == 0
                          ? "border-t border-black"
                          : index == tasks?.length
                          ? "border-y"
                          : "border-t"
                      } whitespace-nowrap text-center`}
                    >
                      {data?.title}
                    </td>
                    <td
                      className={`py-2 px-3 font-normal text-base ${
                        index == 0
                          ? "border-t border-black"
                          : index == tasks?.length
                          ? "border-y"
                          : "border-t"
                      } whitespace-nowrap text-center`}
                    >
                      {data?.description}
                    </td>
                    <td
                      className={`py-2 px-3 text-base text-center  font-normal ${
                        index == 0
                          ? "border-t border-black"
                          : index == tasks?.length
                          ? "border-y"
                          : "border-t"
                      } whitespace-nowrap capitalize`}
                    >
                      <span
                        class={`inline-flex items-center justify-center font-medium rounded-full px-2.5 py-1  ${
                          data?.status === "in progress"
                            ? "bg-amber-100 text-amber-700"
                            : data?.status === "completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : data?.status === "not started"
                            ? "bg-red-100 text-red-700"
                            : ""
                        }`}
                      >
                        <p class="whitespace-nowrap text-sm">{data?.status}</p>
                      </span>
                    </td>
                    <td
                      className={`py-2 px-3 text-base text-center font-medium ${
                        index == 0
                          ? "border-t border-black"
                          : index == tasks?.length
                          ? "border-y"
                          : "border-t"
                      } whitespace-nowrap`}
                    >
                      {moment(data?.createdAt).format("DD-MMM-YY")}
                    </td>
                    <td
                      className={`py-2 px-3 text-base text-center font-medium ${
                        index == 0
                          ? "border-t border-black"
                          : index == tasks?.length
                          ? "border-y"
                          : "border-t"
                      } whitespace-nowrap`}
                    >
                      <div className="flex gap-3 justify-center">
                        <ReadTaskModal Task={data} />
                        <EditTaskModal Task={data} getAllTasks={getUserTasks} />
                        <DeleteSingleTasksModal
                          Task={data}
                          getAllTasks={getUserTasks}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Pagination
          counts={counts}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};
export default TaskTable;
