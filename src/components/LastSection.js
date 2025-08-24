

function LastSection() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
      <div className="container mx-auto px-6 text-center">
        {/* Brand / Logo */}
        <h2 className="text-xl font-bold text-white mb-3">
          InvoiceGen
        </h2>

        {/* Tagline */}
        <p className="text-sm text-gray-400 mb-6">
          Create professional invoices instantly — simple, fast, and free.
        </p>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Section */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} InvoiceGen. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default LastSection;
