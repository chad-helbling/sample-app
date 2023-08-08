import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Dispatch, SetStateAction } from 'react';

type PaginationBarProps = {
  crewPerPage: number;
  totalCrew: number;
  visibleCrew: number;
  indexOfFirstCrew: number;
  currentPage: number;
  paginate: Dispatch<SetStateAction<number>>;
};

export function PaginationBar({
                                crewPerPage,
                                totalCrew,
                                visibleCrew,
                                indexOfFirstCrew,
                                currentPage,
                                paginate,
                              }: PaginationBarProps) {
  const totalPages = Math.ceil(totalCrew / crewPerPage);
  //make array not zero based for page numbers
  const pageNumbers = [ ...Array(totalPages).keys() ].map((element, index) => index + 1);

  const classNameSelected =
    'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-default';
  const claseNameBase =
    'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0 cursor-default';

  function paginateHandler(page: number) {
    if (page > totalPages || page < 1) return;

    paginate(page);
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span data-testid="showing-first-value" className="font-medium ">
              {visibleCrew ? indexOfFirstCrew + 1 : 0}
            </span>{' '}
            to{' '}
            <span data-testid="showing-last-value" className="font-medium">
              {indexOfFirstCrew + visibleCrew}
            </span>{' '}
            of{' '}
            <span data-testid="total-value" className="font-medium">
              {totalCrew}
            </span>{' '}
            results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              onClick={() => paginateHandler(currentPage - 1)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
            </a>
            {pageNumbers?.map((page) => (
              <a
                key={page}
                onClick={() => paginateHandler(page)}
                className={page === currentPage ? classNameSelected : claseNameBase}
              >
                {page}
              </a>
            ))}

            <a
              onClick={() => paginateHandler(currentPage + 1)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true"/>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
