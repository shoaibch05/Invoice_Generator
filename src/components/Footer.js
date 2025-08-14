import React, { useState } from 'react';
import { generatePDFFromTemplate } from '../utils/pdfGenerator';

function Footer({ totalAmount, onGenerate, onDownload, invoiceData, selectedTemplate, selectedCurrency }) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

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
            onClick={handleGeneratePDF}
            disabled={isGeneratingPDF}
            className={`btn-secondary ${isGeneratingPDF ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
