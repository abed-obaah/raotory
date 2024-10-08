import React, { useState } from "react";
const Table = ({ tab, setTab }) => {

    const thead = ['Customer Name', 'Invoice Number', 'Sales Type', 'Status']
    const invoices = [{
        name: 'Abed Obaah',
        number: '#2022345',
        type: 'Wholesale',
        status: "Part"
    }, {
        name: 'Abed Obaah',
        number: '#2022345',
        type: 'Wholesale',
        status: "Paid"
    }, {
        name: 'Abed Obaah',
        number: '#2022345',
        type: 'Wholesale',
        status: "Credit"
    }, {
        name: 'Abed Obaah',
        number: '#2022345',
        type: 'Wholesale',
        status: "Part"
    }, {
        name: 'Abed Obaah',
        number: '#2022345',
        type: 'Wholesale',
        status: "Credit"
    }, {
        name: 'Abed Obaah',
        number: '#2022345',
        type: 'Wholesale',
        status: "Paid"
    }]
    function handleClick() {
        setTab('Data')
    }
    const Type = (status) => {
        if (status === "Paid") {
            return (
                <>
                    <div className="flex justify-center align-center">
                        <td className="  bg-green-200  h-1/2 mt-1 py-1 flex justify-center align-center rounded-full w-full">{status}</td>
                    </div>
                </>
            )
        } else if (status === 'Credit') {
            return (
                <>
                    <div className="flex justify-center align-center">
                        <td className="  bg-red-200  h-1/2 mt-1 py-1 flex justify-center align-center rounded-full w-full">{status}</td>
                    </div>
                </>
            )
        } else if (status === 'Part') {
            return (
                <>
                    <div className="flex justify-center align-center">
                        <td className="  bg-yellow-100  h-1/2 mt-1 py-1 flex justify-center align-center rounded-full w-full">{status}</td>
                    </div>
                </>
            )
        }
    }
    return (
        <>
            <table className="w-full mt-9">
                <thead>
                    {thead.map((th) => {
                        return (

                            <th className="text-gray-400  font-semibold text-left">{th}</th>
                        )
                    })}
                </thead>
                <tbody>
                    {invoices.map((invoice) => {
                        return (

                            <tr className="text-left rounded-lg text-blue-900 font-semibold">
                                <td className="mb-5 h-10">{invoice.name}</td>
                                <td>{invoice.number}</td>
                                <td>{invoice.type}</td>
                                {/* <td>{invoice.status}</td> */}
                                {Type(invoice.status)}
                                <td className="text-center"><button className="border bg-blue-600 px-7 py-1  text-white rounded" onClick={handleClick}>View</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
export default Table;