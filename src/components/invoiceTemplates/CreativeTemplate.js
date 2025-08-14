import React from 'react';

function CreativeTemplate({ invoiceData, totalAmount, currency, formatDate }) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 max-w-4xl mx-auto">
      {/* Header with colorful gradient */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">INVOICE</h1>
            {invoiceData.companyName && (
              <div className="text-lg font-medium opacity-90">{invoiceData.companyName}</div>
            )}
            {invoiceData.companyAddress && (
              <div className="text-sm opacity-75 whitespace-pre-line mt-1">{invoiceData.companyAddress}</div>
            )}
          </div>
          
          <div className="text-right mt-4 md:mt-0">
            <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-sm opacity-75 mb-1">Invoice Date:</div>
              <div className="font-semibold">{formatDate(invoiceData.invoiceDate)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bill To Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm mr-3">Bill To:</span>
        </h3>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-500">
          {invoiceData.customerName && (
            <div className="font-semibold text-gray-900 text-lg mb-1">{invoiceData.customerName}</div>
          )}
          {invoiceData.customerAddress && (
            <div className="text-gray-600 whitespace-pre-line">{invoiceData.customerAddress}</div>
          )}
        </div>
      </div>

      {/* Invoice Items Table */}
      <div className="mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <th className="text-left py-4 px-6 font-semibold rounded-l-lg">Item</th>
              <th className="text-center py-4 px-6 font-semibold">Quantity</th>
              <th className="text-right py-4 px-6 font-semibold">Unit Price</th>
              <th className="text-right py-4 px-6 font-semibold rounded-r-lg">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={item.id} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-purple-50' : 'bg-pink-50'}`}>
                <td className="py-4 px-6 text-gray-900 font-medium">{item.name || `Item ${index + 1}`}</td>
                <td className="py-4 px-6 text-center text-gray-900">{item.quantity}</td>
                <td className="py-4 px-6 text-right text-gray-900">{currency.symbol}{item.unitPrice.toFixed(2)}</td>
                <td className="py-4 px-6 text-right font-semibold text-gray-900">{currency.symbol}{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Amount */}
      <div className="text-right">
        <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg shadow-lg">
          <div className="text-2xl font-bold">
            Total: {currency.symbol}{totalAmount.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 pt-6 border-t border-gray-200 text-center">
        <div className="text-gray-500 text-sm mb-2">Thank you for your business!</div>
        <div className="text-xs text-gray-400">Creative invoice generated with Invoice Generator</div>
      </div>
    </div>
  );
}

export default CreativeTemplate;
