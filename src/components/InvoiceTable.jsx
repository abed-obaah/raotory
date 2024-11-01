import React, { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext'; 

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [todaySales, setTodaySales] = useState("NGN 0");
  const [totalProductsSold, setTotalProductsSold] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [stockAlert, setStockAlert] = useState([]); // State to store stock alert data from API
  const { user } = useAuth(); // Get user from AuthContext
  const userEmail = user?.email;

  // Format date in YYYY-MM-DD format
  const formatDate = (date) => {
    return date.toISOString().split('T')[0]; // Returns only the date part
  };

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch(`https://raotory.com.ng/apis/get_sales_count.php?email=${encodeURIComponent(userEmail)}`);
        const data = await response.json();

        console.log(data); // Log the entire response data for debugging

        if (data.success) {
          const today = formatDate(new Date());

          // Filter sales made today using `sold_date`
          const todaySalesData = data.sales.filter(sale => {
            const saleDate = formatDate(new Date(sale.sold_date));
            return saleDate === today;
          });

          // Sum today's sales
          const totalTodaySales = todaySalesData.reduce((total, sale) => total + parseFloat(sale.sell_price), 0);
          setTodaySales(`NGN ${totalTodaySales.toFixed(2)}`); // Update today’s sales formatted as currency

          setTotalProductsSold(data.sales.length); // Update total number of sales

          // Update invoices from API data
          const formattedInvoices = data.sales.map((sale) => ({
            id: sale.sale_product_id,
            customer: sale.product_name,
            date: sale.sold_date,
            amount: `NGN ${parseFloat(sale.sell_price).toFixed(2)}`,
            status: "Delivered", // Assuming all sales are delivered, adjust as needed
          }));
          setInvoices(formattedInvoices); // Update invoices state
        } else {
          console.error('Failed to fetch sales data:', data.error);
        }
      } catch (err) {
        console.error('Error fetching sales data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch the latest stock alerts
    const fetchStockAlert = async () => {
      try {
        const response = await fetch("https://raotory.com.ng/apis/get_latest_drugs.php");
        const data = await response.json();

        // Assuming the response is an array of drugs with `product_name` and `quantity`
        setStockAlert(data); // Update stockAlert state with the fetched data
      } catch (err) {
        console.error('Error fetching stock alerts:', err);
      }
    };

    if (userEmail) {
      fetchSalesData(); // Call the function to fetch sales data if userEmail is available
    }
    
    fetchStockAlert(); // Call the function to fetch stock alert data
  }, [userEmail]);

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

  if (isLoading) {
    return <div>Loading...</div>; // Display loading state
  }

  return (
    <div className="p-6">
      <div className="flex gap-10">
        {/* Recent Invoices */}
        <div className="w-1/2 min-h-[800px] divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
          <h2 className="text-lg font-semibold mb-4 py-2 px-2">Recent Invoices</h2>
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr className="bg-gray-100">
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6">Invoice ID</th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">Product name</th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">Sales date</th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">Paid amount</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-xs">Sales status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={index} className="text-center">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">#B2A{invoice.id}</td>
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
                <tr key={index}>
                  <td className="border border-gray-200 px-4 py-2">{stock.product_name}</td>
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
