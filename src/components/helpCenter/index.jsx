'use client'
import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Field, Label, Switch } from '@headlessui/react'

export default function Example() {
  const [agreed, setAgreed] = useState(false)
  const [message, setMessage] = useState('') // State for the message

  const handleSubmit = (e) => {
    e.preventDefault() // Prevent default form submission
    if (agreed && message.trim() !== '') {
      // Construct the WhatsApp URL
      const phoneNumber = '+2347066261059';
      const encodedMessage = encodeURIComponent(message); // Encode the message
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      // Open the WhatsApp URL
      window.open(whatsappUrl, '_blank'); // Opens in a new tab
    } else {
      alert('Please agree to the policies and enter a message.'); // Basic validation
    }
  }

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center -mt-12">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl">Help Center</h2>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                value={message} // Bind the message state
                onChange={(e) => setMessage(e.target.value)} // Update state on change
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="bg-[#0E90DA] flex w-full justify-center rounded-md px-10 py-4 text-sm font-semibold leading-6 text-white"
          >
            Let's talk
          </button>
        </div>
      </form>
    </div>
  )
}
