'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../assets/Frame.svg';
import backgroundImage from '../assets/bg.svg';
import backgroundImage2 from '../assets/laptop.png';
import LogoCloud from '../landingPage/logoCloud'
import Features from '../landingPage/features'

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Pricing', href: '#' },
  { name: 'About us', href: '#' },
  { name: 'Contact us', href: '#' },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Home'); // State for active link

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src={logo}
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveLink(item.name)} // Update active link on click
                className={`text-sm font-semibold leading-6 ${activeLink === item.name ? 'text-[#0E90DA]' : 'text-gray-900'}`} // Set active class
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
            <a href="#" className="text-sm bg-[#0E90DA] py-1.5 px-4 rounded-full font-semibold leading-6 text-white">
              Get Started <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src={logo}
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setActiveLink(item.name)} // Update active link on click
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${activeLink === item.name ? 'text-[#0E90DA]' : 'text-gray-900'} hover:bg-gray-50`} // Set active class
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block  bg-[#0E90DA] rounded-lg px-3 py-2.5 text-center text-base font-semibold leading-7 text-white hover:bg-gray-50"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate pt-14">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-5xl text-center">
              <h1 className="text-balance text-3xl font-bold tracking-tight text-[#757575] sm:text-6xl">
              Manage Inventory Like a Pro: <span className='text-[#000000]'>From Stock to Sales</span>, All in One Place
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-600 italic font-thin">
                    Make data-driven decisions with powerful analytics and minimize losses with precise <br/>inventory control
                  </p>

              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-full bg-[#0E90DA] px-7  py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>
                <a
                  href="#"
                  className="rounded-full bg-[#E5E5E5] px-7  py-2.5 text-sm font-semibold text-[#757575] shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  learn more
                </a>
              </div>
            </div>
            <div className="mt-16 flow-root sm:mt-24 relative">
                      <img
            src={backgroundImage} // Replace with the path to your larger image
            alt="Large Background"
            className="absolute -top-[89px] left-80 w-[200%] h-[180%] object-contain z-0" // Use object-contain
            style={{ transform: 'translate(40px, 0)' }} // Move a little bit to the right
          />
            <img
              src={backgroundImage2} // Replace with the path to your smaller image
              alt="Smaller Foreground"
              className="relative w-[80%] h-auto z-10 mx-auto block mt-10" // Center the image and adjust width
              // style={{ marginTop: '30px' }} // Optional: Add margin for spacing
            />
          </div>


          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+30rem)] sm:w-[72.1875rem]"
          />
        </div>
        
      </div>
      <LogoCloud/>
      <Features/>
    </div>
  )
}
