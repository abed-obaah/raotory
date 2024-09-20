import { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

export default function Example() {
  const [orders, setOrders] = useState([]);
  const [orderTotals, setOrderTotals] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://raotory.com.ng/fetch_orders.php');
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
          setOrderTotals(data.order_totals);
        } else {
          console.error('Failed to fetch orders:', data.message);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24 -mt-20">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h2 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">Latest Orders</h2>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="sr-only">Recent orders</h2>
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              {orders.map((order) => (
                <div
                  key={order.id} // Use a unique identifier from the order
                  className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                >
                  <h3 className="sr-only">
                    Order placed on <time dateTime={order.created_at}>{order.created_at}</time>
                  </h3>

                  <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                    <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                      <div>
                        <dt className="font-medium text-gray-900">Order number</dt>
                        <dd className="mt-1 text-gray-500">{order.order_no}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Total</dt>
                        <dd className="mt-1 text-gray-500">
                          NGN {orderTotals[order.order_no] || 'N/A'}
                        </dd>
                      </div>
                    </dl>

                    <Menu as="div" className="relative flex justify-end lg:hidden">
                      <div className="flex items-center">
                        <MenuButton className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Options for order {order.order_no}</span>
                          <EllipsisVerticalIcon aria-hidden="true" className="h-6 w-6" />
                        </MenuButton>
                      </div>

                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <div className="py-1">
                          <MenuItem>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              View
                            </a>
                          </MenuItem>
                          <MenuItem>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              Invoice
                            </a>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>

                    <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                      <p
                        className="flex items-center justify-center rounded-md bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span>NGN {orderTotals[order.order_no] || 'N/A'}</span>
                        <span className="sr-only">NGN {orderTotals[order.order_no] || 'N/A'}</span>
                      </p>
                    </div>
                  </div>

                  {/* Products */}
                  <h4 className="sr-only">Items</h4>
                  {/* Products are not included in the response from the PHP script yet. Update accordingly. */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
