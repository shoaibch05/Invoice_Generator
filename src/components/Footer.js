import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ModernTemplate from './invoiceTemplates/ModernTemplate';
import ProfessionalTemplate from './invoiceTemplates/ProfessionalTemplate';
import MinimalistTemplate from './invoiceTemplates/MinimalistTemplate';
import CreativeTemplate from './invoiceTemplates/CreativeTemplate';

function Footer({ totalAmount, onGenerate, onDownload, invoiceData, selectedTemplate, selectedCurrency }) {
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
        `${selectedCurrency?.symbol || '$'}${item.unitPrice.toFixed(2)}`,
        `${selectedCurrency?.symbol || '$'}${item.total.toFixed(2)}`
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
    doc.text(`Total: ${selectedCurrency?.symbol || '$'}${totalAmount.toFixed(2)}`, 150, finalY);
    
    // Add footer
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Thank you for your business!', 105, finalY + 20, { align: 'center' });
    
    // Save the PDF
    doc.save('invoice.pdf');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            Total Amount: <span className="text-primary-600">{selectedCurrency?.symbol || '$'}{totalAmount.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={onGenerate}
            className="btn-primary"
          >
            Generate Invoice
          </button>
          
          <button
            onClick={generatePDF}
            className="btn-secondary"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
