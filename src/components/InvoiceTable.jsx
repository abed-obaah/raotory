import React, { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext'; 

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [todaySales, setTodaySales] = useState("NGN 0");
  const [totalProductsSold, setTotalProductsSold] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [stockAlert, setStockAlert] = useState([]);
  const { user } = useAuth();
  const userEmail = user?.email;

  // Format date in YYYY-MM-DD format
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      if (!userEmail) return; 
      try {
        const response = await fetch(`https://raotory.com/apis/invoice.php?user_email=${encodeURIComponent(userEmail)}`);
        const data = await response.json();
    
        if (data.success) {
          console.log('Invoices:', data.invoices);
          // Map the invoices to the format you need for display
          const formattedInvoices = data.invoices.map(invoice => ({
            id: invoice.id, // Ensure you have the correct field names
            customer: invoice.customer_name,
            invoice_id: invoice.invoice_id,
            product_name: invoice.product_name,
            date: invoice.sales_date,
            amount: `NGN ${parseFloat(invoice.paid_amount).toFixed(2)}`,
            status: invoice.sales_status,
          }));
          setInvoices(formattedInvoices);
        } else {
          console.error('Error fetching invoices:', data.error);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };

    const fetchSalesData = async () => {
      try {
        const response = await fetch(`https://raotory.com/apis/get_sales_count.php?email=${encodeURIComponent(userEmail)}`);
        const data = await response.json();

        console.log(data);

        if (data.success) {
          const today = formatDate(new Date());
          const todaySalesData = data.sales.filter(sale => {
            const saleDate = formatDate(new Date(sale.sold_date));
            return saleDate === today;
          });

          const totalTodaySales = todaySalesData.reduce((total, sale) => total + parseFloat(sale.sell_price), 0);
          setTodaySales(`NGN ${totalTodaySales.toFixed(2)}`);
          setTotalProductsSold(data.sales.length);
        } else {
          console.error('Failed to fetch sales data:', data.error);
        }
      } catch (err) {
        console.error('Error fetching sales data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchStockAlert = async () => {
      if (!userEmail) return;
    
      try {
        const response = await fetch("https://raotory.com/apis/stock_alert.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_email: userEmail,
          }),
        });
    
        const data = await response.json();
        console.log("message",data)
        if (data.message) {
          console.log(data.message);
        } else {
          setStockAlert(data);
        }
      } catch (err) {
        console.error("Error fetching stock alerts:", err);
      }
    };
    

    if (userEmail) {
      fetchInvoices(); // Fetch invoices when userEmail is available
      fetchSalesData(); // Call the function to fetch sales data
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
    return <div>Loading...</div>;
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
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">customer</th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">Sales date</th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">Paid amount</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-xs">Sales status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={index} className="text-center">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{invoice.invoice_id}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{invoice.product_name}</td>
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

              {stockAlert.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      <th className="border border-gray-200 px-4 py-2">Products</th>
                      <th className="border border-gray-200 px-4 py-2">Quantity in stock</th>
                      <th className="border border-gray-200 px-4 py-2">Expiration date</th>
                      <th className="border border-gray-200 px-4 py-2">Batch Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockAlert.map((stock, index) => (
                      <tr key={index}>
                        <td className="border border-gray-200 px-4 py-2">{stock.product_name}</td>
                        <td className="border border-gray-200 px-4 py-2">{stock.quantity_in_stock}</td>
                        <td className="border border-gray-200 px-4 py-2">{stock.expiration_date}</td>
                        <td className="border border-gray-200 px-4 py-2">{stock.batch_number}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-gray-500">No low stock products found for this user.</p>
              )}
            </div>

      </div>
    </div>
  );
};

export default InvoiceTable;
