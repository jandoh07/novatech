import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import type { Pagination } from "../types/Product";

interface PaginationInfoProps {
  paginationInfo: Pagination;
}

const Pagination: React.FC<PaginationInfoProps> = ({ paginationInfo }) => {
  return (
    <div className="flex gap-2 items-center justify-center mt-5">
      <div
        className={`p-1 text-lg text-white bg-secondary rounded cursor-pointer ${
          paginationInfo?.currentPage === 1 && "opacity-50 cursor-default"
        }`}
      >
        <MdOutlineKeyboardArrowLeft />
      </div>
      {paginationInfo?.totalPages &&
        Array.from({ length: paginationInfo.totalPages }, (_, i) => i + 1).map(
          (page) => (
            <div
              key={page}
              className={`cursor-pointer px-2 py-1 text-sm text-white bg-secondary rounded ${
                paginationInfo?.currentPage === page &&
                "border border-tertiary cursor-default"
              }`}
            >
              {page}
            </div>
          )
        )}
      <div
        className={`p-1 text-lg text-white bg-secondary rounded cursor-pointer ${
          paginationInfo?.currentPage === paginationInfo?.totalPages &&
          "opacity-50 cursor-default"
        }`}
      >
        <MdOutlineKeyboardArrowRight />
      </div>
    </div>
  );
};

export default Pagination;
