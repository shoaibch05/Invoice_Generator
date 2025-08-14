import React from 'react';
import ModernTemplate from './invoiceTemplates/ModernTemplate';
import ProfessionalTemplate from './invoiceTemplates/ProfessionalTemplate';
import MinimalistTemplate from './invoiceTemplates/MinimalistTemplate';
import CreativeTemplate from './invoiceTemplates/CreativeTemplate';

function TemplateSelector({ selectedTemplate, onTemplateSelect, invoiceData, totalAmount, currency, formatDate }) {
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      component: ModernTemplate,
      thumbnail: (
        <div className="w-full h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
          Modern
        </div>
      )
    },
    {
      id: 'professional',
      name: 'Professional',
      component: ProfessionalTemplate,
      thumbnail: (
        <div className="w-full h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center text-white font-bold text-sm">
          Professional
        </div>
      )
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      component: MinimalistTemplate,
      thumbnail: (
        <div className="w-full h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-gray-700 font-bold text-sm border border-gray-300">
          Minimalist
        </div>
      )
    },
    {
      id: 'creative',
      name: 'Creative',
      component: CreativeTemplate,
      thumbnail: (
        <div className="w-full h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
          Creative
        </div>
      )
    }
  ];

  const SelectedTemplateComponent = templates.find(t => t.id === selectedTemplate)?.component || ModernTemplate;

  return (
    <div className="space-y-6">
      {/* Template Thumbnails */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Invoice Design</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => onTemplateSelect(template.id)}
              className={`cursor-pointer transition-all duration-200 ${
                selectedTemplate === template.id
                  ? 'ring-2 ring-blue-500 ring-offset-2 scale-105'
                  : 'hover:scale-105 hover:shadow-md'
              }`}
            >
              {template.thumbnail}
              <div className={`text-center mt-2 text-sm font-medium ${
                selectedTemplate === template.id ? 'text-blue-600' : 'text-gray-600'
              }`}>
                {template.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
        <div className="border border-gray-200 rounded-lg overflow-hidden invoice-content">
          <SelectedTemplateComponent
            invoiceData={invoiceData}
            totalAmount={totalAmount}
            currency={currency}
            formatDate={formatDate}
          />
        </div>
      </div>
    </div>
  );
}

export default TemplateSelector;
