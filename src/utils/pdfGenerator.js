import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ModernTemplate from '../components/invoiceTemplates/ModernTemplate';
import ProfessionalTemplate from '../components/invoiceTemplates/ProfessionalTemplate';
import MinimalistTemplate from '../components/invoiceTemplates/MinimalistTemplate';
import CreativeTemplate from '../components/invoiceTemplates/CreativeTemplate';
import React from 'react';
import ReactDOM from 'react-dom';

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Get the selected template component
const getTemplateComponent = (selectedTemplate) => {
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

// Generate PDF from template
export const generatePDFFromTemplate = async (invoiceData, totalAmount, selectedTemplate, selectedCurrency) => {
  try {
    console.log('Generating PDF with template:', selectedTemplate);

    // First, try to capture the existing preview element
    let existingPreview = document.querySelector('.invoice-content');

    if (!existingPreview) {
      const templateSelector = document.querySelector('[class*="TemplateSelector"]');
      if (templateSelector) {
        existingPreview = templateSelector.querySelector('.invoice-content');
      }
    }

    if (existingPreview) {
      console.log('Using existing preview element for PDF generation');

      // 🔑 Fix: force stable width + block layout before capture
      existingPreview.style.width = "800px";
      existingPreview.style.maxWidth = "800px";
      existingPreview.style.overflow = "hidden";
      existingPreview.style.display = "block";

      // Wait until fonts are loaded (prevents text shift)
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      const canvas = await html2canvas(existingPreview, {
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        removeContainer: true,   // cleanup after capture
        windowWidth: existingPreview.scrollWidth,
        windowHeight: existingPreview.scrollHeight
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save('invoice.pdf');
      console.log('PDF generated successfully from existing preview');
      return;
    }

    console.log('No existing preview found, creating temporary container');

    // Fallback: Create a temporary container if no preview exists
    const TemplateComponent = getTemplateComponent(selectedTemplate);

    const templateProps = {
      invoiceData,
      totalAmount,
      currency: selectedCurrency,
      formatDate
    };

    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '800px';
    tempContainer.className = 'bg-white invoice-content';

    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    tempContainer.appendChild(wrapper);

    document.body.appendChild(tempContainer);

    ReactDOM.render(React.createElement(TemplateComponent, templateProps), wrapper);

    await new Promise(resolve => setTimeout(resolve, 500));

    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      removeContainer: true,
      windowWidth: 800,
      windowHeight: tempContainer.scrollHeight
    });

    ReactDOM.unmountComponentAtNode(wrapper);
    document.body.removeChild(tempContainer);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('invoice.pdf');
    console.log('PDF generated successfully from temporary container');

  } catch (error) {
    console.error('Error generating PDF:', error);
    try {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text('Invoice', 20, 20);
      doc.setFontSize(12);
      doc.text(`Company: ${invoiceData.companyName || 'N/A'}`, 20, 40);
      doc.text(`Customer: ${invoiceData.customerName || 'N/A'}`, 20, 50);
      doc.text(`Total: ${selectedCurrency?.symbol || '$'}${totalAmount.toFixed(2)}`, 20, 70);
      doc.save('invoice.pdf');
    } catch (fallbackError) {
      console.error('Fallback PDF generation also failed:', fallbackError);
    }
  }
};
