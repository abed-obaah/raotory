import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'; // Ensure you have this icon imported
import Stack from '@mui/material/Stack';
// import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';

// const barChartsParams = {
//   xAxis: [
//     {
//       data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
//       scaleType: 'band',
//     },
//   ],
//   series: [
//     { data: [2, 5, 3, 4, 1, 6, 8, 7, 5, 3, 2, 4], stack: '1', label: 'Jobs Applied', color: '#008C38' },
//     // #E5FFF0
//     { data: [8, 6, 7, 5, 3, 4, 9, 2, 10, 6, 8, 7], stack: '1', label: 'Jobs viewed', color: '#E5FFF0' },
//     // #008C38
//   ],
//   margin: { top: 20, right: 20, bottom: 20, left: 40 },
//   height: 400,
//   width: 900,
//   barCategoryGap: '30%', // Adjust this for spacing between bar categories
//   barGap: -10, // Adjust this for spacing between bars
//   borderRadius: 5,
//   slotProps: {
//     legend: {
//       hidden: false, // Show legend
//     },
//   },
// };

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const dData = [3400, 2398, 8800, 4908, 4800, 3200, 4100];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

export default function Example() {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow mt-10">
      <div className="px-4 py-5 sm:p-6">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              This month
              <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
            </Menu.Button>
          </div>

          <Menu.Items
            className="absolute left-0 mt-2 w-56 bg-[#F2EFFF] origin-top-right rounded-md  shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none z-10"
          >
            <div className="py-1">
              <Menu.Item>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  last month
                </a>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>

        <Stack direction="column" sx={{ width: '100%', maxWidth: 900 }}>
        <LineChart
                width={1000}
                height={500}
                series={[
                    { data: pData, label: 'Direct Sales' },
                    { data: uData, label: 'Retail' },
                    { data: dData, label: 'Wholesale' },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
                />
        </Stack>
      </div>
    </div>
  );
}
