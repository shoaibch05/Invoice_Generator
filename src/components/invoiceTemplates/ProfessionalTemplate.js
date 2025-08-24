import React from 'react';

function ProfessionalTemplate({ invoiceData, totalAmount, currency, formatDate }) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-8 max-w-4xl mx-auto">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">INVOICE</h1>
            {invoiceData.companyName && (
              <div className="text-lg font-medium opacity-90">{invoiceData.companyName}</div>
            )}
            {invoiceData.companyAddress && (
              <div className="text-sm opacity-75 whitespace-pre-line mt-1">{invoiceData.companyAddress}</div>
            )}
          </div>
          
          <div className="text-right mt-4 md:mt-0">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <div className="text-sm opacity-75 mb-1">Invoice Date:</div>
              <div className="font-semibold">{formatDate(invoiceData.invoiceDate)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bill To Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-l-4 border-gray-800 pl-3">
          Bill To:
        </h3>
        <div className="border border-gray-200 p-4 rounded-lg">
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
            <tr className="bg-gray-100 border-b-2 border-gray-300">
              <th className="text-left py-3 px-4 font-semibold text-gray-800">Item</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-800">Quantity</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-800">Unit Price</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-800">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900">{item.name || `Item ${index + 1}`}</td>
                <td className="py-3 px-4 text-center text-gray-900">{item.quantity}</td>
                <td className="py-3 px-4 text-right text-gray-900">{currency.symbol}{item.unitPrice.toFixed(2)}</td>
                <td className="py-3 px-4 text-right font-semibold text-gray-900">{currency.symbol}{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Amount */}
      <div className="text-right">
        <div className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg">
          <div className=" relative z-10 pb-3 text-xl font-bold">
            Total: {currency.symbol}{totalAmount.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 pt-6 border-t border-gray-300 text-center">
        <div className="text-gray-600 text-sm mb-2">Thank you for your business!</div>
        <div className="text-xs text-gray-400">Professional invoice generated with Invoice Generator</div>
      </div>
    </div>
  );
}

export default ProfessionalTemplate;
