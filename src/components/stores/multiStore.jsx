import { useState } from "react";
import { CheckIcon } from '@heroicons/react/20/solid';
import success from '../../assets/success2.svg';
// import Pricing from './Pricing';
import Tables from '../Tables';

// Step data
const initialSteps = [
  { name: 'Step 1', status: 'current' },
  { name: 'Step 2', status: 'upcoming' },
  { name: 'Step 3', status: 'upcoming' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Final step component
function NewComponent() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-9 lg:px-8 pb-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg p-2 rounded-xl flex flex-col h-[200px] justify-between">
        <div className="mx-4">
          <div className="-mt-2">
            <img
              src={success}
              alt="Store"
              className="block w-full h-full rounded-lg object-contain"
            />
          </div>
          <p className="-mt-3 text-3xl text-center leading-6 text-black">
            Yay!
          </p>
          <p className="mt-2 text-sm text-center leading-6 text-gray-600">
            Congratulations, you have successfully set up your store on Raotory, <span className="text-[#0E90DA]">Your stock keeping buddy!</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Example() {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState(initialSteps);
  const [isFlowComplete, setIsFlowComplete] = useState(false);

  const isButtonActive = selectedNumber !== null;

  const handleContinue = () => {
    if (isButtonActive || currentStep > 1) {
      const nextStep = currentStep + 1;

      if (nextStep <= 3) {
        setCurrentStep(nextStep);

        setSteps(prevSteps =>
          prevSteps.map((step, index) => {
            if (index < nextStep - 1) {
              return { ...step, status: 'complete' };
            } else if (index === nextStep - 1) {
              return { ...step, status: 'current' };
            } else {
              return { ...step, status: 'upcoming' };
            }
          })
        );
      }

      if (nextStep === 3) {
        setSteps(prevSteps =>
          prevSteps.map(step => ({
            ...step,
            status: 'complete',
          }))
        );
      }
    }

    if (currentStep === 3) {
      setIsFlowComplete(true);
    }
  };

  return (
    <>
      {isFlowComplete ? ( // Render Tables after flow completion
        <Tables />
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-10 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-10">
            <p className="mt-2 text-2xl font-regular tracking-tight text-gray-900 sm:text-4xl">
              Multi stores
            </p>
            <p className="mt-3 text-md text-center leading-8 text-gray-600">
              This gives you the ability to set up your store and inventory
            </p>
            <p className="-mt-3 text-md text-center leading-8 text-gray-600">
              appropriately
            </p>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-lg border border-gray-300 p-6 rounded-xl flex flex-col h-[610px] justify-between">
            <form className="space-y-6 mt-6 flex flex-col justify-between h-full">
              <div className="mx-4">
                <nav aria-label="Progress">
                  <ol role="list" className="flex items-center justify-center">
                    {steps.map((step, stepIdx) => (
                      <li
                        key={step.name}
                        className={classNames(
                          stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '',
                          'relative'
                        )}
                      >
                        {step.status === 'complete' ? (
                          <>
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 flex items-center"
                            >
                              <div className="h-0.5 w-full bg-[#0E90DA]" />
                            </div>
                            <a className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#0E90DA]">
                              <CheckIcon className="h-5 w-5 text-white" />
                              <span className="sr-only">{step.name}</span>
                            </a>
                          </>
                        ) : step.status === 'current' ? (
                          <>
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 flex items-center"
                            >
                              <div className="h-0.5 w-full bg-gray-200" />
                            </div>
                            <a className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0E90DA] bg-white">
                              <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                              <span className="sr-only">{step.name}</span>
                            </a>
                          </>
                        ) : (
                          <>
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 flex items-center"
                            >
                              <div className="h-0.5 w-full bg-gray-200" />
                            </div>
                            <a className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
                              <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                              <span className="sr-only">{step.name}</span>
                            </a>
                          </>
                        )}
                      </li>
                    ))}
                  </ol>
                </nav>

                {currentStep === 3 ? (
                  <NewComponent />
                ) : (
                  <>
                    {currentStep === 1 && (
                      <div className="mt-5">
                        <label className="block text-sm font-medium text-gray-700">
                          Number of stores
                        </label>
                        <div className="grid grid-cols-5 gap-2 mt-2">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <div
                              key={num}
                              className={`cursor-pointer p-4 border rounded-lg text-center ${
                                selectedNumber === num
                                  ? 'bg-[#0E90DA] text-white'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                              onClick={() => setSelectedNumber(num)}
                            >
                              {num}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="mt-10">
                        <input
                          type="text"
                          placeholder="Store Name"
                          className="block w-full rounded-md border-0 py-4 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0E90DA]"
                        />
                        <input
                          type="text"
                          placeholder="Store Location"
                          className="block w-full rounded-md border-0 py-4 pl-4 mt-4 text-gray-900 ring-1 ring-inset ring-gray-300"
                        />
                        <input
                          type="text"
                          placeholder="Phone number"
                          className="block w-full rounded-md border-0 py-4 pl-4 mt-4 text-gray-900 ring-1 ring-inset ring-gray-300"
                        />
                        <div className="flex items-center mt-10">
                          <input
                            id="agree"
                            name="agree"
                            type="checkbox"
                            className="h-4 w-4"
                          />
                          <label
                            htmlFor="agree"
                            className="ml-3 text-sm text-gray-900"
                          >
                            Agree to terms and conditions
                          </label>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="mt-6 mx-4">
                <button
                  type="button"
                  className="w-full flex justify-center rounded-md border border-transparent bg-[#0E90DA] py-3 px-8 text-sm font-medium text-white hover:bg-[#0073b1] focus:outline-none focus:ring-2 focus:ring-[#0E90DA] focus:ring-offset-2 disabled:opacity-50"
                  onClick={handleContinue}
                  disabled={!isButtonActive && currentStep === 1}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
