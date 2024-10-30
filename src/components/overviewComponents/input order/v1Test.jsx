const inputPage = ({ customers, products, error, addProductToTable, tableInfo, setTableInfo }) => {

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filterCustomers = () => {
        if (!searchTerm) return customers;
        return customers.filter(customer =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };
    return(
            <div>
                <form>
                    {error && <p className="text-red-500">{error}</p>}
                            <div className="relative inline-block text-left dropdown">
                                        <button
                                            type="button"
                                            onClick={toggleDropdown}
                                            className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dropbtn"
                                        >
                                            {selectedCustomer || "Select Customer"}
                                            <svg
                                                className="-mr-1 ml-2 h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.23 7.21a.75.75 0 011.06 0l4.47 4.47 4.47-4.47a.75.75 0 111.06 1.06l-5 5a.75.75 0 01-1.06 0l-5-5a.75.75 0 010-1.06z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                
                                            {dropdownVisible && (
                                                <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg dropdown-content">
                                                    <input
                                                        type="text"
                                                        placeholder="Search..."
                                                        value={searchTerm}
                                                        onChange={handleSearchInputChange}
                                                        className="block w-full rounded-md border border-gray-300 p-2 mb-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                    {filterCustomers().map(customer => (
                                                        <div
                                                            key={customer.id}
                                                            onClick={() => {
                                                                setSelectedCustomer(customer.name);
                                                                setDropdownVisible(false);
                                                                setSearchTerm(''); // Clear search on selection
                                                            }}
                                                            className="cursor-pointer select-none relative p-2 hover:bg-indigo-600 hover:text-white dropdown-item"
                                                        >
                                                            {customer.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                            </div>
                            <div className="binput flex mt-10 r-0">
                                <select
                                    value={selectedProduct}
                                    onChange={handleProductChange}
                                    className="h-10 border p-2 w-3/5 rounded-lg"
                                >
                                    <option value="" disabled>Select Product</option>
                                    {products.map((product) => (
                                        <option key={product.id} value={product.id}>
                                            {product.product_name}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    value={price}
                                    placeholder="Price Type"
                                    className="h-5 border p-7 w-2/6 ml-4 rounded-lg"
                                    readOnly
                                />
                                <button type="button" onClick={addProductToTable} className="ml-2 bg-blue-500 text-white rounded p-2">Add</button>
                            </div>
                </form>
                <Table tab="input" tableInfo={tableInfo} setTableInfo={setTableInfo} />
                <button className="w-full border rounded-lg mt-5 p-3 align-items bg-blue-500 text-white" onClick={handleClick}>
                    Make Payment
                </button>
            </div>
   );
};