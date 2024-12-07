import { useState, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid'; // Import delete icon (you can use any icon library)

// Confirmation Modal Component
const ConfirmationModal = ({ isVisible, onConfirm, onCancel, message }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-4">{message}</h2>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Example() {
  const [people, setPeople] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set()); // Track selected items
  const [selectAll, setSelectAll] = useState(false); // Track Select All checkbox state
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Track modal visibility for selected items
  const [showItemConfirmModal, setShowItemConfirmModal] = useState(false); // Track modal visibility for single item
  const [deletingItemId, setDeletingItemId] = useState(null); // ID of the item to be deleted
  const [successMessage, setSuccessMessage] = useState(''); // Success message
  const [confirmationMessage, setConfirmationMessage] = useState(''); // Confirmation message

  useEffect(() => {
    // Fetch data from the PHP script
    const fetchData = async () => {
      try {
        const response = await fetch('https://raotory.com/fetch_drugs.php');
        const data = await response.json();
        setPeople(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle individual item selection
  const handleSelectItem = (id) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = new Set(prevSelectedItems);
      if (updatedSelectedItems.has(id)) {
        updatedSelectedItems.delete(id);
      } else {
        updatedSelectedItems.add(id);
      }
      return updatedSelectedItems;
    });
  };

  // Handle Select All checkbox change
  const handleSelectAll = () => {
    setSelectAll((prevSelectAll) => {
      const newSelectAll = !prevSelectAll;
      if (newSelectAll) {
        setSelectedItems(new Set(people.map(person => person.id)));
      } else {
        setSelectedItems(new Set());
      }
      return newSelectAll;
    });
  };

  // Show confirmation modal for deleting selected items
  const openConfirmModalForSelected = () => {
    setConfirmationMessage('Are you sure you want to delete the selected items?');
    setShowConfirmModal(true);
  };

  // Confirm delete action for selected items
  const confirmDeleteSelected = async () => {
    try {
      await Promise.all(
        Array.from(selectedItems).map(id =>
          fetch('https://raotory.com/delete_drug.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
          }).then(response => response.json())
        )
      );

      const remainingPeople = people.filter(person => !selectedItems.has(person.id));
      setPeople(remainingPeople);
      setSelectedItems(new Set()); // Clear selection after deletion
      setSelectAll(false); // Uncheck Select All checkbox
      setSuccessMessage('Selected items deleted successfully!');
    } catch (error) {
      console.error('Error deleting items:', error);
    } finally {
      setShowConfirmModal(false); // Hide the modal
    }
  };

  // Show confirmation modal for deleting an individual item
  const openItemConfirmModal = (id) => {
    setDeletingItemId(id);
    setShowItemConfirmModal(true);
  };

  // Confirm delete action for individual item
  const confirmDeleteItem = async () => {
    if (deletingItemId) {
      try {
        const response = await fetch('https://raotory.com/delete_drug.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: deletingItemId })
        });
        const result = await response.json();
        if (result.success) {
          const remainingPeople = people.filter(person => person.id !== deletingItemId);
          setPeople(remainingPeople);
          setSuccessMessage('Item deleted successfully!');
        } else {
          console.error('Error deleting item:', result.message);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setShowItemConfirmModal(false); // Hide the modal
        setDeletingItemId(null); // Clear the ID
      }
    }
  };

  // Handle cancel action in the modal
  const cancelDelete = () => {
    setShowItemConfirmModal(false);
    setDeletingItemId(null);
  };

  // Handle cancel action in the selected items modal
  const cancelDeleteSelected = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-[#008C38]">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                      No
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Drug name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Purchase Price
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Manufacture Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Expiration Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Quantity in Stock
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Retail Price
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Wholesale Price
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {people.map((person) => (
                    <tr key={person.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <input
                          type="checkbox"
                          checked={selectedItems.has(person.id)}
                          onChange={() => handleSelectItem(person.id)}
                        />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {people.indexOf(person) + 1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.drug_name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.purchase_price}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.manufacture_date}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.expiration_date}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.quantity_in_stock}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.retail_price}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.wholesale_price}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <TrashIcon
                          className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700"
                          onClick={() => openItemConfirmModal(person.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4">
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded"
                  onClick={openConfirmModalForSelected}
                >
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg">
          {successMessage}
        </div>
      )}

      {/* Confirmation Modal for Single Item */}
      <ConfirmationModal
        isVisible={showItemConfirmModal}
        onConfirm={confirmDeleteItem}
        onCancel={cancelDelete}
        message="Are you sure you want to delete this item?"
      />

      {/* Confirmation Modal for Selected Items */}
      <ConfirmationModal
        isVisible={showConfirmModal}
        onConfirm={confirmDeleteSelected}
        onCancel={cancelDeleteSelected}
        message="Are you sure you want to delete the selected items?"
      />
    </div>
  );
}
