import React, { useEffect, useState } from "react";
import Tables from './Tables';
import { useAuth } from '../../../context/AuthContext'; 

const InventoryPage = () => {
    const { user } = useAuth();
    const [totalProducts, setTotalProducts] = useState(0);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const userEmail = user?.email; // Replace with actual user email or fetch from context/store

    useEffect(() => {
        // Fetch total products and products
        const fetchProducts = async () => {
            const response = await fetch(`https://raotory.com.ng/apis/inventory.php?email=${userEmail}`);
            const data = await response.json();

            // Log the response
            console.log("API Response:", data);

            if (!data.error) {
                setTotalProducts(data.totalDrugs);
                setProducts(data.drugs);
            }
        };

        fetchProducts();
    }, [userEmail]);

    // Search function
    const handleSearch = async () => {
        const response = await fetch("https://raotory.com.ng/apis/inventory.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ action: 'search', email: userEmail, searchTerm }),
        });
        const data = await response.json();
        setProducts(data);
    };

    return (
        <>
            <div className="top flex w-full justify-between align-center" style={{ height: '10vh' }}>
                <div className="text text-gray-500 px-7">
                    <h2 className="text-sm">Total Product</h2>
                    <p className="text-4xl">{totalProducts}</p>
                </div>
                <input 
                    type="text" 
                    className="w-3/4 border rounded-lg px-6" 
                    style={{ height: '45px' }} 
                    placeholder="Search by Product" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter
                />
            </div>
            <Tables products={products} userEmail={userEmail} />
        </>
    );
}

export default InventoryPage;
