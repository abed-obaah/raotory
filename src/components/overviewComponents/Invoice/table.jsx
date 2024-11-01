import React, { useState, useEffect } from "react";

const Table = ({ tab, setTab, setSelectedInvoice }) => {
    const [invoices, setInvoices] = useState([]);
    const thead = ['Customer Name', 'Invoice Number', 'Sales Type', 'Status'];

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await fetch("https://raotory.com.ng/apis/get_sales.php?store_email=abedobaah@gmail.com");
                const data = await response.json();
                console.log(data);

                if (data.success && data.sales.length > 0) {
                    // Retain the entire sale object in invoices
                    setInvoices(data.sales);
                } else {
                    console.log("No sales found");
                }
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };

        fetchSalesData();
    }, []);

    const handleClick = (invoice) => {
        setSelectedInvoice(invoice); // Pass the selected invoice to the parent component
        setTab('Data'); // Change the tab to 'Data'
    };

    const Type = (status) => {
        let bgColor;
        if (status === "Paid") {
            bgColor = "bg-green-200";
        } else if (status === 'Credit') {
            bgColor = "bg-red-200";
        } else if (status === 'Part') {
            bgColor = "bg-yellow-100";
        } else {
            bgColor = "bg-gray-200";
        }

        return (
            <td className={`h-1/2 mt-1 py-1 flex justify-center align-center rounded-full w-full ${bgColor}`}>
                {status}
            </td>
        );
    };

    return (
        <table className="w-full mt-9">
            <thead>
                <tr>
                    {thead.map((th, index) => (
                        <th key={index} className="text-gray-400 font-semibold text-left">{th}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {invoices.map((invoice, index) => (
                    <tr key={index} className="text-left rounded-lg text-blue-900 font-semibold">
                        <td className="mb-5 h-10">{invoice.customer_name}</td>
                        <td>{invoice.id}</td>
                        <td>{invoice.payment_type}</td>
                        {Type(invoice.status || "Unknown")}
                        <td className="text-center">
                            <button className="border bg-blue-600 px-7 py-1 text-white rounded" onClick={() => handleClick(invoice)}>
                                View
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;


