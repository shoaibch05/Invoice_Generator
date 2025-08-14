import React from 'react';

function CurrencySelector({ selectedCurrency, onCurrencyChange }) {
  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Currency Settings</h3>
      <div className="flex items-center space-x-4">
        <label htmlFor="currency" className="text-sm font-medium text-gray-700">
          Select Currency:
        </label>
        <select
          id="currency"
          value={selectedCurrency.code}
          onChange={(e) => {
            const currency = currencies.find(c => c.code === e.target.value);
            onCurrencyChange(currency);
          }}
          className="input-field w-48"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.symbol} - {currency.name} ({currency.code})
            </option>
          ))}
        </select>
        <div className="text-sm text-gray-500">
          Selected: <span className="font-medium">{selectedCurrency.symbol} {selectedCurrency.name}</span>
        </div>
      </div>
    </div>
  );
}

export default CurrencySelector;
