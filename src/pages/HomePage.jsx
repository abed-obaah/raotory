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
import OverView from '../components/OverView'
import SalesOrder from '../components/SalesOrder'
import StockDrugs from '../components/StockDrugs'
import Reports from '../components/Reports'
import Pricing from '../components/pricing'
import logo from '../assets/Frame.svg'

import { useAuth } from '../context/AuthContext'
import InputOrder from '../components/overviewComponents/input order/inputOrder'
import Customer from '../components/overviewComponents/Create Customer/createCustomer'
import Stock from '../components/overviewComponents/stock/stock'
import Returned from '../components/overviewComponents/stock/returned'
import Settings from '../components/overviewComponents/settings/settings'
import Inventory from '../components/overviewComponents/Inventory/inventory'
import Invoice from '../components/overviewComponents/Invoice/invoice'
import User from '../components/overviewComponents/settings/user'
import bell from '../assets/Bell.svg'
import refresh from '../assets/refresh.svg'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import Help from '../components/helpCenter'
import { Field, Label, Switch } from '@headlessui/react'

// const navigation = [
//   { name: 'Overview', href: '#', icon: HomeIcon, current: true },
//   { name: 'Input Order', href: '#', icon: ShoppingCartIcon , current: false },
//   { name: 'Create Customers', href: '#', icon: UserCircleIcon, current: false },
//   { name: 'Products', href: '#', icon: ClipboardDocumentCheckIcon, current: false },
//   { name: 'Invoice', href: '#', icon: NewspaperIcon, current: false },
//   { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
//   // { name: 'Help Center', href: '#', icon: QuestionMarkCircleIcon, current: false },
//   { name: 'Help Center', href: '#', icon: NewspaperIcon, current: false },
// ];


