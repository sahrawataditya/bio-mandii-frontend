import { MdArrowLeft, MdArrowRight } from "react-icons/md";

const Pagination = ({ currentPage, setCurrentPage, counts }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(counts / 10); i++) {
    pageNumbers.push(i);
  }
  return (
    <ol className="flex justify-end gap-1 text-sm font-medium py-2 my-4">
      <li>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 disabled:bg-gray-200 disabled:pointer-events-none"
        >
          <MdArrowLeft size={20} />
        </button>
      </li>
      {pageNumbers.map((page) => (
        <li
          onClick={() => setCurrentPage(page)}
          className={`block size-8 rounded ${
            page === currentPage
              ? "bg-black text-white"
              : "border-gray-100 bg-white text-black"
          }  text-center leading-8`}
        >
          <button>{page || 1}</button>
        </li>
      ))}
      <li>
        <button
          disabled={currentPage === pageNumbers.length}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 disabled:bg-gray-300"
        >
          <MdArrowRight size={20} />
        </button>
      </li>
    </ol>
  );
};

export default Pagination;
