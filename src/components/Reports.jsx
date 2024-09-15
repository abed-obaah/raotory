import React from 'react';  // Make sure React is imported
import { useState } from 'react';
import { HomeIcon, UserIcon, CogIcon, ChartBarIcon } from '@heroicons/react/20/solid'
import Card from './Card'
import Chart from './Chart'
import HomeComponent from './HomeComponent' // Add these components
import UserComponent from './UserComponent'
import CogComponent from './CogComponent'
import ChartBarComponent from './ChartBarComponent'

const cardData = [
  { id: 1, icon: HomeIcon, backgroundColor: "bg-[#E7F8FC]",
    //  amount: "143.3k", 
     description: "Today’s Sale", component: HomeComponent },
  { id: 2, icon: UserIcon, backgroundColor: "bg-[#F0E8FC]", 
    // amount: "$250,423",
     description: "Monthly Total Sales", component: UserComponent },
  { id: 3, icon: CogIcon, backgroundColor: "bg-[#FCF3EC]",
    //  amount: "$68.9k",
      description: "Profits made", component: CogComponent },
  { id: 4, icon: ChartBarIcon, backgroundColor: "bg-[#FCE0EC]",
    //  amount: "343", 
     description: "Numbers of drugs", component: ChartBarComponent }
]

export default function Example() {
  const [selectedComponent, setSelectedComponent] = useState(() => Chart) // Set Chart as the default component

  const handleCardClick = (component) => {
    setSelectedComponent(() => component)
  }

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
              // amount={card.amount}
              description={card.description}
            />
          </div>
        ))}
      </div>

      <div className="mt-8">
        {selectedComponent && React.createElement(selectedComponent)} {/* Dynamically render the selected component */}
      </div>
    </>
  )
}
