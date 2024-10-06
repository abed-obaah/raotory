import React, { useState } from "react";

import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
} from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,

} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon, MoonIcon } from '@heroicons/react/20/solid'
import Tables from '../components/Tables'
// import { HomeIcon, UsersIcon, FolderIcon, CalendarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import SalesOrder from '../components/SalesOrder';
import StockDrugs from '../components/StockDrugs';
import Reports from '../components/Reports'
import Customer from '../components/overviewComponents/Create Customer/createCustomer'
import InputOrder from '../components/overviewComponents/input order/inputOrder'
import logo from '../assets/Frame.svg';
import { Field, Label, Switch } from '@headlessui/react'

const navigation = [
    { name: 'Input Order', href: '#', icon: HomeIcon, current: true },
    { name: 'Create Customer', href: '#', icon: UsersIcon, current: false },
    { name: 'Products', href: '#', icon: FolderIcon, current: false },
    { name: 'Invoice', href: '#', icon: CalendarIcon, current: false },
    { name: 'Settings', href: '#', icon: CalendarIcon, current: false },
    { name: 'Help Center', href: '#', icon: CalendarIcon, current: false },

];



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('Input Order');
    const [enabled, setEnabled] = useState(false)

    const renderContent = () => {
        switch (selectedItem) {
            case 'Overview':
                return <InputOrder />;
            case 'Create Customer':
                return <Customer />;
            case 'Settings':
                return <StockDrugs />;
            case 'Help center':
                return <Reports />;
            default:
                return <InputOrder />;
        }
    };

    return (
        <>

            <div>
                <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            transition
                            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                        >
                            <TransitionChild>
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                    <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                                    </button>
                                </div>
                            </TransitionChild>
                            {/* Sidebar component, swap this element with another sidebar if you like */}
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                <div className="flex h-16 shrink-0 items-center">
                                    <img
                                        alt="Your Company"
                                        src={logo}
                                        className="h-8 w-auto"
                                    />
                                    {/* <h1 className="text-[24px] font-inter font-bold leading-[29.05px] text-[#008C38]">RAOTory</h1> */}
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" className="-mx-2 space-y-1">
                                                {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        <a
                                                            href={item.href}
                                                            onClick={() => setSelectedItem(item.name)}
                                                            className={classNames(
                                                                item.name === selectedItem
                                                                    ? 'bg-[#E5FFF0] text-[#444444]'
                                                                    : 'text-indigo-200 hover:bg-[#E5FFF0] hover:text-[#444444]',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                            )}
                                                        >
                                                            <item.icon
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    item.name === selectedItem ? 'text-black' : 'text-indigo-200 group-hover:text-white',
                                                                    'h-6 w-6 shrink-0',
                                                                )}
                                                            />
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li className="mt-auto">
                                            <a
                                                href="#"
                                                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                            >
                                                <Cog6ToothIcon
                                                    aria-hidden="true"
                                                    className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                                                />
                                                Settings
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">

                    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                        <div className="flex h-16 shrink-0 items-center py-5 pt-20">
                            <img
                                alt="Your Company"
                                src={logo}
                                className="h-6 w-auto" // Reduced size to h-6
                            />
                            {/* <h1 className="text-[24px] font-inter font-bold leading-[29.05px] text-[#008C38]">RAOTory</h1> */}
                        </div>

                        <nav className="flex flex-1 flex-col">

                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li id="Overview" className="-mx-2 space-y-1 p-4 text-2xl font-semibold border-b"><p>Overview</p></li>
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    onClick={() => setSelectedItem(item.name)}
                                                    className={classNames(
                                                        item.name === selectedItem
                                                            ? 'bg-[#E5FFF0] text-[#444444]'
                                                            : 'text-indigo-200 hover:bg-[#E5FFF0] hover:text-[#444444]',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                    )}
                                                >
                                                    <item.icon
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            item.name === selectedItem ? 'text-black' : 'text-indigo-200 group-hover:text-white',
                                                            'h-6 w-6 shrink-0',
                                                        )}
                                                    />
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>

                                </li>
                                <li className="mt-auto">
                                    <Field className="-mx-2 flex items-center justify-between rounded-lg bg-gray-50 px-2 py-3 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                        <div className="flex items-center">
                                            <MoonIcon
                                                aria-hidden="true"
                                                className="h-6 w-6 shrink-0 text-[#001B2A] group-hover:text-indigo-600"
                                            />
                                            <Label as="span" className="ml-10 text-sm">
                                                <span className="font-medium text-gray-900">Dark Mode</span>
                                            </Label>
                                        </div>
                                        <Switch
                                            checked={enabled}
                                            onChange={setEnabled}
                                            className="group relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[#9CA0B2] transition-colors duration-200 ease-in-out data-[checked]:bg-indigo-600"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-4"
                                            />
                                        </Switch>
                                    </Field>


                                    <a
                                        href="#"
                                        className="group mt-5 -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-[#CA0000] hover:bg-gray-50 hover:text-indigo-600"
                                    >
                                        <Cog6ToothIcon
                                            aria-hidden="true"
                                            className="h-6 w-6 shrink-0 text-[#CA0000] group-hover:text-indigo-600"
                                        />
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="lg:pl-72">
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                        </button>

                        {/* Separator */}
                        <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 ">
                            <h2 className="relative flex flex-1 leading-[24.05px] top-4 text-[20px]">{selectedItem}</h2>
                            <div className="absolute right-4 top-3 flex flex-1 items-center"><button className="relative flex flex1 border items-center mx-3 px-5 h-9 rounded-lg border-gray-200">Pharmacy 001
                                <ChartPieIcon
                                    aria-hidden="true"
                                    className="h-4 w-4 ml-2 shrink-0 text-[blue] group-hover:text-indigo-600"
                                />
                            </button><button className="relative flex flex1 items-center items-center border items-center mx-3 px-7 h-9 rounded-lg  border-gray-200"><BellIcon
                                aria-hidden="true"
                                className="h-4 w-4 mr-2 shrink-0 text-[#001B2A] group-hover:text-indigo-600"
                            />Notification</button></div>
                        </div>
                    </div>

                    <main className="py-10">
                        <div className="px-4 sm:px-6 lg:px-8">
                            {renderContent()}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}