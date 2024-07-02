import React from "react";
import { usePagination, DOTS } from "../hooks/usePagination";
import styles from "./styles/pagination.module.css";

const Pagination = ({
  currentPage,
  siblingCount = 1,
  totalPageCount,
  onPageChange,
}) => {
  const paginationRange = usePagination({
    currentPage,
    siblingCount,
    totalPageCount,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className={styles.pagination_wrapper}>
      <div className={styles.pagination_container}>
        <button
          disabled={currentPage === 1}
          type="button"
          className={styles.button_previous}
          onClick={onPrevious}
        >
          <svg
            width="9"
            fill="currentColor"
            height="8"
            className=""
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
          </svg>
        </button>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <button className={styles.previous}>&#8230;</button>;
          }
          return (
            <button
              type="button"
              className={`${styles.buttonBase} ${
                pageNumber === currentPage
                  ? styles.buttonActive
                  : styles.buttonInactive
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          disabled={currentPage === lastPage}
          type="button"
          className={styles.next}
          onClick={onNext}
        >
          <svg
            width="9"
            fill="currentColor"
            height="8"
            className=""
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
