import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Image, Layers, PlusCircle } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  const navLinks = [
    { name: "Home", to: "/", icon: <Home size={20} /> },
    { name: "Features", to: "/feature", icon: <Layers size={20} /> },
    { name: "Ai Tool", to: "/search-ai", icon: <PlusCircle size={20} /> },
    {
      name: "Idea's",
      to: "/pros",
      icon: <Image size={20} />,
      dropdown: true,
      children: [
        { name: "Electricians", to: "/pros/electricians" },
        { name: "Carpenters", to: "/pros/carpenters" },
        { name: "Painters", to: "/pros/painters" },
        { name: "Interior Designers", to: "/pros/interior-designers" },
        { name: "Architects", to: "/pros/architects" },
        { name: "Contractors", to: "/pros/contractors" },
        {
          name: "Modular Kitchen Experts",
          to: "/pros/modular-kitchen-experts",
        },
      ],
    },
    {
      name: "Find Pros",
      to: "/design-ideas",
      icon: <Image size={20} />,
      dropdown: true,
      children: [
        { name: "Plumbers", to: "/pros/plumbers" },
        { name: "Roofers", to: "/pros/roofers" },
        { name: "Flooring Specialists", to: "/pros/flooring-specialists" },
        { name: "Landscape Designers", to: "/pros/landscape-designers" },
        { name: "HVAC Technicians", to: "/pros/hvac-technicians" },
      ],
    },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <header className="bg-white shadow-sm relative z-50 hidden md:block">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-indigo-600">
              Interior 5D
            </div>
            <nav className="ml-10 flex items-center space-x-10">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    className="relative"
                    key={link.name}
                    onMouseEnter={() => setOpenDropdown(link.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      to={link.to}
                      className={`px-3 py-2 text-md font-medium flex items-center gap-1 ${
                        location.pathname === link.to
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-gray-500 hover:text-indigo-600"
                      }`}
                    >
                      {link.name} {openDropdown === link.name ? "▴" : "▾"}
                    </Link>
                    {openDropdown === link.name && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-lg p-4 rounded-md flex gap-8 z-50">
                        {[
                          ...Array(Math.ceil(link.children.length / 10)).keys(),
                        ].map((col) => (
                          <div key={col} className="flex flex-col items-center">
                            {link.children
                              .slice(col * 10, (col + 1) * 10)
                              .map((child) => (
                                <Link
                                  key={child.name}
                                  to={child.to}
                                  className={`w-40 text-sm py-1 text-start ${
                                    location.pathname === child.to
                                      ? "text-indigo-600 font-semibold"
                                      : "text-gray-700 hover:font-semibold hover:text-indigo-600"
                                  }`}
                                >
                                  {child.name}
                                </Link>
                              ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    to={link.to}
                    className={`px-3 py-2 text-md font-medium cursor-pointer ${
                      location.pathname === link.to
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-indigo-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </nav>
            <div></div>
            <div></div>
          </div>
        </div>
      </header>

      {/* Mobile Top Title */}
      <div className="md:hidden bg-white shadow-sm px-4 py-3 text-xl font-bold text-indigo-600 text-center">
        Interior 5D
      </div>

      {/* Mobile Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t md:hidden">
        <div className="flex justify-around items-center h-14">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`flex flex-col items-center text-xs ${
                location.pathname === link.to
                  ? "text-indigo-600"
                  : "text-gray-500 hover:text-indigo-600"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
