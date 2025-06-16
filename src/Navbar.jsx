import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-xl font-bold text-indigo-600">DesignVerse</div>
            <nav className="ml-10 flex items-center space-x-8">
              <Link
                to={"/"}
                data-readdy="true"
                className="text-gray-500 hover:text-indigo-600 px-3 py-2 text-sm font-medium cursor-pointer"
              >
                Home
              </Link>
              <Link
                to="/feature"
                className="text-gray-500 hover:text-indigo-600 px-3 py-2 text-sm font-medium cursor-pointer"
              >
                Features
              </Link>
              <Link
                to="price"
                className="text-gray-500 hover:text-indigo-600 px-3 py-2 text-sm font-medium cursor-pointer"
              >
                Pricing
              </Link>
              <Link
                to={"/gallery"}
                data-readdy="true"
                className="text-indigo-600 border-b-2 border-indigo-600 px-3 py-2 text-sm font-medium cursor-pointer"
              >
                Gallery
              </Link>
              <Link
                to={"/resources"}
                data-readdy="true"
                className="text-gray-500 hover:text-indigo-600 px-3 py-2 text-sm font-medium cursor-pointer"
              >
                Resources
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="!rounded-button whitespace-nowrap cursor-pointer"
            >
              Sign In
            </Button>
            <Link
              to={
                "https://readdy.ai/home/c8b8a774-b463-401e-a3c1-7a887584c80a/144b6798-09ab-4313-88ee-1446fbc268b1"
              }
              data-readdy="true"
            >
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
