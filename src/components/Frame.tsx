import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { RocketLaunchIcon } from '@heroicons/react/24/solid';
import { Table } from '~/components/Table';
import { SearchBar } from '~/components/SearchBar';
import { SpaceXCrew } from '~/pages';
import type { Agency } from '~/components/Dropdown';
import { Dropdown } from '~/components/Dropdown';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { signOut } from 'next-auth/react';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const userNavigation = [{ name: 'Sign out', onClick: () => signOut() }];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type FrameProps = {
  spaceXCrew: SpaceXCrew[];
};

export function Frame({ spaceXCrew }: FrameProps) {
  const [filteredCrew, setFilteredCrew] = useState(spaceXCrew);
  const [searchValue, setSearchValue] = useState('');
  const [agencyValue, setAgencyValue] = useState<Agency | null>(null);

  function onSearch(crewList: SpaceXCrew[]) {
    if (!searchValue) {
      return crewList;
    }

    return crewList.filter((person) => {
      const lowerCaseName = person.name.toLowerCase();
      const lowerCaseSearchValue = searchValue.toLowerCase();

      return lowerCaseName.includes(lowerCaseSearchValue);
    });
  }

  function agencySelect(crewList: SpaceXCrew[]) {
    if (!agencyValue) {
      return crewList;
    }

    return crewList.filter((person) => person.agency === agencyValue.name);
  }

  useEffect(() => {
    const searchResult = onSearch(spaceXCrew);
    const agencyResult = agencySelect(searchResult);

    setFilteredCrew(agencyResult);
  }, [searchValue, agencyValue]);

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-1 px-6">
                      <ConnectButton />
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    onClick={void item.onClick}
                                    href="#"
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto flex max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <RocketLaunchIcon className={'h-12  w-12 text-red-500'} />
            <h1 className="flex px-6 py-1 text-3xl font-bold tracking-tight text-gray-900">SpaceX Crew</h1>
            <div className="flex-1">
              <SearchBar onChange={setSearchValue} />
            </div>
            <div className="flex-1">
              <Dropdown onChange={setAgencyValue} />
            </div>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <Table crew={filteredCrew} />
          </div>
        </main>
      </div>
    </>
  );
}