const navigation = [
  { name: 'Overview', href: '#', icon: HomeIcon, current: true },
  // Placeholder for Products
  { name: 'Input Order', href: '#', icon: ShoppingCartIcon, current: false },
  { name: 'Create Customers', href: '#', icon: UserCircleIcon, current: false },
  { name: 'Products', href: '#', icon: ClipboardDocumentCheckIcon, current: false },
  { name: 'Invoice', href: '#', icon: NewspaperIcon, current: false },
  { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
  { name: 'Help Center', href: '#', icon: NewspaperIcon, current: false },
];

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState('Overview')
  const [enabled, setEnabled] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // const [productsOpen, setProductsOpen] = useState(false);

  const [productsOpen, setProductsOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);



  const navigate = useNavigate() // Use the useNavigate hook for navigation

  const handleLogout = () => {
    logout() // Clear user data and authentication status
    localStorage.removeItem('authToken')
    sessionStorage.clear()
    setOpen(false)
    navigate('/') // Redirect to login page
  }

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false); // Close the dropdown when an item is selected
  };

  const renderContent = () => {
    const isPaid = user && user.paid_status === "1" // Check if the user has paid status of "1"

    if (!isPaid) {
      // If not paid, return Pricing for all selected items
      return <Pricing />
    }

    // If paid, display content based on selectedItem
    switch (selectedItem) {
      case 'Overview':
        return <OverView />
      case 'Products':
        return <Stock />
      case 'Help Center':
        return <Help />
        // return <Reports />
      case 'Input Order':
        return <InputOrder />
      case 'Create Customers':
        return <Customer />
      case 'Stock Products':
        return <Stock />
        case 'Returned Products':
          return <Returned />
      case 'Invoice':
        return <Invoice />
      case 'Inventory':
        return <Inventory />
      case 'Settings':
        setSelectedItem('General Settings')
      case 'General Settings':
        return <Settings />
      case 'Users':
        return <User />
      default:
        return <Pricing />
    }
  }

  const handleProductClick = () => {
    setProductsOpen(prev => !prev)
    setSettingsOpen(false) // Close Settings submenu
    setSelectedItem('Products')
  }

  const handleSettingsClick = () => {
    setSettingsOpen(prev => !prev)
    setProductsOpen(false) // Close Products submenu
    setSelectedItem('Settings')
  }

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
                                                                {/* <li>
                                                                    <a
                                                                        href="#"
                                                                        onClick={() => setSelectedItem('Users')}
                                                                        className="block p-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded"
                                                                    >
                                                                        Users
                                                                    </a>
                                                                </li> */}

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

            <nav className="flex flex-col h-full">
  {navigation.map((item, index) => {
    // If the item is 'Products', render the dropdown instead
    if (item.name === 'Products') {
      return (
        <div key={item.name}>
          {/* Custom Products Dropdown */}
          {productsOpen && !isDisabled && (
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between w-full p-2 rounded ${
                  selectedItem === 'Products'
                    ? 'bg-[#fff] text-[#0E90DA] py-2 border-l-4 border-l-[#0E90DA]' // Active state
                    : 'text-indigo-200 hover:bg-[#F5F6F8] hover:text-[#0E90DA] hover:py-2' // Default state
                }`}
              >
                <div className="flex items-center space-x-2">
                  <ClipboardDocumentCheckIcon className="w-6 h-6 text-[#0E90DA]" />
                  <span>Products</span>
                </div>
                <ChevronDownIcon
                  className={`w-6 h-6 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                />
              </button>

              {isOpen && (
                <ul className="pl-4 mt-2 space-y-2">
                  <li>
                    <a
                      href="#"
                      onClick={() => handleItemClick('Stock Products')}
                      className={`flex items-center text-sm ${
                        selectedItem === 'Stock Products' ? 'text-[#0E90DA] font-bold' : 'text-gray-500'
                      }`}
                    >
                      <span className={`mr-2 ${selectedItem === 'Stock Products' ? 'w-2 h-2 bg-[#0E90DA] rounded-full' : 'w-2 h-2 bg-gray-300 rounded-full'}`}></span>
                      Stock Products
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={() => handleItemClick('Returned Products')}
                      className={`flex items-center text-sm ${
                        selectedItem === 'Returned Products' ? 'text-[#0E90DA] font-bold' : 'text-gray-500'
                      }`}
                    >
                      <span className={`mr-2 ${selectedItem === 'Returned Products' ? 'w-2 h-2 bg-[#0E90DA] rounded-full' : 'w-2 h-2 bg-gray-300 rounded-full'}`}></span>
                      Returned Products
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={() => handleItemClick('Inventory')}
                      className={`flex items-center text-sm ${
                        selectedItem === 'Inventory' ? 'text-[#0E90DA] font-bold' : 'text-gray-500'
                      }`}
                    >
                      <span className={`mr-2 ${selectedItem === 'Inventory' ? 'w-2 h-2 bg-[#0E90DA] rounded-full' : 'w-2 h-2 bg-gray-300 rounded-full'}`}></span>
                      Inventory
                    </a>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <a
        key={item.name}
        href={item.href}
        onClick={() => handleItemClick(item.name)}
        className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
          item.name === selectedItem
            ? 'bg-[#fff] text-[#0E90DA] py-2 border-l-4 border-l-[#0E90DA]'
            : isDisabled
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-indigo-200 hover:bg-[#F5F6F8] hover:text-[#0E90DA] hover:py-2 '
        }`}
      >
        <item.icon
          aria-hidden="true"
          className={`h-6 w-6 shrink-0 ${
            item.name === selectedItem
              ? 'text-[#0E90DA]'
              : isDisabled
              ? 'text-gray-400'
              : 'text-indigo-200 group-hover:text-white'
          }`}
        />
        {item.name}
      </a>
    );
  })}



  {/* Log Out Button */}
  <div className="">
  <div className="flex items-center space-x-4 mt-[28rem]">
  {/* Label should be inside a proper form-related parent */}
  <Field name="darkMode" disabled>
    {({ checked, handleChange }) => (
      <div className="flex items-center space-x-4">
        {/* Label for the Dark Mode text */}
        <Label className="text-indigo-200">Dark Mode</Label>

        {/* Switch */}
        <Switch
          checked={enabled}
          onChange={setEnabled}
          disabled
          className={`${
            enabled ? 'bg-[#0E90DA]' : 'bg-gray-300'
          } relative inline-flex h-6 w-12 items-center rounded-full`}
        >
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
    )}
  </Field>
</div>
  </div>
  <button
    onClick={() => setOpen(true)}
    className=" flex items-center justify-between w-full p-2 rounded text-indigo-200 hover:bg-[#F5F6F8] hover:text-[#0E90DA]"
  >
    <span className="flex items-center space-x-2">
      <span>Log Out</span>
    </span>
  </button>
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
          <div className="sticky top-0 z-40 flex h-20 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Separator */}
            <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-between">
                <h2 className="relative flex leading-[24.05px] top-4 text-[20px]">{selectedItem}</h2>
                 {/* {isAuthenticated ? (
              <p>Welcome, {user.email}!</p>
            ) : (
              <p>Please log in.</p>
            )} */}
                <div className="flex space-x-2 my-4">
                {isAuthenticated ? (
                    <div className="flex items-center border-2 rounded-lg p-4">
                     <h2 className="relative leading-[24.05px] text-[20px] text-[#757575]">{user.email}</h2>
                      <img src={refresh} alt="Notification Bell" className="ml-2" />
                      
                    </div>
                     ) : (
                      <p>Please log in.</p>
                    )}
                    <div className="flex items-center border-2 rounded-lg p-4">
                      <img src={bell} alt="Notification Bell" className="mr-2" />
                      <h2 className="relative leading-[24.05px] text-[20px]">Notification</h2>
                    </div>
                  </div>
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
