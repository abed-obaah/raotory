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
            const response = await fetch(`https://raotory.com/apis/inventory.php?email=${userEmail}`);
            const data = await response.json();

            // Log the response to inspect the structure of the data
            console.log("API Response:", data);

            if (data && !data.error && Array.isArray(data.drugs)) {
                setTotalProducts(data.totalDrugs);
                setProducts(data.drugs);
            } else {
                console.error("Invalid data structure:", data);
                // Handle invalid data structure if necessary
            }
        };

        fetchProducts();
    }, [userEmail]);

    // Search function
    const handleSearch = async () => {
        // Modify the URL to include search term as a query parameter
        const response = await fetch(`https://raotory.com/apis/inventory.php?email=${userEmail}&action=search&searchTerm=${searchTerm}`, {
            method: "GET", // Change method to GET
        });
        const data = await response.json();
    
        // Log the search response to inspect the data structure
        console.log("Search API Response:", data);
    
        if (data && Array.isArray(data)) {
            setProducts(data);
        } else {
            console.error("Invalid search response format:", data);
        }
    };
    

    return (
        <>
            <div className="top flex w-full justify-between align-center" style={{ height: '10vh' }}>
                <div className="text text-gray-500 px-7">
                    <h2 className="text-sm">Total Product</h2>
                    <p className="text-4xl">{totalProducts}</p>
                </div>
                {/* <input 
                    type="text" 
                    className="w-3/4 border rounded-lg px-6" 
                    style={{ height: '45px' }} 
                    placeholder="Search by Product" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter
                /> */}
            </div>
            {/* Pass the products array to Tables component */}
            <Tables products={products} userEmail={userEmail} />
        </>
    );
}

export default InventoryPage;
