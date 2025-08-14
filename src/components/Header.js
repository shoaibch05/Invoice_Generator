import React from 'react';

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Invoice Generator
          </h1>
          <p className="text-gray-600 text-lg">
            Create professional invoices easily with our simple and intuitive tool
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;

