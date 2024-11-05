import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { BanknotesIcon } from "@heroicons/react/24/outline";

const Table = ({ 
    onRowSelection, 
    selectedCount, 
    selectedRows, 
    setSelectedRows, 
    products, 
    tab, 
    setSelectedCount, 
    selectedInvoice // Add selectedInvoice as a prop
}) => {
    const thead = ['N/O', "Product Name", "Cost Price", 'Selling Price', 'Quantity', "Total"];

    useEffect(() => {
        if (typeof onRowSelection === 'function') {
            onRowSelection(selectedRows.length); // Pass the count of selected rows to the parent component
        } else {
            console.error('onRowSelection is not a function', onRowSelection);
        }
    }, [selectedRows, onRowSelection]);

    const toggleRow = (product) => {
        const isSelected = selectedRows.includes(product.id);
        if (isSelected) {
            setSelectedRows(selectedRows.filter(row => row !== product.id));
        } else {
            setSelectedRows([...selectedRows, product.id]);
        }
    };

    return (
        <>
            {/* Invoice Table */}
            <table className="mt-9 text-gray-600 w-full">
                <thead className="bg-gray-300 text-gray-600">
                    <tr>
                        {thead.map((Col) => (
                            <th key={Col} className={`border font-normal p-3 ${Col === "N/O" ? 'w-4' : 'w-1/5'}`}>
                                {Col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => {
                        const total = product.quantity * product.sell; // Assuming `product.sell` is the selling price
                        return (
                            <tr
                                key={product.id}
                                className={`text-center border cursor-pointer ${selectedRows.includes(product.id) ? 'bg-blue-100' : ''}`}
                                onClick={() => toggleRow(product)}
                            >
                                <td className="h-12 border">{index + 1}</td>
                                <td>{product.product_name}</td>
                                <td>{product.cost}</td> {/* Add the correct cost price if available */}
                                <td>{product.sell}</td>
                                <td>{product.quantity}</td>
                                <td>{total}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Display Selected Invoice Details */}
            {selectedInvoice && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-2">Selected Invoice Details</h2>
                    <p><strong>Invoice Number:</strong> {selectedInvoice.id}</p>
                    <p><strong>Customer:</strong> {selectedInvoice.customer}</p>
                    <p><strong>Product Name:</strong> {selectedInvoice.product_name}</p>
                    <p><strong>Cost Price:</strong> {selectedInvoice.cost}</p>
                    <p><strong>Selling Price:</strong> {selectedInvoice.sell}</p>
                    <p><strong>Quantity:</strong> {selectedInvoice.quantity}</p>
                    <p><strong>Total:</strong> {selectedInvoice.quantity * selectedInvoice.sell}</p>
                </div>
            )}
        </>
    );
};

// PropTypes for validation
Table.propTypes = {
    onRowSelection: PropTypes.func.isRequired,
    selectedCount: PropTypes.number.isRequired,
    selectedRows: PropTypes.array.isRequired,
    setSelectedRows: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    tab: PropTypes.string.isRequired,
    setSelectedCount: PropTypes.func.isRequired,
    selectedInvoice: PropTypes.object // Add selectedInvoice PropType
};

export default Table;
