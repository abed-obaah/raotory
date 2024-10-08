import React, { useState } from "react";
import Table from './TableComp'
import { Tab } from "@headlessui/react";
import VectorBG from '../../../../src/assets/Vector 18.svg'

const inputOrder = () => {
    const [tab, setTab] = useState('input');
    function handleClick() {
        if (tab == 'input') {
            setTab('Pay')
        }
        else if (tab == 'Pay') {
            setTab('invoice')
        }
        else if (tab == 'invoice') {
            setTab('input')
        }
    }
    const inputPage = () => {

        return (
            <>
                <div>
                    <form action="">
                        <input type="text" placeholder="Select Customer" className="h-5 border p-7 w-3/5 rounded-lg" />
                        <div className="binput flex mt-10  r-0">
                            < input type="text" placeholder="Select Product" className="h-5 border p-7 w-3/5 rounded-lg" />
                            < input type="text" placeholder="Price Type" className="h-5 border p-7 w-2/6 ml-4 rounded-lg" />
                        </div>
                    </form>
                    <Table tab="input" />
                    <button className="w-full border rounded-lg mt-5 p-3 align-items bg-blue-500 text-white" onClick={handleClick}>Make Payment</button>
                </div>
            </>
        )
    }

    const payPage = () => {
        return (
            <>
                <div className="relative w-full" style={{
                    height: "80vh"
                }}>
                    <form action="">
                        <input type="text" placeholder="Select Customer" className="h-5 border p-7 w-full rounded-lg" />
                        <input type="text" placeholder="Selected Proucts" className="h-5 border p-7 w-full mt-5 rounded-lg" />
                        <div className="btm flex mt-10">
                            <input type="text" placeholder="Payment Type" className="h-5 border p-7 w-1/2 mr-4 rounded-lg" />
                            <input type="text" placeholder="Amount" className="h-5 border p-7 w-1/2 rounded-lg" />
                        </div>
                    </form>
                    <button className=" border absolute bottom-0 rounded-lg mt-5 p-3 align-items bg-blue-500 text-white" style={{
                        width: '100%'

                    }} onClick={handleClick}>Issue Invoice</button></div>
            </>
        )
    }


    const sendInvoice = () => {
        return (
            <>
                <div className="bg-blue-500 flex justify-between align-center w-full h-full rounded-lg p-8 text-white bg-right bg-no-repeat" style={{ backgroundImage: `url(${VectorBG})` }}>
                    <div className="right">
                        <h2 className="text-4xl font-semibold">Okeme Izu</h2>
                        <p className="text-xs mt-2 font-normal">INVOICE NUMBER: #234650</p>
                        <p className="text-xs mt-1 font-normal">Abraka, Delta State</p>
                    </div>
                    <div className="left mr-12 mt-1 font-semibold">
                        <p>Grand Total</p>
                        <h2 className="text-4xl">NGN1,645,680</h2>
                    </div>
                </div>
                <Table tab="invoice" />
                <button className="w-1/3 border rounded-lg mt-5 p-3 align-items bg-blue-500 text-white" onClick={handleClick}>Print Invoice</button>
            </>
        )
    }
    switch (tab) {
        case 'input':
            return inputPage();

        case 'Pay':
            return payPage()
        case "invoice":
            return sendInvoice();
    }
}
export default inputOrder