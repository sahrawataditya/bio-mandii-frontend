import { axiosService } from "@/app/lib/axiosService";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

export default function CreateTaskModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosService.post("/task/create", data);
      if (response.data.success) {
        toast.success(response.data.message);
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
      setOpen(false);
      reset();
    }
  };
  return (
    <>
      <button
        className="block rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black border-black border focus:outline-none transition-all duration-300 ease-in"
        onClick={() => setOpen(true)}
      >
        Create Task
      </button>
      <Transition show={open}>
        <Dialog className="relative z-20" onClose={setOpen}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="bg-white mb-4">
                    <div className="mt-3 text-center  sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h2"
                        className="text-lg leading-6 text-gray-900 font-bold"
                      >
                        Create Task
                      </DialogTitle>
                    </div>
                  </div>
                  <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="w-full">
                        <label
                          htmlFor="title"
                          className="text-sm font-semibold"
                        >
                          Enter Title
                        </label>
                        <input
                          {...register("title", {
                            required: "*Title is Required",
                          })}
                          className="rounded-lg border-black border outline-none p-3 text-sm w-full mt-2"
                          placeholder="Enter Title...."
                          type="text"
                          id="title"
                        />
                        {errors.title && (
                          <span className="text-red-500 text-sm">
                            {errors.title.message}
                          </span>
                        )}
                      </div>
                      <div className="w-full mt-2">
                        <label htmlFor="desc" className="text-sm font-semibold">
                          Enter Description
                        </label>
                        <input
                          {...register("description", {
                            required: "*Description is Required",
                          })}
                          className="rounded-lg border-black border outline-none p-3 text-sm w-full mt-2"
                          placeholder="Enter Description...."
                          type="text"
                          id="desc"
                        />
                        {errors.description && (
                          <span className="text-red-500 text-sm">
                            {errors.description.message}
                          </span>
                        )}
                      </div>
                      <div className="sm:flex sm:flex-row-reverse pt-5">
                        <button
                          type="submit"
                          disabled={loading}
                          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black sm:ml-3 sm:w-auto flex items-center gap-1 border border-black"
                        >
                          Create
                          {loading && (
                            <CgSpinner className="animate-spin " size={20} />
                          )}
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto outline-none"
                          onClick={() => setOpen(false)}
                          data-autofocus
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
