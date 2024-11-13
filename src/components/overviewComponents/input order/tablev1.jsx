import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

const CreateTable = ({ tab, tableInfo, setTableInfo }) => {
    const handleQuantityChange = (index, newQuantity) => {
        const updatedTableInfo = [...tableInfo];
        updatedTableInfo[index].Quantity = Math.max(0, newQuantity);
        setTableInfo(updatedTableInfo);
    };

    const totalCount = tableInfo.reduce((acc, item) => acc + (item.SellPrice * item.Quantity), 0);

    return (
        <>
            <table className="mt-9">
                <thead className="bg-customColor text-white h-12">
                    
                        <tr>
                            <th className="border bg-customColor w-1/9 font-normal">N/O</th>
                            <th className="border bg-customColor w-1/5 font-normal">Product Name</th>
                            <th className="border bg-customColor w-1/5 font-normal">Cost Price</th>
                            <th className="border bg-customColor w-1/5 font-normal">Selling Price</th>
                            <th className="border bg-customColor w-auto font-normal">Quantity</th>
                            <th className="border bg-customColor w-1/5 font-normal">Total</th>
                        </tr>
                </thead>
                <tbody>
                    {tableInfo.map((item, index) => (
                        <tr key={item.N0} className="border text-gray-400">
                            <td className="border p-3">{item.N0}</td>
                            <td className="border p-3 w-1/5">{item.Productname}</td>
                            <td className="border p-3">NGN{item.CostPrice}</td>
                            <td className="border p-3" style={{ color: "black", opacity: '.8' }}>NGN{item.SellPrice}</td>
                            <td className="border p-3 w-1/5">
                               
                                     <input
                                        type="number"
                                        value={item.Quantity}
                                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
                                        style={{ color: "white" }}
                                        className="w-full bg-gray-400 p-1 align-items"
                                        readOnly
                                    />
                              
                            </td>
                            <td className="border p-3 flex justify-between">NGN{item.SellPrice * item.Quantity}
                                <div className="bg-red-300 p-2 rounded-full"><TrashIcon height='20px' color="red" /></div>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </>
    );
};

export default CreateTable;
