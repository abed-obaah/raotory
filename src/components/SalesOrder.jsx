import { useState, useEffect } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import History from './History';

export default function Example() {
  const [orderItems, setOrderItems] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [drugs, setDrugs] = useState([]);
  const [orderNo, setOrderNo] = useState('');

  useEffect(() => {
    // Fetch drug names and retail prices from the PHP script
    const fetchDrugs = async () => {
      try {
        const response = await fetch('https://raotory.com/fetch-drugs.php');
        const data = await response.json();
        setDrugs(data);
      } catch (error) {
        console.error('Error fetching drugs:', error);
      }
    };

    fetchDrugs();
  }, []);

  const handleDrugChange = (index, event) => {
    const { name, value } = event.target;
    const updatedOrderItems = [...orderItems];
    updatedOrderItems[index][name] = value;

    if (name === 'drug_name') {
      const selectedDrug = drugs.find(drug => drug.drug_name === value);
      if (selectedDrug) {
        updatedOrderItems[index].price = selectedDrug.retail_price;
      }
    }

    if (name === 'quantity') {
      const selectedPrice = updatedOrderItems[index].price || 0;
      updatedOrderItems[index].total = (selectedPrice * value).toFixed(2);
    }

    setOrderItems(updatedOrderItems);
  };

  const addDrugToOrder = () => {
    setOrderItems([...orderItems, { drug_name: '', price: '', quantity: '', total: '' }]);
  };

  const removeDrugFromOrder = (index) => {
    const updatedOrderItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedOrderItems);
  };

  const calculateTotalAmount = () => {
    return orderItems.reduce((total, item) => total + parseFloat(item.total || 0), 0).toFixed(2);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://raotory.com/submit-order.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_no: orderNo, items: orderItems }),
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
    setOrderNo(generateOrderNumber());
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
              <div className="border border-gray-900/10 px-10 rounded-md mt-8">
                <form onSubmit={handleSubmit}>
                  <div className="mt-10">
                    {orderItems.map((item, index) => (
                      <div key={index} className="border-b border-gray-300 py-4 flex items-center">
                        <select
                          id={`drug_name_${index}`}
                          name="drug_name"
                          value={item.drug_name}
                          onChange={(e) => handleDrugChange(index, e)}
                          autoComplete="drug-name"
                          className="block w-full rounded-md py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-7"
                        >
                          <option className="text-gray-500">Select drugs</option>
                          {drugs.map((drug, i) => (
                            <option key={i} value={drug.drug_name} className="text-gray-900">
                              {drug.drug_name}
                            </option>
                          ))}
                        </select>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-6 mt-4">
                          <div className="sm:col-span-3">
                            <input
                              id={`price_${index}`}
                              name="price"
                              type="text"
                              value={item.price}
                              onChange={(e) => handleDrugChange(index, e)}
                              placeholder="Price"
                              className="block w-full rounded-md border-0 pl-4 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              readOnly
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <input
                              id={`quantity_${index}`}
                              name="quantity"
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleDrugChange(index, e)}
                              placeholder="Quantity"
                              className="block w-full rounded-md border-0 pl-4 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>

                          <div className="sm:col-span-6">
                            <input
                              id={`total_${index}`}
                              name="total"
                              type="text"
                              value={item.total}
                              onChange={(e) => handleDrugChange(index, e)}
                              placeholder="Total"
                              className="block w-full rounded-md border-0 pl-4 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              readOnly
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeDrugFromOrder(index)}
                          className="ml-4 text-red-500 hover:text-red-700"
                        >
                          <XMarkIcon className="h-5 w-5" />
                          Remove
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addDrugToOrder}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      + Add Another Drug
                    </button>
                  </div>

                  <div className="mt-6">
                    <p className="text-lg font-semibold">Total Amount: ${calculateTotalAmount()}</p>
                  </div>

                  <div className="sm:col-span-6 flex justify-between mt-8">
                    <p className="text-[14px] font-normal">Order No: {orderNo}</p>
                    <button
                      type="submit"
                      className="rounded-md bg-[#008C38] px-10 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Save
                    </button>
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
