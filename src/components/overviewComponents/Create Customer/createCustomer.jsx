import React, { useState } from "react";
import Table from './Table';
// import Form from './form'
const createCustomercomponent = () => {

    const [tab, setTab] = useState('table');
    function handleClick() {
        if (tab == 'table') {
            setTab('create')
        }
    }
    const customerPage = () => {

        return (
            <>
                <div className="flex justify-between mb-9 w-full">
                    <form action="" className="w-1/3"><input type="text" className="border p-3 rounded-lg w-full" placeholder="Search Customer" /></form>
                    <button className="bg-blue-500 p-3 rounded-lg text-white w-1/4" onClick={handleClick}>Create Customer</button>

                </div><Table />
            </>
        )
    }

    switch (tab) {
        case 'table':
            return customerPage();
        case 'create':
            return <Form />
        default:
            break;
    }
}

export default createCustomercomponent;