import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import History from './History';

export default function Example() {
  const [formData, setFormData] = useState({
    drug_name: '',
    price: '',
    quantity: '',
    total: '',
    order_no: ''
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    // Fetch drug names from the PHP script
    const fetchDrugs = async () => {
      try {
        const response = await fetch('https://raotory.com.ng/fetch-drugs.php');
        const data = await response.json();
        setDrugs(data);
      } catch (error) {
        console.error('Error fetching drugs:', error);
      }
    };

    fetchDrugs();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://raotory.com.ng/submit-order.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        alert('Order saved successfully!');
      } else {
        alert('Failed to save order.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the order.');
    }
  };

  const generateOrderNumber = () => {
    const randomNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return randomNumber;
  };

  const handleClick = () => {
    setFormData(prevState => ({
      ...prevState,
      order_no: generateOrderNumber()
    }));
    setIsFormVisible(true);
  };

  return (
    <>
      <main className="lg:min-h-full lg:flex-row-reverse lg:overflow-hidden">
        <h1 className="sr-only">Checkout</h1>

        <section
          aria-labelledby="payment-heading"
          className="flex-auto overflow-y-auto px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0"
        >
          <div className="max-w-3xl mx-auto">
            <button
              type="button"
              onClick={handleClick}
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#008C38] py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Place order
            </button>

            {isFormVisible && (
              <div className='border border-gray-900/10 px-10 rounded-md mt-8'>
                <form onSubmit={handleSubmit}>
                  <div className="mt-10">
                    <select
                      id="drug_name"
                      name="drug_name"
                      value={formData.drug_name}
                      onChange={handleChange}
                      autoComplete="drug-name"
                      className="block w-full rounded-md py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-7"
                    >
                      <option className="text-gray-500">Select drugs</option>
                      {drugs.map((drug, index) => (
                        <option key={index} className="text-gray-900">{drug}</option>
                      ))}
                    </select>
                  </div>

                  <div className="px-0 py-9">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <div className="mt-2">
                          <input
                            id="price"
                            name="price"
                            type="text"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Price"
                            className="block w-full rounded-md border-0 pl-4 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <div className="mt-2">
                          <input
                            id="quantity"
                            name="quantity"
                            type="text"
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder="Quantity"
                            className="block w-full rounded-md border-0 pl-4 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <div className="mt-2">
                          <input
                            id="total"
                            name="total"
                            type="text"
                            value={formData.total}
                            onChange={handleChange}
                            placeholder='Total amount'
                            className="block w-full rounded-md border-0 pl-4 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6 flex justify-between">
                        <p className="text-[14px] font-normal">Order No: {formData.order_no}</p>
                        <button
                          type="submit"
                          className="rounded-md bg-[#008C38] px-10 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>

        <History />
      </main>
    </>
  );
}
