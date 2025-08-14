import React, { useState } from 'react';
import Header from './components/Header';
import InvoiceForm from './components/InvoiceForm';
import InvoiceTable from './components/InvoiceTable';
import InvoicePreview from './components/InvoicePreview';
import Footer from './components/Footer';

function App() {
  const [invoiceData, setInvoiceData] = useState({
    companyName: '',
    companyAddress: '',
    customerName: '',
    customerAddress: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    items: [
      { id: 1, name: '', quantity: 1, unitPrice: 0, total: 0 }
    ]
  });

  const [showPreview, setShowPreview] = useState(false);

  const totalAmount = invoiceData.items.reduce((sum, item) => sum + item.total, 0);

  const updateInvoiceData = (field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    };
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (id) => {
    if (invoiceData.items.length > 1) {
      setInvoiceData(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== id)
      }));
    }
  };

  const updateItem = (id, field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const generateInvoice = () => {
    setShowPreview(true);
  };

  const downloadPDF = () => {
    console.log('Downloading PDF...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {!showPreview ? (
          <>
            <InvoiceForm 
              invoiceData={invoiceData}
              updateInvoiceData={updateInvoiceData}
            />
            
            <InvoiceTable 
              items={invoiceData.items}
              addItem={addItem}
              removeItem={removeItem}
              updateItem={updateItem}
            />
            
            <Footer 
              totalAmount={totalAmount}
              onGenerate={generateInvoice}
              onDownload={downloadPDF}
              invoiceData={invoiceData}
            />
          </>
        ) : (
          <InvoicePreview 
            invoiceData={invoiceData}
            totalAmount={totalAmount}
            onBack={() => setShowPreview(false)}
            onDownload={downloadPDF}
          />
        )}
      </main>
    </div>
  );
}

export default App;
