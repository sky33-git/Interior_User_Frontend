import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 text-sm sm:text-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12 text-center sm:text-left">
          {/* Logo & Description */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 mb-4">
              <i className="fas fa-cube text-indigo-400 text-2xl"></i>
              <span className="text-lg sm:text-xl font-bold text-white">
                DesignVerse
              </span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed max-w-xs">
              Transform your ideas into stunning spaces with our AI-powered
              design platform.
            </p>
            <div className="flex space-x-4 justify-center sm:justify-start">
              {["facebook-f", "twitter", "instagram", "linkedin-in"].map(
                (icon) => (
                  <a
                    key={icon}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <i className={`fab fa-${icon}`}></i>
                  </a>
                )
              )}
            </div>
          </div>

          {/* Product */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-white font-semibold mb-4 text-base sm:text-lg">
              Product
            </h3>
            <ul className="space-y-2">
              {[
                "Features",
                "Pricing",
                "Case Studies",
                "Reviews",
                "Updates",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-white font-semibold mb-4 text-base sm:text-lg">
              Company
            </h3>
            <ul className="space-y-2">
              {["About", "Careers", "Blog", "Press", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-white font-semibold mb-4 text-base sm:text-lg">
              Resources
            </h3>
            <ul className="space-y-2">
              {[
                "Documentation",
                "Help Center",
                "Community",
                "Partners",
                "Tutorials",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center text-center md:text-left text-xs sm:text-sm">
            {/* Copyright */}
            <p className="text-gray-500">
              © 2025 DesignVerse. All rights reserved.
            </p>

            {/* Links */}
            <div className="flex justify-center md:justify-start space-x-6">
              {["Terms", "Privacy", "Cookies"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Payment Icons */}
            <div className="flex justify-center md:justify-start space-x-4 text-gray-500 text-lg">
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-paypal"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
