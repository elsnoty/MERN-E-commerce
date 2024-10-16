import {
  Pagination,
  PaginationContent,
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "./pagination";

const PaginationComponent = (props: {
  handleNext: (next: number) => void;
  page: number;
  totalPages: number;
}) => {
  const { page, totalPages, handleNext } = props;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious
          onClick={() => {
            if (page > 1) {
              handleNext(page - 1);
            }
          }}
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

        <PaginationItem>
          <PaginationLink isActive className="cursor-pointer">
            {page}
          </PaginationLink>
        </PaginationItem>

        {page < totalPages && page + 1 < totalPages && (
          <PaginationItem>
            <PaginationLink onClick={() => handleNext(page + 1)}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {page < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Only show the last page if it's not already the next page */}
        {page < totalPages && (
          <PaginationItem>
            <PaginationLink onClick={() => handleNext(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationNext
          onClick={() => {
            if (page < totalPages) {
              handleNext(page + 1);
            }
          }}
          className={page === totalPages ? "disabled" : ""}
        />
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
