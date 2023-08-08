import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ChangeEvent } from 'react';

type SearchBarProps = {
  onChange: (a: string) => void;
};

export function SearchBar({ onChange }: SearchBarProps) {
  return (
    <div>
      <div className="relative mt-2 flex w-full max-w-md flex-wrap items-stretch rounded-md shadow-sm">
        <div className="flex-auto">
          <input
            type="text"
            name="search"
            id="search"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="search"
            onChange={(event) => onChange(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
