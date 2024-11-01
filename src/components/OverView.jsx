import React, { useState, useEffect } from 'react';
import { HomeIcon, UserIcon, CogIcon, ChartBarIcon } from '@heroicons/react/20/solid';
import Card from './Card';
import HomeComponent from './HomeComponent';
import UserComponent from './UserComponent';
import CogComponent from './CogComponent';
import ChartBarComponent from './ChartBarComponent';
import InvoiceTable from './InvoiceTable';
import Chart from './Chart';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

export default function Example() {
  const { user } = useAuth(); // Get user from AuthContext
  const userEmail = user?.email; // Get the email, if available

  const [selectedComponent, setSelectedComponent] = useState(() => Chart);
  const [salesCount, setSalesCount] = useState('0'); // Default value
  const [todaySales, setTodaySales] = useState('NGN 00.00'); // Default today sales value
  const [profitMade, setProfitMade] = useState('NGN 0.00'); // Initialize profit state
  const [totalProductsSold, setTotalProductsSold] = useState('0'); // New state for total products sold
  const [isLoading, setIsLoading] = useState(true);
  const [totalProductsCount, setTotalProductsCount] = useState(0);

  // Function to format date into YYYY-MM-DD
  const formatDate = (date) => {
    return date.toISOString().split('T')[0]; // Returns only the date part
  };

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch(`https://raotory.com.ng/apis/get_sales_count.php?email=${encodeURIComponent(userEmail)}`);
        const data = await response.json();
        
        console.log(data); // Log the entire response data for debugging

        if (data.success) {
          // Get the current date in YYYY-MM-DD format
          const today = formatDate(new Date());

          // Filter sales made today using `sold_date`
          const todaySalesData = data.profits.filter(sale => {
            const saleDate = formatDate(new Date(sale.sold_date));
            return saleDate === today;
          });

          // Sum today's sales
          const totalTodaySales = todaySalesData.reduce((total, sale) => total + sale.total_sales, 0);
          setTodaySales(`NGN ${totalTodaySales.toFixed(2)}`); // Update today’s sales formatted as currency

          // Set other state values (total profits, products count)
          const totalProfits = data.profits.reduce((total, profit) => total + profit.profit_made, 0);
          setProfitMade(`NGN ${totalProfits.toFixed(2)}`); // Update profit made

          setTotalProductsCount(data.profits.length); // Set total number of products
          setTotalProductsSold(data.total_products_sold || '0'); // Assuming your API returns this value
        } else {
          console.error('Failed to fetch sales data:', data.error);
        }
      } catch (err) {
        console.error('Error fetching sales data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userEmail) {
      fetchSalesData(); // Call the function to fetch sales data if userEmail is available
    }
  }, [userEmail]);

  const handleCardClick = (component) => {
    setSelectedComponent(() => component);
  };

  const cardData = [
    {
      id: 1,
      icon: HomeIcon,
      backgroundColor: "bg-[#E7F8FC]",
      amount: isLoading ? "Loading..." : todaySales,
      analytics: '20%',
      analyticsText: 'Than last month',
      description: "Today’s Sale",
      component: HomeComponent
    },
    {
      id: 2,
      icon: UserIcon,
      backgroundColor: "bg-[#F0E8FC]",
      amount: isLoading ? "Loading..." : totalProductsCount, // Use total products count
      analytics: '20%',
      analyticsText: 'Than last month',
      description: "No of invoices issued", // Consider updating this description to be more relevant
      component: UserComponent
    },
    {
      id: 3,
      icon: CogIcon,
      backgroundColor: "bg-[#FCF3EC]",
      amount: isLoading ? "Loading..." : profitMade,
      analytics: '20%',
      analyticsText: 'Than last month',
      description: "Profit made",
      component: CogComponent
    },
    {
      id: 4,
      icon: ChartBarIcon,
      backgroundColor: "bg-[#FCE0EC]",
      amount: isLoading ? "Loading..." : totalProductsSold, // Use fetched total products sold
      analytics: '20%',
      analyticsText: 'Than last month',
      description: "No of products sold",
      component: ChartBarComponent
    }
  ];

  return (
    <>
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Reports showing for Today</h3>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cardData.map((card) => (
          <div key={card.id} onClick={() => handleCardClick(card.component)}>
            <Card
              icon={card.icon}
              backgroundColor={card.backgroundColor}
              amount={card.amount}
              description={card.description}
              analytics={card.analytics}
              analyticsText={card.analyticsText}
            />
          </div>
        ))}
      </div>

      <div>
        <InvoiceTable />
      </div>
    </>
  );
}
