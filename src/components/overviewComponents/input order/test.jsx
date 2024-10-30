const inputPage = ({ customers, products, error, addProductToTable, tableInfo, setTableInfo }) => {
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [price, setPrice] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSelectChange = (e) => {
        setSelectedCustomer(e.target.value);
    };

    const handleProductChange = (e) => {
        setSelectedProduct(e.target.value);
        // Optionally set price based on the selected product here
    };

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

    const handleClick = () => {
        // Handle payment logic here
    };

    return (
        <div>
            <form>
                {error && <p className="text-red-500">{error}</p>}
                <div className="dropdown">
                    <button type="button" onClick={toggleDropdown} className="dropbtn">
                        {selectedCustomer || "Select Customer"}
                    </button>
                    {dropdownVisible && (
                        <div className="dropdown-content">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearchInputChange}
                                className="search-input"
                            />
                            {filterCustomers().map(customer => (
                                <div
                                    key={customer.id}
                                    onClick={() => {
                                        setSelectedCustomer(customer.name);
                                        setDropdownVisible(false);
                                        setSearchTerm(''); // Clear search on selection
                                    }}
                                    className="dropdown-item"
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
                        {products.map(product => (
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
}