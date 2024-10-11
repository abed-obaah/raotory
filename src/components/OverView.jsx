// import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
// import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon } from '@heroicons/react/24/outline'

// const stats = [
//   { id: 1, name: 'Total Subscribers', stat: '71,897', icon: UsersIcon, change: '122', changeType: 'increase' },
//   { id: 2, name: 'Avg. Open Rate', stat: '58.16%', icon: EnvelopeOpenIcon, change: '5.4%', changeType: 'increase' },
//   { id: 3, name: 'Avg. Click Rate', stat: '24.57%', icon: CursorArrowRaysIcon, change: '3.2%', changeType: 'decrease' },
// ]

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function Example() {
//   return (
//     <div>
//       <h3 className="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3>

//       <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//         {stats.map((item) => (
//           <div
//             key={item.id}
//             className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
//           >
//             <dt>
//               <div className="absolute rounded-md bg-indigo-500 p-3">
//                 <item.icon aria-hidden="true" className="h-6 w-6 text-white" />
//               </div>
//               <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
//             </dt>
//             <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
//               <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
//               <p
//                 className={classNames(
//                   item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
//                   'ml-2 flex items-baseline text-sm font-semibold',
//                 )}
//               >
//                 {item.changeType === 'increase' ? (
//                   <ArrowUpIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 self-center text-green-500" />
//                 ) : (
//                   <ArrowDownIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 self-center text-red-500" />
//                 )}

//                 <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
//                 {item.change}
//               </p>
//               <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
//                 <div className="text-sm">
//                   <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//                     View all<span className="sr-only"> {item.name} stats</span>
//                   </a>
//                 </div>
//               </div>
//             </dd>
//           </div>
//         ))}
//       </dl>
//     </div>
//   )
// }

import React from 'react';  // Make sure React is imported
import { useState } from 'react';
import { HomeIcon, UserIcon, CogIcon, ChartBarIcon } from '@heroicons/react/20/solid'
import Card from './Card'
import Chart from './Chart'
import HomeComponent from './HomeComponent' // Add these components
import UserComponent from './UserComponent'
import CogComponent from './CogComponent'
import ChartBarComponent from './ChartBarComponent'
import InvoiceTable from './InvoiceTable';

const cardData = [
  { id: 1, icon: HomeIcon, backgroundColor: "bg-[#E7F8FC]",
     amount: "NGN 238,908.00",
     analytics:'20%',
     analyticsText:'Than last month',
     description: "Today’s Sale",
      component: HomeComponent 
    },

  { id: 2, icon: UserIcon, backgroundColor: "bg-[#F0E8FC]", 
    amount: "6,728",
    analytics:'20%',
    analyticsText:'Than last month',
     description: "No of invoices issued",
      component: UserComponent 
    },

  { id: 3, icon: CogIcon, backgroundColor: "bg-[#FCF3EC]",
     amount: "NGN 238,908.00",
     analytics:'20%',
     analyticsText:'Than last month',
      description: "Profit made",
       component: CogComponent 
    },

  { id: 4, icon: ChartBarIcon, backgroundColor: "bg-[#FCE0EC]",
     amount: "90,000", 
     analytics:'20%',
     analyticsText:'Than last month',
     description: "No of products sold",
      component: ChartBarComponent 
    }
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
              amount={card.amount}
              description={card.description}
              analytics={card.analytics}
              analyticsText={card.analyticsText}
            />
          </div>
        ))}
      </div>

      <div className="flex divide-x divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
  <div className="px-4 py-5 sm:p-6 flex-1">
    <h1>Sales and purchase</h1>
  </div>
  <div className="px-4 py-4 sm:px-6 flex-1">
   <h1>Customers</h1>
  </div>
    </div>

    <div>
    <InvoiceTable/>
    </div>




    </>
  )
}

