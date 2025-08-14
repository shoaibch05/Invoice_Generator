import React from 'react';

function ModernTemplate({ invoiceData, totalAmount, currency, formatDate }) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 pb-6 border-b-2 border-blue-600">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">INVOICE</h1>
          {invoiceData.companyName && (
            <div className="text-xl font-semibold text-gray-800 mb-1">{invoiceData.companyName}</div>
          )}
          {invoiceData.companyAddress && (
            <div className="text-gray-600 whitespace-pre-line text-sm">{invoiceData.companyAddress}</div>
          )}
        </div>
        
        <div className="text-right mt-4 md:mt-0">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Invoice Date:</div>
            <div className="font-semibold text-gray-900">{formatDate(invoiceData.invoiceDate)}</div>
          </div>
        </div>
      </div>

      {/* Bill To Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mr-3">Bill To:</span>
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg">
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
            <tr className="bg-blue-600 text-white">
              <th className="text-left py-4 px-6 font-semibold rounded-l-lg">Item</th>
              <th className="text-center py-4 px-6 font-semibold">Quantity</th>
              <th className="text-right py-4 px-6 font-semibold">Unit Price</th>
              <th className="text-right py-4 px-6 font-semibold rounded-r-lg">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={item.id} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
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
        <div className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg">
          <div className="text-2xl font-bold">
            Total: {currency.symbol}{totalAmount.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 pt-6 border-t border-gray-200 text-center">
        <div className="text-gray-500 text-sm mb-2">Thank you for your business!</div>
        <div className="text-xs text-gray-400">This invoice was generated using Invoice Generator</div>
      </div>
    </div>
  );
}

export default ModernTemplate;
