import React from "react";
import Tables from './Tables';
const InventoryPage = () => {
    return (
        <>
            <div className="top flex w-full justify-between align-center" style={{ height: '10vh' }}>
                <div className="text text-gray-500 px-7" >
                    <h2 className="text-sm">Total Product</h2>
                    <p className="text-4xl">5000</p>
                </div>
                <input type="text" className="w-3/4 border rounded-lg px-6" style={{ height: '45px' }} placeholder="Search by Product " />
            </div>
            <Tables />
        </>
    )
}

export default InventoryPage