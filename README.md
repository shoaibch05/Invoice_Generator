# Invoice Generator

A responsive, single-page Invoice Generator web application built with React and TailwindCSS.

## ✨ Features

- **Multiple Invoice Designs**: 4 professional invoice templates to choose from
  - Modern (Blue theme with clean layout)
  - Professional (Gray gradient with corporate style)
  - Minimalist (Clean and elegant design)
  - Creative (Colorful gradient design)
- **Template Thumbnails**: Visual preview and selection of invoice designs
- **Currency Support**: 6 different currencies with instant symbol updates
  - USD ($), EUR (€), GBP (£), INR (₹), PKR (₨), AUD (A$)
- **Live Preview**: Real-time preview of selected template with your data
- **Dynamic Invoice Items**: Add/remove multiple invoice items with automatic total calculation
- **Real-time Updates**: Auto-calculates totals when quantity or unit price changes
- **Professional PDF Export**: Download invoices as PDF with exact template formatting
- **Print Support**: Print invoices directly from the browser with clean layout
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🎨 Invoice Templates

### 1. Modern Template
- Blue color scheme with clean, modern layout
- Professional typography and spacing
- Ideal for tech companies and startups

### 2. Professional Template
- Gray gradient header with corporate styling
- Traditional business layout
- Perfect for established companies

### 3. Minimalist Template
- Clean, elegant design with minimal elements
- Centered layout with light typography
- Great for creative agencies and freelancers

### 4. Creative Template
- Colorful gradient design with vibrant colors
- Modern styling with rounded elements
- Perfect for creative businesses and events

## 💱 Supported Currencies

- **USD** ($) - US Dollar
- **EUR** (€) - Euro
- **GBP** (£) - British Pound
- **INR** (₹) - Indian Rupee
- **PKR** (₨) - Pakistani Rupee
- **AUD** (A$) - Australian Dollar

## Technology Stack

- **Frontend**: React 18 with functional components and hooks
- **Styling**: TailwindCSS for responsive design
- **PDF Generation**: jsPDF with autoTable plugin
- **Build Tool**: Create React App

## Project Structure

```
src/
├── components/
│   ├── invoiceTemplates/
│   │   ├── ModernTemplate.js      # Modern blue theme
│   │   ├── ProfessionalTemplate.js # Professional gray theme
│   │   ├── MinimalistTemplate.js  # Minimalist clean design
│   │   └── CreativeTemplate.js    # Creative colorful design
│   ├── Header.js                  # App header with title
│   ├── InvoiceForm.js             # Company and customer form
│   ├── InvoiceTable.js            # Dynamic invoice items table
│   ├── InvoicePreview.js          # Invoice preview and print
│   ├── Footer.js                  # Total amount and actions
│   ├── TemplateSelector.js        # Template thumbnails and preview
│   └── CurrencySelector.js        # Currency dropdown
├── App.js                         # Main application component
├── index.js                       # React entry point
└── index.css                      # TailwindCSS styles
```

## Installation

1. **Clone the repository** or navigate to the project directory

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Usage

### Creating an Invoice

1. **Fill in Company Information**:
   - Company name
   - Company address

2. **Fill in Customer Information**:
   - Customer name
   - Customer address
   - Invoice date

3. **Select Currency**:
   - Choose from 6 supported currencies
   - Currency symbols update instantly across the invoice

4. **Choose Invoice Design**:
   - Click on template thumbnails to preview different designs
   - Live preview updates in real-time with your data

5. **Add Invoice Items**:
   - Click "Add Item" to add new items
   - Enter item name, quantity, and unit price
   - Totals are calculated automatically with selected currency
   - Remove items using the "Remove" button

6. **Generate Invoice**:
   - Click "Generate Invoice" to preview
   - Use "Print" button to print the invoice
   - Click "Download PDF" to save as PDF

### Features

- **Template Selection**: Choose from 4 professional designs
- **Currency Switching**: Change currency and see instant updates
- **Auto-calculation**: Item totals and invoice total calculated automatically
- **Dynamic Items**: Add or remove invoice items as needed
- **Responsive Design**: Works seamlessly on all devices
- **Print-friendly**: Optimized layout for printing
- **PDF Export**: Professional PDF output with exact template formatting

## Customization

### Adding New Templates

1. **Create new template file** in `src/components/invoiceTemplates/`
2. **Add template to TemplateSelector** component
3. **Update template selection logic** in App.js
4. **Test PDF generation** and print functionality

### Adding New Currencies

1. **Add currency to CurrencySelector** component
2. **Update currency symbols** in all templates
3. **Test currency switching** functionality

### Styling

- **TailwindCSS Classes**: Use Tailwind utility classes for styling
- **Template Components**: Each template is a separate component for easy customization
- **Theme Colors**: Modify color schemes in individual template files

## Future Enhancements

- **E-Signature Support**: Add digital signature fields
- **Invoice Numbering**: Automatic invoice number generation
- **Data Persistence**: Save invoices locally or to cloud storage
- **Invoice History**: Track and manage previous invoices
- **Tax Calculation**: Automatic tax calculation and display
- **Email Integration**: Send invoices directly via email
- **More Templates**: Additional invoice design options
- **Custom Branding**: Upload company logos and custom colors

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please open an issue in the repository.

