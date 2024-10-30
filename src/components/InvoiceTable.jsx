import React from "react";

const InvoiceTable = () => {
  const invoices = [
    { id: "#WUAS859", customer: "Jeremiah Omonefe", date: "5/09/2024", amount: "NGN 30,000", status: "Delivered" },
    { id: "#WUAS860", customer: "John Doe", date: "5/09/2024", amount: "NGN 20,000", status: "In progress" },
    { id: "#WUAS861", customer: "Jane Smith", date: "5/09/2024", amount: "NGN 15,000", status: "Delivered" },
    { id: "#WUAS862", customer: "Bob Johnson", date: "5/09/2024", amount: "NGN 40,000", status: "Returned" },
    { id: "#WUAS863", customer: "Alice Brown", date: "5/09/2024", amount: "NGN 25,000", status: "Returned" },
    { id: "#WUAS863", customer: "Alice Brown", date: "5/09/2024", amount: "NGN 25,000", status: "Returned" },
    { id: "#WUAS863", customer: "Alice Brown", date: "5/09/2024", amount: "NGN 25,000", status: "Returned" },
    { id: "#WUAS863", customer: "Alice Brown", date: "5/09/2024", amount: "NGN 25,000", status: "Returned" },
    { id: "#WUAS863", customer: "Alice Brown", date: "5/09/2024", amount: "NGN 25,000", status: "Returned" },
    { id: "#WUAS863", customer: "Alice Brown", date: "5/09/2024", amount: "NGN 25,000", status: "Returned" },
    { id: "#WUAS863", customer: "Alice Brown", date: "5/09/2024", amount: "NGN 25,000", status: "Returned" },
    { id: "#WUAS863", customer: "Alice Brown", date: "5/09/2024", amount: "NGN 25,000", status: "Returned" },
    { id: "#WUAS863", customer: "Alice Brown", date: "5/09/2024", amount: "NGN 25,000", status: "Returned" },
    { id: "#WUAS863", customer: "Alice Brown", date: "5/09/2024", amount: "NGN 25,000", status: "Returned" },
    { id: "#WUAS863", customer: "Alice Brown", date: "5/09/2024", amount: "NGN 25,000", status: "Returned" },
  ];

  const stockAlert = [
    { product: "Sardine", quantity: 300 },
    { product: "Fish", quantity: 250 },
    { product: "Sardine", quantity: 300 },
    { product: "Fish", quantity: 250 },
    { product: "Sardine", quantity: 300 },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "In progress":
        return "bg-gray-100 text-gray-700";
      case "Returned":
        return "bg-red-100 text-red-700";
      default:
        return "";
    }
  };

  return (
    <div className="p-6">
      <div className="flex gap-10">
        {/* Recent Invoices */}
        <div className="w-1/2 min-h-[800px] divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow"> {/* Increase height here */}
          <h2 className="text-lg font-semibold mb-4 py-2 px-2">Recent Invoices</h2>
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr className="bg-gray-100">
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6">Invoice ID</th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">Customer</th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">Sales date</th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">Paid amount</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-xs">Sales status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={index} className="text-center">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{invoice.id}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{invoice.customer}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{invoice.date}</td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">{invoice.amount}</td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <span className={`px-2 py-1 rounded ${getStatusStyle(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stock Alert */}
        <div className="p-4 w-1/2 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
          <h2 className="text-lg font-semibold mb-4">Stock Alert</h2>
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                <th className="border border-gray-200 px-4 py-2">Product</th>
                <th className="border border-gray-200 px-4 py-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {stockAlert.map((stock, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-200 px-4 py-2">{stock.product}</td>
                  <td className="border border-gray-200 px-4 py-2">{stock.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
