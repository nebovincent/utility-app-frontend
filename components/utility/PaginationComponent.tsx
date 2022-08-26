import Link from "next/link";
import React from "react";
import classes from "components/utility/PaginationComponent.module.css";
import { server } from "config/index";

function PaginationComponent({
  className,
  itemsPerPage,
  totalItems,
  paginate,
  prevPage,
  nextPage,
  forwardPages,
}: any) {
  const PageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    PageNumbers.push(i);
  }

  let displayedPaginationPages;
  let morePageNumbers;
  if (PageNumbers.length <= 6) {
    displayedPaginationPages = PageNumbers.map((number) => (
      <li
        key={number}
        onClick={() => {
          paginate(number);
        }}
      >
        {number}
      </li>
    ));
  } else {
    displayedPaginationPages = (
      <>
        {PageNumbers.slice(0, 6).map((number) => (
          <li
            key={number}
            onClick={() => {
              paginate(number);
            }}
          >
            {number}
          </li>
        ))}
        <li
          onClick={() => {
            forwardPages();
          }}
          style={{ lineHeight: "15px" }}
        >
          ...
        </li>
      </>
    );
  }

  return (
    <div className={classes.pagination_main}>
      <div>
        <ul className={classes.pagination}>
          <li
            onClick={() => {
              prevPage();
            }}
          >
            &laquo;
          </li>
          {displayedPaginationPages}
          <li
            onClick={() => {
              nextPage();
            }}
          >
            &raquo;
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PaginationComponent;
