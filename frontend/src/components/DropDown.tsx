import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronDown } from 'lucide-react';
import React from 'react'

const DropDown = ({
    selected,
    onChange,
    data,
}: {
    selected: string;
    onChange: (value: string) => void;
    data: string[]
  }) => {
  return (
    <div>
          <Listbox value={selected} onChange={onChange}>
              <div className="relative mt-1">
                  <ListboxButton className="relative w-full cursor-pointer rounded-md  py-2 pl-4 pr-10 text-left shadow-sm border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-orange-400 dark:bg-gray-800 dark:text-white">
                      <span className="block truncate">{selected}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                          <ChevronDown className="h-5 w-5 text-gray-400 dark:text-gray-200" />
                      </span>
                  </ListboxButton>

                  <ListboxOptions className="absolute z-50 mt-1 max-h-100 w-full overflow-auto rounded-md bg-[#fffaf5] p-1 text-base shadow-lg ring-1 ring-orange-500 ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-900 dark:text-white">
                      {data.map((industry, idx) => (
                          <ListboxOption
                              key={idx}
                              value={industry}
                              className={({ active }) =>
                                  `relative rounded-md cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-orange-500 text-white dark:bg-orange-900' : 'text-gray-900 dark:text-white'
                                  }`
                              }
                          >
                              {({ selected }) => (
                                  <>
                                      <span className={`block truncate ${selected ? 'font-medium text-orange-600' : 'font-normal'}`}>
                                          {industry}
                                      </span>
                                      {selected && (
                                          <span className="absolute inset-y-0 left-2 flex items-center text-orange-500">
                                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                          </span>
                                      )}
                                  </>
                              )}
                          </ListboxOption>
                      ))}
                  </ListboxOptions>
              </div>
          </Listbox>
    </div>
  )
}

export default DropDown