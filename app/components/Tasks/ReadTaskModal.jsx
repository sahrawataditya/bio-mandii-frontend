import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";

export default function ReadTaskModal({ Task }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className=" p-2 text-black text-sm rounded-md font-semibold shadow-sm bg-gray-200 focus:ring-2 ring-gray-100"
      >
        <MdRemoveRedEye size={18} />
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
                        Task
                      </DialogTitle>
                    </div>
                  </div>
                  <div>
                    <h1 className="font-semibold">
                      Title : <span className="font-normal">{Task?.title}</span>
                    </h1>
                    <h1 className="font-semibold">
                      Description : <span className="font-normal">{Task?.description}</span>
                    </h1>
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
