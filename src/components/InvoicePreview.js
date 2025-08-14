import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ModernTemplate from './invoiceTemplates/ModernTemplate';
import ProfessionalTemplate from './invoiceTemplates/ProfessionalTemplate';
import MinimalistTemplate from './invoiceTemplates/MinimalistTemplate';
import CreativeTemplate from './invoiceTemplates/CreativeTemplate';

function InvoicePreview({ invoiceData, totalAmount, onBack, onDownload, selectedTemplate, selectedCurrency }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get the selected template component
  const getTemplateComponent = () => {
    switch (selectedTemplate) {
      case 'modern':
        return ModernTemplate;
      case 'professional':
        return ProfessionalTemplate;
      case 'minimalist':
        return MinimalistTemplate;
      case 'creative':
        return CreativeTemplate;
      default:
        return ModernTemplate;
    }
  };

  const SelectedTemplateComponent = getTemplateComponent();

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
      <div className="invoice-content">
        <SelectedTemplateComponent
          invoiceData={invoiceData}
          totalAmount={totalAmount}
          currency={selectedCurrency}
          formatDate={formatDate}
        />
      </div>
    </div>
  );
}

export default InvoicePreview;
