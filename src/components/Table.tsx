import { SpaceXCrew } from '~/pages';
import { PaginationBar } from '~/components/PaginationBar';
import { useEffect, useState } from 'react';

type TableProps = {
  crew: SpaceXCrew[];
};

export function Table({ crew }: TableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const crewPerPage = 10;

  const indexOfLastCrew = currentPage * crewPerPage;
  const indexOfFirstCrew = indexOfLastCrew - crewPerPage;
  const currentCrew = crew.slice(indexOfFirstCrew, indexOfLastCrew);

  // reset current page if crew changes, meaning filter criteria changed
  useEffect(() => setCurrentPage(1), [crew]);

  return (
    <>
      <ul role="list" className="divide-y divide-gray-100">
        {currentCrew?.map((crewData: SpaceXCrew) => (
          <li key={crewData.name} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={crewData.image} alt="" />
              <div className="min-w-0 flex-auto">
                <p data-testid="crew-name" className="text-sm font-semibold leading-6 text-gray-900">
                  {crewData.name}
                </p>
              </div>
              <p className="text-sm font-semibold leading-6 text-gray-900">
                Agency:{' '}
                <span data-testid="crew-agency" className="text-sm font-semibold leading-6 text-gray-500">
                  {crewData.agency}
                </span>
              </p>
              <p className="text-sm font-semibold leading-6 text-gray-900">
                More Info:{' '}
                <a
                  data-testid="crew-link"
                  className="text-sm font-semibold leading-6 text-gray-500"
                  href={crewData.wikipedia}
                >
                  {crewData.wikipedia}
                </a>
              </p>
            </div>
          </li>
        ))}
      </ul>
      <PaginationBar
        crewPerPage={crewPerPage}
        totalCrew={crew.length}
        visibleCrew={currentCrew.length}
        indexOfFirstCrew={indexOfFirstCrew}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
    </>
  );
}
