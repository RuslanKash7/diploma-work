import React from "react";
import { Pagination } from "react-bootstrap";
import _ from "lodash";

const Pages = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pagesCount + 1);

  if (pagesCount === 1) return null;
  return (
    <>
      <Pagination>
        {pages.map((page) => (
          <Pagination.Item
            key={page}
            className={"page-item " + (page === currentPage ? "active" : "")}
            onClick={() => {
              onPageChange(page);
            }}
          >
            {page}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
};

export default Pages;
