import React from "react";

const selectedTab = () => {
    const products = [{
        product: 'Sardine',
        amount: 2000,
        price: 20200,
        expires: '11 Sep, 2025'
    }, {
        product: 'Sardine',
        amount: 2000,
        price: 20200,
        expires: '11 Sep, 2025'
    }, {
        product: 'Sardine',
        amount: 2000,
        price: 20200,
        expires: '11 Sep, 2025'
    }, {
        product: 'Sardine',
        amount: 2000,
        price: 20200,
        expires: '11 Sep, 2025'
    }, {
        product: 'Sardine',
        amount: 2000,
        price: 20200,
        expires: '11 Sep, 2025'
    }, {
        product: 'Sardine',
        amount: 2000,
        price: 20200,
        expires: '11 Sep, 2025'
    }, {
        product: 'Sardine',
        amount: 2000,
        price: 20200,
        expires: '11 Sep, 2025'
    }]
    return (

        <section className="border w-1/4 p-2 display-inline rounded-lg overflow-y-scroll" style={{ height: '80vh' }}>
            <h2 className="pl-3">Selected Products</h2>
            <p className="text-xs text-gray-400 pl-3">Selected products displays here</p>
            <div className="contain">
                {products.map((product) => {

                    return (
                        <div className="flex justify-between p-4">
                            <div className="lefttext">
                                <p className="text-normal">{product.product} <span>x {product.amount}</span></p>
                                <p className="text-xs text-gray-400">Expires: {product.expires}</p>
                            </div>
                            <p className="text-normal">NGN{product.price}</p>
                        </div>
                    )

                })}
            </div>

            <button className="border bg-blue-500 rounded-lg p-3 text-white w-full">Stock Up</button>
        </section>
    )
}

export default selectedTab;