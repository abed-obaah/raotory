import React, { useState, useEffect } from 'react';
import { HomeIcon, UserIcon, CogIcon, ChartBarIcon } from '@heroicons/react/20/solid';
import Card from './Card';
import HomeComponent from './HomeComponent';
import UserComponent from './UserComponent';
import CogComponent from './CogComponent';
import ChartBarComponent from './ChartBarComponent';
import InvoiceTable from './InvoiceTable';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

export default function Example() {
  const { user } = useAuth(); // Get user from AuthContext
  const userEmail = user?.email; // Get the email, if available

  const [selectedComponent, setSelectedComponent] = useState(() => ChartBarComponent);
  const [todaySales, setTodaySales] = useState('NGN 0.00'); // Default today sales value
  const [profitMade, setProfitMade] = useState('NGN 0.00'); // Initialize profit state
  const [totalProductsSold, setTotalProductsSold] = useState('0'); // New state for total products sold
  const [isLoading, setIsLoading] = useState(true);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [totalInvoicesCount, setTotalInvoicesCount] = useState(0); 

  // Function to format date into YYYY-MM-DD
  const formatDate = (date) => {
    return date.toISOString().split('T')[0]; // Returns only the date part
  };

  useEffect(() => {
    const fetchSalesData = async () => {
      if (!userEmail) return; // Early return if userEmail is not available
    
      try {
        const response = await fetch(`https://raotory.com/apis/get_sales_count.php?email=${encodeURIComponent(userEmail)}&date=${formatDate(new Date())}`);
        const data = await response.json();
    
        console.log('API Response:', data); // Log the entire response data for debugging
    
        // Directly extract values assuming the API always returns them
        setTodaySales(data.products_sold_today ? ` ${data.products_sold_today}` : ' 0.00');
        setProfitMade(data.total_profit ? `NGN ${data.total_profit}` : 'NGN 0.00');
        setTotalProductsSold(data.total_products_sold ? `${data.total_products_sold}` : '0');
        setTotalProductsCount(data.total_products_count || 0); // Assuming your API returns this value
    
      } catch (err) {
        console.error('Error fetching sales data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchInvoices = async () => {
      if (!userEmail) return; 
      try {
        const response = await fetch(`https://raotory.com/apis/invoice.php?user_email=${encodeURIComponent(userEmail)}`);
        const data = await response.json();
    
        if (data.success) {
          console.log('Invoices:', data.invoices);
          // Handle displaying the invoices in your app
          setTotalInvoicesCount(data.total_invoices); 
        } else {
          console.error('Error fetching invoices:', data.error);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };
    

    fetchSalesData(); // Call the function to fetch sales data
    fetchInvoices()
  }, [userEmail]);

  const handleCardClick = (component) => {
    setSelectedComponent(() => component);
  };

  const cardData = [
    {
      id: 1,
      icon: HomeIcon,
      backgroundColor: "bg-[#E7F8FC]",
      amount: isLoading ? "Loading..." : todaySales, // Display today’s sales
      analytics: '20%',
      analyticsText: 'Than last month',
      description: "Today’s Sale",
      component: HomeComponent
    },
    {
      id: 2,
      icon: UserIcon,
      backgroundColor: "bg-[#F0E8FC]",
      amount: isLoading ? "Loading..." : totalInvoicesCount.toString(), // Use total invoices count
      analytics: '20%',
      analyticsText: 'Than last month',
      description: "No of invoices issued",
      component: UserComponent
    },
    {
      id: 3,
      icon: CogIcon,
      backgroundColor: "bg-[#FCF3EC]",
      amount: isLoading ? "Loading..." : profitMade, // Display profit made
      analytics: '20%',
      analyticsText: 'Than last month',
      description: "Profit made",
      component: CogComponent
    },
    {
      id: 4,
      icon: ChartBarIcon,
      backgroundColor: "bg-[#FCE0EC]",
      amount: isLoading ? "Loading..." : totalProductsSold.toString(), // Display total products sold
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
