import React from 'react';

function InvoiceTable({ items, addItem, removeItem, updateItem, currency }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Invoice Items</h2>
        <button
          onClick={addItem}
          className="btn-primary"
        >
          Add Item
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Item Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Quantity</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Unit Price</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Total</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    className="input-field"
                    placeholder="Enter item name"
                  />
                </td>
                <td className="py-3 px-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                    className="input-field w-20"
                  />
                </td>
                <td className="py-3 px-4">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    className="input-field w-24"
                  />
                </td>
                <td className="py-3 px-4">
                  <span className="font-medium text-gray-900">
                    {currency?.symbol || '$'}{item.total.toFixed(2)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => removeItem(item.id)}
                    disabled={items.length === 1}
                    className="text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {items.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No items added yet. Click "Add Item" to get started.
        </div>
      )}
    </div>
  );
}

export default InvoiceTable;

