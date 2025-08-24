import React, { useState } from 'react';
import { generatePDFFromTemplate } from '../utils/pdfGenerator';

function Footer({ totalAmount, invoiceData, selectedTemplate, selectedCurrency }) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    if (isGeneratingPDF) return;
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
      <div className="flex justify-end items-center">
        <button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
          className={`btn-secondary ${isGeneratingPDF ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
        </button>
      </div>
    </div>
  );
}

export default Footer;
