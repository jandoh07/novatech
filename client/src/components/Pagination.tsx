import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import type { Pagination } from "../types/Product";

interface PaginationInfoProps {
  paginationInfo: Pagination;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationInfoProps> = ({
  paginationInfo,
  page,
  setPage,
}) => {
  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (page < paginationInfo.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePage = (currentPage: number) => {
    if (page !== currentPage) {
      setPage(currentPage);
    }
  };

  return (
    <div className="flex gap-2 items-center justify-center mt-5">
      <div
        className={`p-1 text-lg text-white bg-secondary rounded cursor-pointer ${
          page === 1 && "opacity-50 cursor-default"
        }`}
        onClick={() => handlePrevPage()}
      >
        <MdOutlineKeyboardArrowLeft />
      </div>
      {paginationInfo?.totalPages &&
        Array.from({ length: paginationInfo.totalPages }, (_, i) => i + 1).map(
          (p) => (
            <div
              key={p}
              className={`cursor-pointer px-2 py-1 text-sm text-white bg-secondary rounded ${
                page === p && "border-2 border-tertiary cursor-default"
              }`}
              onClick={() => handlePage(p)}
            >
              {p}
            </div>
          )
        )}
      <div
        className={`p-1 text-lg text-white bg-secondary rounded cursor-pointer ${
          page === paginationInfo?.totalPages && "opacity-50 cursor-default"
        }`}
        onClick={() => handleNextPage()}
      >
        <MdOutlineKeyboardArrowRight />
      </div>
    </div>
  );
};

export default Pagination;
