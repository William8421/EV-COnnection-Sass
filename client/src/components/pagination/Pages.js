import { useState } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import useComments from "../../context/commentsContext/useComments";

export default function Pages({ numberOfPages, paginate, pages }) {
  const [prevNextPage, setPrevNextPage] = useState(1);
  // const { allComments } = useComments();
  const pageNumbers = [];

  pages.map((item, index) => {
    if (index >= 1 && index <= numberOfPages) {
      pageNumbers.push(index);
    }
    return item;
  });

  function pageHandler(e) {
    setPrevNextPage(e);
    paginate(e);
    window.scroll(0, 0);
  }

  return (
    <div className="pagesContainer">
      <Pagination>
        <PaginationItem disabled={prevNextPage === 1}>
          <PaginationLink
            className="PagLinkFirstStyled"
            previous
            onClick={() => pageHandler(prevNextPage - 1)}
          ></PaginationLink>
        </PaginationItem>
        <PaginationItem className="paginationNumbersItem">
          {pageNumbers.map((page) => (
            <PaginationLink
              className="PagLinkStyledNum"
              key={page}
              onClick={() => pageHandler(page)}
            >
              {page}
            </PaginationLink>
          ))}
        </PaginationItem>
        <PaginationItem disabled={prevNextPage >= numberOfPages}>
          <PaginationLink
            className="PagLinkLastStyled"
            next
            onClick={() => pageHandler(prevNextPage + 1)}
          ></PaginationLink>
        </PaginationItem>
      </Pagination>
    </div>
  );
}
