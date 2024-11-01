
'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  DialogTitle 
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

  ShoppingCartIcon,
  UserCircleIcon,
  NewspaperIcon,
  QuestionMarkCircleIcon,
  ClipboardDocumentCheckIcon,
  ArrowPathIcon

} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon, MoonIcon } from '@heroicons/react/20/solid'
import Tables from '../components/Tables'
import  OverView from '../components/OverView'
// import { HomeIcon, UsersIcon, FolderIcon, CalendarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import SalesOrder from '../components/SalesOrder';
import StockDrugs from '../components/StockDrugs';
import Reports from '../components/Reports'
import Pricing from '../components/pricing'
import logo from '../assets/Frame.svg';
import { Field, Label, Switch } from '@headlessui/react'
import { useAuth } from '../context/AuthContext';
import InputOrder from '../components/overviewComponents/input order/inputOrder';
import Customer from '../components/overviewComponents/Create Customer/createCustomer';
import Stock from '../components/overviewComponents/stock/stock';
import Settings from '../components/overviewComponents/settings/settings';
import Inventory from '../components/overviewComponents/Inventory/inventory';
import Invoice from '../components/overviewComponents/Invoice/invoice';
import User from '../components/overviewComponents/settings/user'

// import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../../context/AuthContext';


// const navigation = [
//   { name: 'Overview', href: '#', icon: HomeIcon, current: true },
//   { name: 'Product', href: '#', icon: UsersIcon, current: false },
//   { name: 'Settings', href: '#', icon: FolderIcon, current: false },
//   { name: 'Help center', href: '#', icon: CalendarIcon, current: false },


const navigation = [
  { name: 'Overview', href: '#', icon: HomeIcon, current: true },
  { name: 'Input Order', href: '#', icon: ShoppingCartIcon , current: false},
  { name: 'Create Customer', href: '#', icon: UserCircleIcon, current: false  },
  { name: 'Products', href: '#', icon: ClipboardDocumentCheckIcon, current: false  },
  { name: 'Invoice', href: '#', icon: NewspaperIcon, current: false  },
  { name: 'Settings', href: '#', icon: Cog6ToothIcon,current: false  },
  { name: 'Help Center', href: '#', icon: QuestionMarkCircleIcon,current: false  },
];
// ];


const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Overview');
  const [enabled, setEnabled] = useState(false)
  const { user, isAuthenticated } = useAuth();
  const [productsOpen, setProductsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  const navigate = useNavigate(); // Use the useNavigate hook for navigation

 

  // const handleLogout = () => {
  //   logout(); // Clear user data and authentication status
  //   navigate('/login'); // Redirect to login page
  // };

  const handleLogout = () => {
    // Clear user details from context or state
    logout(); // Assuming you have a logout method in your AuthContext
  
    // Clear local storage or session storage if you store any user data or tokens
    localStorage.removeItem('authToken');
    sessionStorage.clear();
  
    setOpen(false);
    // Optionally display a message
    setMessage('You have successfully logged out.');
  
    // Redirect to login page
    navigate('/login');
  };

  const renderContent = () => {
    switch (selectedItem) {
      case 'Overview':
        // return <Pricing />;
      // return <Tables />;
      return <OverView />;
      case 'Product':
        // return <SalesOrder />;
        return <Stock />;
      // case 'Settings':
      //   return <StockDrugs />;
      case 'Help center':
        return <Reports />;
        case 'Input Order':
                return <InputOrder />;
            case 'Create Customer':
                return <Customer />;
            case 'Stock Products':
                return <Stock />;
            case 'Invoice':
                return <Invoice />;
            case 'Inventory':
                return <Inventory />;
                case 'Settings':
                  setSelectedItem('General Settings')
              case 'General Settings':
                  return <Settings />;
            case 'Users':
                return <User />;
      default:
        return <Pricing />;
    }
  };

  const handleProductClick = () => {
    setProductsOpen(prev => !prev);
    setSettingsOpen(false); // Close Settings submenu
    setSelectedItem('Products');
};

const handleSettingsClick = () => {
    setSettingsOpen(prev => !prev);
    setProductsOpen(false); // Close Products submenu
    setSelectedItem('Settings');
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
                                                            onClick={item.name === 'Products' ? handleProductClick : item.name === 'Settings' ? handleSettingsClick : () => setSelectedItem(item.name)}
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
                                                        {item.name === 'Products' && productsOpen && (
                                                            <ul className="pl-8 mt-2 space-y-1">
                                                                <li>
                                                                    <a
                                                                        href="#"
                                                                        onClick={() => setSelectedItem('Stock Products')}
                                                                        className="block p-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded"
                                                                    >
                                                                        Stock Products
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="#"
                                                                        onClick={() => setSelectedItem('Returned Products')}
                                                                        className="block p-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded"
                                                                    >
                                                                        Returned Products
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="#"
                                                                        onClick={() => setSelectedItem('Inventory')}
                                                                        className="block p-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded"
                                                                    >
                                                                        Inventory
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        )}
                                                        {item.name === 'Settings' && settingsOpen && (
                                                            <ul className="pl-8 mt-2 space-y-1">
                                                                <li>
                                                                    <a
                                                                        href="#"
                                                                        onClick={() => setSelectedItem('General Settings')}
                                                                        className="block p-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded"
                                                                    >
                                                                        General
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="#"
                                                                        onClick={() => setSelectedItem('Users')}
                                                                        className="block p-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded"
                                                                    >
                                                                        Users
                                                                    </a>
                                                                </li>

                                                            </ul>
                                                        )}
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
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center py-20">
              <img
                alt="Your Company"
                src={logo}
                className="h-6 w-auto" // Reduced size to h-6
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
                                                    onClick={item.name === 'Products' ? handleProductClick : item.name === 'Settings' ? handleSettingsClick : () => setSelectedItem(item.name)}
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
                                                {item.name === 'Products' && productsOpen && (
                                                    <ul className="pl-8 mt-2 space-y-1">
                                                        <li>
                                                            <a
                                                                href="#"
                                                                onClick={() => setSelectedItem('Stock Products')}
                                                                className="block p-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded"
                                                            >
                                                                Stock Products
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                onClick={() => setSelectedItem('Returned Products')}
                                                                className="block p-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded"
                                                            >
                                                                Returned Products
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                onClick={() => setSelectedItem('Inventory')}
                                                                className="block p-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded"
                                                            >
                                                                Inventory
                                                            </a>
                                                        </li>
                                                    </ul>
                                                )}
                                                {item.name === 'Settings' && settingsOpen && (
                                                    <ul className="pl-8 mt-2 space-y-1">
                                                        <li>
                                                            <a
                                                                href="#"
                                                                onClick={() => setSelectedItem('General Settings')}
                                                                className="block p-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded"
                                                            >
                                                                General
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                onClick={() => setSelectedItem('Users')}
                                                                className="block p-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded"
                                                            >
                                                                Users
                                                            </a>
                                                        </li>

                                                    </ul>
                                                )}
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
                    onClick={() => setOpen(true)} // Open the modal when clicked
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

        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
        <DialogBackdrop
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    Confirm Logout
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to log out? This action will end your session.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                >
                  Logout
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Separator */}
            <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <h2 className="relative flex flex-1 leading-[24.05px] top-4 text-[20px]">{selectedItem}</h2>
            </div>
          </div>

          <main className="py-10">
                {/* {isAuthenticated ? (
              <p>Welcome, {user.email}!</p>
            ) : (
              <p>Please log in.</p>
            )} */}
            <div className="px-4 sm:px-6 lg:px-8">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
