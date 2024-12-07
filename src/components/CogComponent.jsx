import React, { useEffect, useState } from "react";
import axios from "axios";

const Profits = () => {
  const [profits, setProfits] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch profits
  const fetchProfits = async () => {
    try {
      const response = await axios.get("https://raotory.com/get_profits.php");
      const uniqueProfits = response.data.reduce((acc, current) => {
        const x = acc.find(item => item.drug_name === current.drug_name && item.cost_of_drug === current.cost_of_drug);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      setProfits(uniqueProfits);
    } catch (error) {
      console.error("Error fetching profits:", error);
    }
  };
  

  // Function to trigger profit calculation
  const calculateProfits = async () => {
    setLoading(true);
    try {
      await axios.get("https://raotory.com/calculate_profits.php");
      // After calculating profits, fetch updated data
      await fetchProfits();
    } catch (error) {
      console.error("Error calculating profits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial profit data
    fetchProfits();
  }, []);

  return (
    <div>
      <h1>Profits Report</h1>
      <button onClick={calculateProfits} disabled={loading}
       className="block rounded-md bg-indigo-600 px-3 py-2 mb-10 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        {loading ? "Calculating..." : "See Profits"}
      </button>
      <table border="1" className="min-w-full divide-y divide-gray-300">
        <thead className="bg-[#008C38]">
          <tr> 
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">Drug Name</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Quantity Sold</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Cost of Drug</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Profit Made</th>
          </tr>
        </thead>
        <tbody>
          {profits.length > 0 ? (
            profits.map((profit) => (
              <tr key={profit.id}>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{profit.drug_name}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{profit.quantity_sold}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"> {profit.cost_of_drug}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{profit.profit_made}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No profits available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Profits;
