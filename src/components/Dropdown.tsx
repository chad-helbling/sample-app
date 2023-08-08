import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

export type Agency = {
  id: number;
  name: string;
  avatar: string;
};

const agencies: Agency[] = [
  {
    id: 1,
    name: 'NASA',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg',
  },
  {
    id: 2,
    name: 'ESA',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/8/80/ESA_logo.svg',
  },
  {
    id: 3,
    name: 'JAXA',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Jaxa_logo.svg',
  },
  {
    id: 4,
    name: 'SpaceX',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/SpaceX_logo_black.svg',
  },
  {
    id: 5,
    name: 'Axiom Space',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Axiom_Space_logo.svg',
  },
  {
    id: 6,
    name: 'Roscosmos',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Roscosmos-logo-main.png',
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type DropdownProps = {
  onChange: (a: Agency | null) => void;
};

export function Dropdown({ onChange }: DropdownProps) {
  const [selected, setSelected] = useState<Agency | null>(null);

  function selectHanlder(newSelected: Agency) {
    if (selected?.id === newSelected?.id) {
      setSelected(null);
      onChange(null);
      return;
    }

    setSelected(newSelected);
    onChange(newSelected);
  }

  return (
    <Listbox value={selected} onChange={selectHanlder}>
      {({ open }) => (
        <div className="flex">
          <div className="flex-none p-2">
            <Listbox.Label className="text-sm font-medium leading-6 text-gray-900">Agency</Listbox.Label>
          </div>
          <div className="relative mt-2 flex-1">
            <Listbox.Button
              className="relative  cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
              data-testid="dropdown-button"
            >
              <span className="flex items-center">
                {selected ? <img src={selected?.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> : ''}
                <span className="ml-3 block truncate">{selected?.name || 'All'}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {agencies.map((agency) => (
                  <Listbox.Option
                    key={agency.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={agency}
                    data-testid={agency.name}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img src={agency.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {agency.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}
