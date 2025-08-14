import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function InvoicePreview({ invoiceData, totalAmount, onBack, onDownload }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Set initial position
    let yPosition = 20;
    
    // Add company information
    if (invoiceData.companyName) {
      doc.setFontSize(24);
      doc.setFont(undefined, 'bold');
      doc.text('INVOICE', 20, yPosition);
      yPosition += 15;
      
      doc.setFontSize(14);
      doc.setFont(undefined, 'normal');
      doc.text(invoiceData.companyName, 20, yPosition);
      yPosition += 10;
      
      if (invoiceData.companyAddress) {
        const addressLines = invoiceData.companyAddress.split('\n');
        addressLines.forEach((line, index) => {
          if (line.trim()) {
            doc.text(line.trim(), 20, yPosition);
            yPosition += 6;
          }
        });
      }
    }
    
    // Add invoice date on the right side
    if (invoiceData.invoiceDate) {
      const date = new Date(invoiceData.invoiceDate);
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      doc.setFontSize(12);
      doc.text(`Invoice Date: ${formattedDate}`, 120, 35);
    }
    
    yPosition += 15;
    
    // Add customer information
    if (invoiceData.customerName || invoiceData.customerAddress) {
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text('Bill To:', 20, yPosition);
      yPosition += 10;
      
      if (invoiceData.customerName) {
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text(invoiceData.customerName, 20, yPosition);
        yPosition += 8;
      }
      
      if (invoiceData.customerAddress) {
        const addressLines = invoiceData.customerAddress.split('\n');
        addressLines.forEach((line, index) => {
          if (line.trim()) {
            doc.text(line.trim(), 20, yPosition);
            yPosition += 6;
          }
        });
      }
    }
    
    yPosition += 15;
    
    // Add items table with better formatting
    if (invoiceData.items && invoiceData.items.length > 0) {
      const tableData = invoiceData.items.map(item => [
        item.name || 'Item',
        item.quantity.toString(),
        `$${item.unitPrice.toFixed(2)}`,
        `$${item.total.toFixed(2)}`
      ]);
      
      doc.autoTable({
        startY: yPosition,
        head: [['Item', 'Quantity', 'Unit Price', 'Total']],
        body: tableData,
        theme: 'grid',
        headStyles: { 
          fillColor: [59, 130, 246],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 11,
          cellPadding: 5
        },
        columnStyles: {
          0: { cellWidth: 80 }, // Item name
          1: { halign: 'center', cellWidth: 30 }, // Quantity
          2: { halign: 'right', cellWidth: 35 }, // Unit Price
          3: { halign: 'right', cellWidth: 35 }  // Total
        },
        margin: { top: 10 }
      });
    }
    
    // Add total with better formatting
    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text(`Total: $${totalAmount.toFixed(2)}`, 150, finalY);
    
    // Add footer
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Thank you for your business!', 105, finalY + 20, { align: 'center' });
    
    // Save the PDF
    doc.save('invoice.pdf');
  };

  const handlePrint = () => {
    // Create a new window for printing only the invoice content
    const printWindow = window.open('', '_blank');
    const printContent = document.querySelector('.invoice-content');
    
    if (printWindow && printContent) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Invoice</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                margin: 0; 
                padding: 20px; 
                background: white;
              }
              .invoice-content { 
                max-width: 800px; 
                margin: 0 auto; 
                background: white; 
                padding: 20px;
              }
              table { 
                width: 100%; 
                border-collapse: collapse; 
                margin: 20px 0;
              }
              th, td { 
                padding: 12px; 
                text-align: left; 
                border-bottom: 1px solid #ddd;
              }
              th { 
                background-color: #f8f9fa; 
                font-weight: bold;
              }
              .total { 
                text-align: right; 
                font-size: 18px; 
                font-weight: bold; 
                margin-top: 20px;
              }
              .footer { 
                text-align: center; 
                margin-top: 40px; 
                color: #666;
              }
              @media print {
                body { margin: 0; }
                .invoice-content { padding: 0; }
              }
            </style>
          </head>
          <body>
            ${printContent.outerHTML}
          </body>
        </html>
      `);
      
      printWindow.document.close();
      printWindow.focus();
      
      // Wait for content to load then print
      printWindow.onload = function() {
        printWindow.print();
        printWindow.close();
      };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex justify-between items-center print-hide">
        <button
          onClick={onBack}
          className="btn-secondary"
        >
          ← Back to Edit
        </button>
        
        <div className="flex space-x-3">
          <button
            onClick={generatePDF}
            className="btn-primary"
          >
            Download PDF
          </button>
          <button
            onClick={handlePrint}
            className="btn-secondary"
          >
            Print
          </button>
        </div>
      </div>

      {/* Invoice Preview - This is what gets printed */}
      <div className="invoice-content bg-white rounded-lg shadow-lg border border-gray-200 p-8 print:shadow-none print:border-0">
        {/* Invoice Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
            {invoiceData.companyName && (
              <div className="text-lg font-semibold text-gray-800">{invoiceData.companyName}</div>
            )}
            {invoiceData.companyAddress && (
              <div className="text-gray-600 whitespace-pre-line">{invoiceData.companyAddress}</div>
            )}
          </div>
          
          <div className="text-right mt-4 md:mt-0">
            <div className="text-sm text-gray-500 mb-1">Invoice Date:</div>
            <div className="font-medium text-gray-900">{formatDate(invoiceData.invoiceDate)}</div>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Bill To:</h3>
          {invoiceData.customerName && (
            <div className="font-medium text-gray-900">{invoiceData.customerName}</div>
          )}
          {invoiceData.customerAddress && (
            <div className="text-gray-600 whitespace-pre-line">{invoiceData.customerAddress}</div>
          )}
        </div>

        {/* Invoice Items Table */}
        <div className="mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Item</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-800">Quantity</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-800">Unit Price</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-800">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-900">{item.name || `Item ${index + 1}`}</td>
                  <td className="py-3 px-4 text-right text-gray-900">{item.quantity}</td>
                  <td className="py-3 px-4 text-right text-gray-900">${item.unitPrice.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Amount */}
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            Total: <span className="text-primary-600">${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          Thank you for your business!
        </div>
      </div>
    </div>
  );
}

export default InvoicePreview;
