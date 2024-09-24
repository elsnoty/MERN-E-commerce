import {
  Pagination,
  PaginationContent,
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "./pagination";

const PaginationCompontent = (props: {
  handleNext: (next: number) => void;
  page: number;
  totalPages: number;
}) => {
  const { page, totalPages, handleNext } = props;

  return (
        <Pagination>
          <PaginationContent>
          <PaginationPrevious
          onClick={() => handleNext(page > 1 ? page - 1 : page)}
          className={page === 1 ? "disabled" : ""} 
        />

        {page > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => handleNext(1)}>1</PaginationLink>
          </PaginationItem>
        )}

        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page > 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => handleNext(page - 1)}>
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Show the current page as active */}
        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>

        {/* Show the next page if applicable */}
        {page < totalPages && (
          <PaginationItem>
            <PaginationLink onClick={() => handleNext(page + 1)}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Ellipsis for when there are multiple pages after the current page */}
        {page < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Show the last page if applicable */}
        {page < totalPages && (
          <PaginationItem>
            <PaginationLink onClick={() => handleNext(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationNext
          onClick={() => handleNext(page < totalPages ? page + 1 : page)}
          className={page === totalPages ? "disabled" : ""} // Add a class for disabled state
        />
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationCompontent;
