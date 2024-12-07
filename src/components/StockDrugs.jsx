import { useState } from 'react';

export default function Example() {
  const [formData, setFormData] = useState({
    drug_name: '',
    purchase_price: '',
    manufacture_date: '',
    expiration_date: '',
    quantity_in_stock: '',
    retail_price: '',
    wholesale_price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://raotory.com/drugs_inventory.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      const result = await response.text(); // Adjust this based on your PHP script's response

      if (response.ok) {
        alert('Drug added to inventory successfully!');
      } else {
        alert('Failed to add drug to inventory. Please try again.');
      }

      console.log('Response:', result);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };

  return (
    <main className="flex items-center justify-center bg-white">
      <section
        aria-labelledby="payment-heading"
        className="w-full max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:px-8 lg:pb-24 lg:pt-16 bg-white rounded-lg"
      >
        <div className="mx-auto">
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="grid grid-cols-12 gap-x-4 gap-y-6">
              <div className="col-span-full">
                <div className="mt-1">
                  <input
                    id="drug_name"
                    name="drug_name"
                    type="text"
                    value={formData.drug_name}
                    onChange={handleChange}
                    placeholder='Name of drug'
                    className="block w-full py-3 px-4 rounded-md border border-gray-300 shadow-sm focus:border-[#E5FFF0] focus:ring-[#E5FFF0] focus:outline-none sm:text-sm"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <div className="mt-1">
                  <input
                    id="purchase_price"
                    name="purchase_price"
                    type="text"
                    value={formData.purchase_price}
                    onChange={handleChange}
                    placeholder='Drug purchase price'
                    className="block w-full py-3 px-4 rounded-md border border-gray-300 shadow-sm focus:border-[#E5FFF0] focus:ring-[#E5FFF0] focus:outline-none sm:text-sm"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <div className="mt-1">
                  <input
                    id="manufacture_date"
                    name="manufacture_date"
                    type="text"
                    value={formData.manufacture_date}
                    onChange={handleChange}
                    placeholder='Manufacture date (YY/MM/DD)s'
                    className="block w-full py-3 px-4 rounded-md border border-gray-400 shadow-sm focus:border-[#E5FFF0] focus:ring-[#E5FFF0] focus:outline-none sm:text-sm"
                  />
                </div>
              </div>

              <div className="col-span-8 sm:col-span-9">
                <div className="mt-1">
                  <input
                    id="expiration_date"
                    name="expiration_date"
                    type="text"
                    value={formData.expiration_date}
                    onChange={handleChange}
                    placeholder='Expiration date (YY/MM/DD)'
                    className="block w-full py-3 px-4 rounded-md border border-gray-300 shadow-sm focus:border-[#E5FFF0] focus:ring-[#E5FFF0] focus:outline-none sm:text-sm"
                  />
                </div>
              </div>

              <div className="col-span-4 sm:col-span-3">
                <div className="mt-1">
                  <input
                    id="quantity_in_stock"
                    name="quantity_in_stock"
                    type="text"
                    value={formData.quantity_in_stock}
                    onChange={handleChange}
                    placeholder='Quantity in stock'
                    className="block w-full py-3 px-4 rounded-md border border-gray-300 shadow-sm focus:border-[#E5FFF0] focus:ring-[#E5FFF0] focus:outline-none sm:text-sm"
                  />
                </div>
              </div>

              <div className="col-span-6">
                <div className="mt-1">
                  <input
                    id="retail_price"
                    name="retail_price"
                    type="text"
                    value={formData.retail_price}
                    onChange={handleChange}
                    placeholder='Input retail price'
                    className="block w-full py-3 px-4 rounded-md border border-gray-300 shadow-sm focus:border-[#E5FFF0] focus:ring-[#E5FFF0] focus:outline-none sm:text-sm"
                  />
                </div>
              </div>

              <div className="col-span-6">
                <div className="mt-1">
                  <input
                    id="wholesale_price"
                    name="wholesale_price"
                    type="text"
                    value={formData.wholesale_price}
                    onChange={handleChange}
                    placeholder='Input wholesale price'
                    className="block w-full py-3 px-4 rounded-md border border-gray-300 shadow-sm focus:border-[#E5FFF0] focus:ring-[#E5FFF0] focus:outline-none sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-md border border-transparent bg-[#008C38] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#E5FFF0] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#E5FFF0] focus:ring-offset-2"
            >
              Add drug to inventory
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
