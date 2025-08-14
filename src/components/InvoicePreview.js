import React, { useState } from 'react';
import { generatePDFFromTemplate } from '../utils/pdfGenerator';
import ModernTemplate from './invoiceTemplates/ModernTemplate';
import ProfessionalTemplate from './invoiceTemplates/ProfessionalTemplate';
import MinimalistTemplate from './invoiceTemplates/MinimalistTemplate';
import CreativeTemplate from './invoiceTemplates/CreativeTemplate';

function InvoicePreview({ invoiceData, totalAmount, onBack, onDownload, selectedTemplate, selectedCurrency }) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

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

  const handleGeneratePDF = async () => {
    if (isGeneratingPDF) return; // Prevent multiple clicks
    
    setIsGeneratingPDF(true);
    try {
      await generatePDFFromTemplate(invoiceData, totalAmount, selectedTemplate, selectedCurrency);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
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
            onClick={handleGeneratePDF}
            disabled={isGeneratingPDF}
            className={`btn-primary ${isGeneratingPDF ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
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
