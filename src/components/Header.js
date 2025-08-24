
import logo from "../assets/logo.png";

function Header({ onCreateInvoice }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      {/* Top branding */}
      <div className="container mx-auto px-6 py-4 flex items-center justify-center gap-3">
        <img src={logo} alt="InvoiceGen Logo" className="h-10 w-10" />
        <h1 className="text-2xl font-bold text-indigo-600">InvoiceGen</h1>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-5xl font-extrabold mb-6 leading-tight">
              Create Beautiful Invoices Instantly
            </h2>
            <p className="text-lg md:text-xl text-gray-100 mb-8">
              Choose from multiple templates, add your details, and download a
              professional invoice in seconds — all free, no signup required.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
                onClick={onCreateInvoice}
              >
                Create Invoice
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
