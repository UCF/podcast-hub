import './Paginator.scss';

export interface PaginatorProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

function Paginator({ currentPage, pageCount, onPageChange }: PaginatorProps) {
  if (pageCount <= 1) {
    return null;
  }

  const maxVisiblePages = 5;
  let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(pageCount - 1, startPage + maxVisiblePages - 1);

  // Adjust startPage if endPage is at the limit
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(0, endPage - maxVisiblePages + 1);
  }

  const pageNumbers: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Result pagination">
      <ul className="pagination">
        {/* First page button */}
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(0);
            }}
            aria-label="First page"
          >
            &laquo;
          </a>
        </li>

        {/* Previous page button */}
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 0) {
                onPageChange(currentPage - 1);
              }
            }}
            aria-label="Previous page"
          >
            &lsaquo;
          </a>
        </li>

        {/* Page numbers */}
        {pageNumbers.map((pageNum) => (
          <li
            key={pageNum}
            className={`page-item ${pageNum === currentPage ? 'active' : ''}`}
          >
            <a
              className="page-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(pageNum);
              }}
            >
              {pageNum + 1}
            </a>
          </li>
        ))}

        {/* Next page button */}
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < pageCount - 1) {
                onPageChange(currentPage + 1);
              }
            }}
            aria-label="Next page"
          >
            &rsaquo;
          </a>
        </li>

        {/* Last page button */}
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(pageCount - 1);
            }}
            aria-label="Last page"
          >
            &raquo;
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Paginator;
