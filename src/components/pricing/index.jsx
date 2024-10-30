import { useState } from 'react';
import { Radio, RadioGroup } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import Payment from '../payment/index'; // Assuming you might need this component in the future
import SingleStore from '../stores/singleStore';
import MultiStore from '../stores/multiStore';

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'annually', label: 'Annual (save 20%)', priceSuffix: '/year' },
];

const tiers = [
  {
    name: 'Single store',
    id: 'SingleStore',
    price: { monthly: 'NGN 5,000', annually: 'NGN 60,000' },
    description: 'Select this option if your business has just one location',
    features: ['One store', 'Unlimited orders daily', 'Can add team'],
    mostPopular: false,
  },
  {
    name: 'Multi stores',
    id: 'MultiStore',
    price: { monthly: 'NGN 15,000', annually: 'NGN 180,000' },
    description: 'Select this option if your business has different locations',
    features: ['Up to 5 stores', 'Unlimited orders daily', 'Can add team'],
    mostPopular: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [frequency, setFrequency] = useState(frequencies[1]); // Default to annually
  const [selectedTier, setSelectedTier] = useState(tiers[0]); // Default to SingleStore
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(''); // State for selected price

  const handleButtonClick = (tier) => {
    setSelectedComponent(tier.id); // Set the component based on the tier's id
    setSelectedPrice(tier.price[frequency.value]); // Set the selected price based on frequency
  };

  return (
    <div className="bg-white py-4 sm:py-4">
      {/* Conditionally render components based on selectedComponent */}
      {selectedComponent === 'SingleStore' && <SingleStore price={selectedPrice} />}
      {selectedComponent === 'MultiStore' && <MultiStore price={selectedPrice} />}
      {!selectedComponent && (
        <div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mt-2 text-[24px] tracking-tight text-gray-900 sm:text-[24px]">
                Create your store here.
              </p>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
              This gives you the ability to set up your store and inventory appropriately.
            </p>
            <div className="mt-10 flex justify-center">
              <fieldset aria-label="Payment frequency">
                <RadioGroup
                  value={frequency}
                  onChange={setFrequency}
                  className="grid grid-cols-2 gap-x-4 rounded-full p-3 text-center text-base bg-[#E5E5E5] font-semibold leading-7 ring-1 ring-inset ring-gray-200"
                >
                  {frequencies.map((option) => (
                    <Radio
                      key={option.value}
                      value={option}
                      className="cursor-pointer rounded-full px-5 py-2 text-gray-500 data-[checked]:bg-[#0E90DA] data-[checked]:text-white"
                    >
                      {option.label}
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>
            </div>
            <div className="isolate mx-auto mt-5 grid max-w-md grid-cols-1 gap-9 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:ml-60">
              {tiers.map((tier, index) => (
                <div
                  key={tier.id}
                  className={classNames(
                    tier.mostPopular ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-200',
                    'rounded-3xl p-8 xl:p-10 min-h-[600px] flex flex-col justify-between',
                    index === 1
                      ? 'bg-gradient-to-b from-[#8FD7FF] via-[rgba(126,184,217,0.398242)] to-[rgba(7,77,116,0.05)]'
                      : ''
                  )}
                >
                  <div className="flex items-center justify-between gap-x-4">
                    <h3
                      id={tier.id}
                      className={classNames(
                        tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                        'text-lg font-semibold leading-8',
                      )}
                    >
                      {tier.name}
                    </h3>
                    {tier.mostPopular ? (
                      <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                        Most popular
                      </p>
                    ) : null}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                  <p className="-mt-3 flex items-baseline gap-x-1 -mb-20">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                      {tier.price[frequency.value]} {/* Display price based on selected frequency */}
                    </span>
                    <span className="text-sm font-semibold leading-6 text-gray-600">
                      {frequency.priceSuffix}
                    </span>
                  </p>
                  <ul role="list" className="mt-2 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-indigo-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <button
                      onClick={() => handleButtonClick(tier)}
                      className="bg-[#0E90DA] flex w-full justify-center rounded-md px-10 py-4 text-sm font-semibold leading-6 text-white"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
              Contact <a href="#" className="text-[#0E90DA]">Sales</a> to create a store.
            </p>
            <p className="mx-auto -mt-2 max-w-2xl text-center text-lg leading-8 text-gray-600">
              Greater than 5
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
