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
    
    // First, try to capture the existing preview element from TemplateSelector
    let existingPreview = document.querySelector('.invoice-content');
    
    // If no preview found, try to find it in the TemplateSelector specifically
    if (!existingPreview) {
      const templateSelector = document.querySelector('[class*="TemplateSelector"]');
      if (templateSelector) {
        existingPreview = templateSelector.querySelector('.invoice-content');
      }
    }
    
    if (existingPreview) {
      console.log('Using existing preview element for PDF generation');
      
      // Use the existing preview element for perfect consistency
      const canvas = await html2canvas(existingPreview, {
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: existingPreview.offsetWidth,
        height: existingPreview.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        logging: false,
        removeContainer: false,
        foreignObjectRendering: true,
        imageTimeout: 0,
        onclone: (clonedDoc) => {
          // Ensure all elements are visible in the cloned document
          const clonedPreview = clonedDoc.querySelector('.invoice-content');
          if (clonedPreview) {
            clonedPreview.style.overflow = 'visible';
            clonedPreview.style.height = 'auto';
            clonedPreview.style.minHeight = '100vh';
            
            // Ensure all child elements are visible
            const allElements = clonedPreview.querySelectorAll('*');
            allElements.forEach(el => {
              el.style.visibility = 'visible';
              el.style.display = el.style.display || 'block';
            });
          }
        }
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
    
    // Create props for the template
    const templateProps = {
      invoiceData,
      totalAmount,
      currency: selectedCurrency,
      formatDate
    };
    
    // Create a temporary container with proper styling
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '800px';
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.padding = '20px';
    tempContainer.style.fontFamily = 'Arial, sans-serif';
    tempContainer.style.fontSize = '14px';
    tempContainer.style.lineHeight = '1.4';
    tempContainer.style.boxSizing = 'border-box';
    tempContainer.style.borderRadius = '8px';
    tempContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    tempContainer.style.textAlign = 'left';
    tempContainer.style.overflow = 'visible';
    tempContainer.style.minHeight = '100vh';
    
    // Add Tailwind CSS classes and ensure proper styling
    tempContainer.className = 'bg-white invoice-content';
    
    // Create a wrapper to ensure proper rendering
    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.minHeight = '100vh';
    tempContainer.appendChild(wrapper);
    
    // Copy all CSS styles to ensure proper rendering
    const copyStyles = () => {
      const styleSheets = Array.from(document.styleSheets);
      styleSheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || sheet.rules || []);
          rules.forEach(rule => {
            if (rule.selectorText) {
              // Ensure all Tailwind classes work properly
              if (rule.selectorText.includes('text-center')) {
                tempContainer.style.setProperty('--tw-text-align', 'center');
              }
              if (rule.selectorText.includes('text-right')) {
                tempContainer.style.setProperty('--tw-text-align', 'right');
              }
              if (rule.selectorText.includes('text-left')) {
                tempContainer.style.setProperty('--tw-text-align', 'left');
              }
              if (rule.selectorText.includes('flex')) {
                tempContainer.style.setProperty('--tw-display', 'flex');
              }
              if (rule.selectorText.includes('justify-center')) {
                tempContainer.style.setProperty('--tw-justify-content', 'center');
              }
              if (rule.selectorText.includes('justify-between')) {
                tempContainer.style.setProperty('--tw-justify-content', 'space-between');
              }
              if (rule.selectorText.includes('items-center')) {
                tempContainer.style.setProperty('--tw-align-items', 'center');
              }
            }
          });
        } catch (e) {
          // Cross-origin stylesheets will throw an error, ignore them
        }
      });
    };
    
    copyStyles();
    document.body.appendChild(tempContainer);
    
    // Render the template
    ReactDOM.render(React.createElement(TemplateComponent, templateProps), wrapper);
    
    // Wait for rendering to complete and CSS to apply
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Additional wait to ensure all elements are properly rendered
    await new Promise(resolve => {
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds max
      
      const checkElements = () => {
        attempts++;
        const totalElement = tempContainer.querySelector('[class*="text-2xl"], [class*="text-xl"]');
        if (totalElement && totalElement.textContent.includes('Total:')) {
          console.log('Total element found:', totalElement.textContent);
          resolve();
        } else if (attempts >= maxAttempts) {
          console.log('Timeout waiting for total element, proceeding anyway');
          resolve();
        } else {
          console.log(`Waiting for total element to render... (attempt ${attempts}/${maxAttempts})`);
          setTimeout(checkElements, 100);
        }
      };
      checkElements();
    });
    
    // Convert to canvas with high quality settings
    const canvas = await html2canvas(tempContainer, {
      scale: 2, // Higher quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 800,
      height: tempContainer.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      logging: false,
      removeContainer: false,
      foreignObjectRendering: true,
      imageTimeout: 0,
      onclone: (clonedDoc) => {
        // Ensure all elements are visible in the cloned document
        const clonedContainer = clonedDoc.querySelector('.invoice-content');
        if (clonedContainer) {
          clonedContainer.style.overflow = 'visible';
          clonedContainer.style.height = 'auto';
          clonedContainer.style.minHeight = '100vh';
          
          // Ensure all child elements are visible
          const allElements = clonedContainer.querySelectorAll('*');
          allElements.forEach(el => {
            el.style.visibility = 'visible';
            el.style.display = el.style.display || 'block';
          });
        }
      }
    });
    
    // Clean up
    ReactDOM.unmountComponentAtNode(wrapper);
    document.body.removeChild(tempContainer);
    
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
    console.log('PDF generated successfully from temporary container');
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Fallback to basic PDF generation
    try {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text('Invoice', 20, 20);
      doc.setFontSize(12);
      doc.text(`Company: ${invoiceData.companyName || 'N/A'}`, 20, 40);
      doc.text(`Customer: ${invoiceData.customerName || 'N/A'}`, 20, 50);
      doc.text(`Total: ${selectedCurrency?.symbol || '$'}${totalAmount.toFixed(2)}`, 20, 70);
      doc.save('invoice.pdf');
      console.log('Fallback PDF generated successfully');
    } catch (fallbackError) {
      console.error('Fallback PDF generation also failed:', fallbackError);
      throw new Error('PDF generation failed completely');
    }
  }
};
