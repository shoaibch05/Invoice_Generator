import React from 'react';

function InvoiceForm({ invoiceData, updateInvoiceData }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Invoice Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
            Company Information
          </h3>
          
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              value={invoiceData.companyName}
              onChange={(e) => updateInvoiceData('companyName', e.target.value)}
              className="input-field"
              placeholder="Enter company name"
            />
          </div>
          
          <div>
            <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700 mb-2">
              Company Address
            </label>
            <textarea
              id="companyAddress"
              value={invoiceData.companyAddress}
              onChange={(e) => updateInvoiceData('companyAddress', e.target.value)}
              className="textarea-field"
              rows="3"
              placeholder="Enter company address"
            />
          </div>
        </div>
        
        {/* Customer Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
            Customer Information
          </h3>
          
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
              Customer Name
            </label>
            <input
              type="text"
              id="customerName"
              value={invoiceData.customerName}
              onChange={(e) => updateInvoiceData('customerName', e.target.value)}
              className="input-field"
              placeholder="Enter customer name"
            />
          </div>
          
          <div>
            <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700 mb-2">
              Customer Address
            </label>
            <textarea
              id="customerAddress"
              value={invoiceData.customerAddress}
              onChange={(e) => updateInvoiceData('customerAddress', e.target.value)}
              className="textarea-field"
              rows="3"
              placeholder="Enter customer address"
            />
          </div>
          
          <div>
            <label htmlFor="invoiceDate" className="block text-sm font-medium text-gray-700 mb-2">
              Invoice Date
            </label>
            <input
              type="date"
              id="invoiceDate"
              value={invoiceData.invoiceDate}
              onChange={(e) => updateInvoiceData('invoiceDate', e.target.value)}
              className="input-field"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceForm;

