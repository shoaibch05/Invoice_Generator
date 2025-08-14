# Invoice Generator

A responsive, single-page Invoice Generator web application built with React and TailwindCSS.

## Features

- **Clean, Modern UI**: Professional design following modern UI/UX principles
- **Responsive Design**: Fully mobile-responsive layout
- **Dynamic Invoice Items**: Add/remove multiple invoice items with automatic total calculation
- **Real-time Updates**: Auto-calculates totals when quantity or unit price changes
- **Invoice Preview**: Professional invoice preview with print-friendly layout
- **PDF Export**: Download invoices as PDF using jsPDF
- **Print Support**: Print invoices directly from the browser

## Technology Stack

- **Frontend**: React 18 with functional components and hooks
- **Styling**: TailwindCSS for responsive design
- **PDF Generation**: jsPDF with autoTable plugin
- **Build Tool**: Create React App

## Project Structure

```
src/
├── components/
│   ├── Header.js          # App header with title and description
│   ├── InvoiceForm.js     # Company and customer information form
│   ├── InvoiceTable.js    # Dynamic invoice items table
│   ├── InvoicePreview.js  # Invoice preview and print layout
│   └── Footer.js          # Total amount and action buttons
├── App.js                 # Main application component
├── index.js               # React entry point
└── index.css              # TailwindCSS styles and custom components
```

## Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

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

3. **Add Invoice Items**:
   - Click "Add Item" to add new items
   - Enter item name, quantity, and unit price
   - Totals are calculated automatically
   - Remove items using the "Remove" button

4. **Generate Invoice**:
   - Click "Generate Invoice" to preview
   - Use "Print" button to print the invoice
   - Click "Download PDF" to save as PDF

### Features

- **Auto-calculation**: Item totals and invoice total are calculated automatically
- **Dynamic Items**: Add or remove invoice items as needed
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Print-friendly**: Optimized layout for printing
- **PDF Export**: Professional PDF output with proper formatting

## Customization

### Adding New Fields

The component structure is designed to be easily extensible. To add new fields:

1. **Update the state** in `App.js`
2. **Add form fields** in the appropriate component
3. **Update the preview** in `InvoicePreview.js`
4. **Modify PDF generation** in `Footer.js`

### Styling

- **TailwindCSS Classes**: Use Tailwind utility classes for styling
- **Custom Components**: Add new component classes in `src/index.css`
- **Theme Colors**: Modify the primary color scheme in `tailwind.config.js`

## Future Enhancements

- **E-Signature Support**: Add digital signature fields
- **Invoice Templates**: Multiple invoice design templates
- **Data Persistence**: Save invoices locally or to cloud storage
- **Invoice History**: Track and manage previous invoices
- **Tax Calculation**: Automatic tax calculation and display
- **Currency Support**: Multiple currency options
- **Email Integration**: Send invoices directly via email

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

