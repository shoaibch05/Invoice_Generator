import React from 'react';

function MinimalistTemplate({ invoiceData, totalAmount, currency, formatDate }) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 pb-8 border-b border-gray-200">
        <h1 className="text-5xl font-light text-gray-800 mb-4">INVOICE</h1>
        {invoiceData.companyName && (
          <div className="text-lg text-gray-600 mb-2">{invoiceData.companyName}</div>
        )}
        {invoiceData.companyAddress && (
          <div className="text-sm text-gray-500 whitespace-pre-line">{invoiceData.companyAddress}</div>
        )}
        <div className="mt-6 text-sm text-gray-500">
          Invoice Date: {formatDate(invoiceData.invoiceDate)}
        </div>
      </div>

      {/* Bill To Section */}
      <div className="mb-12">
        <h3 className="text-lg font-medium text-gray-800 mb-4 uppercase tracking-wide">
          Bill To
        </h3>
        <div className="pl-4 border-l-2 border-gray-300">
          {invoiceData.customerName && (
            <div className="text-lg text-gray-900 mb-1">{invoiceData.customerName}</div>
          )}
          {invoiceData.customerAddress && (
            <div className="text-gray-600 whitespace-pre-line">{invoiceData.customerAddress}</div>
          )}
        </div>
      </div>

      {/* Invoice Items Table */}
      <div className="mb-12">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-4 px-2 font-medium text-gray-800">Item</th>
              <th className="text-center py-4 px-2 font-medium text-gray-800">Qty</th>
              <th className="text-right py-4 px-2 font-medium text-gray-800">Price</th>
              <th className="text-right py-4 px-2 font-medium text-gray-800">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-4 px-2 text-gray-900">{item.name || `Item ${index + 1}`}</td>
                <td className="py-4 px-2 text-center text-gray-900">{item.quantity}</td>
                <td className="py-4 px-2 text-right text-gray-900">{currency.symbol}{item.unitPrice.toFixed(2)}</td>
                <td className="py-4 px-2 text-right font-medium text-gray-900">{currency.symbol}{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Amount */}
      <div className="text-right mb-12">
        <div className="inline-block">
          <div className="text-3xl font-light text-gray-800">
            Total: {currency.symbol}{totalAmount.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-gray-400 text-sm">
        Thank you for your business
      </div>
    </div>
  );
}

export default MinimalistTemplate;
