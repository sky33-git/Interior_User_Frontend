import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const ProductFeature = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorPosition({
        x: 50 + Math.sin(Date.now() / 1000) * 2,
        y: 50 + Math.cos(Date.now() / 1000) * 2,
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col justify-center">
        <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
          {/* Left Section */}
          <div className="w-full lg:w-2/5 space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Create a floor plan from scratch or upload an existing one
            </h1>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Design your ideal layout from scratch, or use our advanced tools
              to get your floor plan recognized in minutes! Create a fully
              customizable floor plan—whether it's a simple room, an entire
              house or a commercial building.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Button className="!rounded-button bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 whitespace-nowrap">
                Start designing
              </Button>
              <Button
                variant="outline"
                className="!rounded-button border-gray-300 text-gray-700 px-6 py-2.5 whitespace-nowrap"
              >
                Upload plan
              </Button>
            </div>
          </div>

          {/* Right Interactive Section */}
          <div className="w-full lg:w-3/5 relative">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200">
              {/* Header */}
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex flex-wrap gap-2 items-center justify-between">
                {/* Left Nav */}
                <div className="flex items-center gap-2 flex-wrap">
                  <button className="text-gray-500 hover:text-gray-700">
                    <i className="fas fa-arrow-left"></i>
                  </button>
                  <div className="flex items-center gap-2 bg-white rounded-md px-3 py-1.5 border border-gray-200">
                    <i className="fas fa-folder text-indigo-500"></i>
                    <span className="text-sm text-gray-700">All Projects</span>
                  </div>
                </div>

                {/* Middle Controls */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 bg-white rounded-md px-3 py-1.5 border border-gray-200">
                    <i className="fas fa-layer-group text-gray-600"></i>
                    <span className="text-sm text-gray-700">Floor 1</span>
                  </div>
                  <button className="text-gray-500 hover:text-gray-700">
                    <i className="fas fa-undo"></i>
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <i className="fas fa-redo"></i>
                  </button>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 flex-wrap">
                  <Button className="!rounded-button bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-1.5">
                    2D
                  </Button>
                  <Button
                    variant="outline"
                    className="!rounded-button border-gray-300 text-gray-700 text-sm px-4 py-1.5"
                  >
                    3D
                  </Button>
                  <div className="flex items-center gap-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <i className="fas fa-cog"></i>
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <i className="fas fa-share-alt"></i>
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <i className="fas fa-download"></i>
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <i className="fas fa-expand"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid Area */}
              <div
                className="relative bg-gray-100 h-[300px] sm:h-[400px] md:h-[500px]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                {/* Rooms */}
                <div className="absolute inset-0 px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
                  {/* Living Room */}
                  <div className="absolute top-[18%] left-[5%] w-[80%] sm:left-[30%] sm:w-[40%] h-[30%] bg-white border-2 border-indigo-500 rounded-sm">
                    <div className="absolute -top-6 left-2 text-sm font-medium text-gray-600">
                      Living Room
                    </div>
                    <div className="absolute -left-3 top-1/2 w-5 h-7 border-2 border-indigo-500 bg-white transform -translate-y-1/2 rounded-r-full"></div>
                  </div>

                  {/* Master Bedroom */}
                  <div className="absolute top-[18%] right-[5%] w-[40%] sm:right-[10%] sm:w-[20%] h-[30%] bg-white border-2 border-indigo-500 rounded-sm">
                    <div className="absolute -top-6 left-2 text-sm font-medium text-gray-600">
                      Master Bedroom
                    </div>
                    <div className="absolute -left-3 bottom-4 w-5 h-7 border-2 border-indigo-500 bg-white rounded-r-full"></div>
                  </div>

                  {/* Bedroom 2 */}
                  <div className="absolute bottom-[18%] right-[5%] w-[40%] sm:right-[10%] sm:w-[20%] h-[25%] bg-white border-2 border-indigo-500 rounded-sm">
                    <div className="absolute -top-6 left-2 text-sm font-medium text-gray-600">
                      Bedroom 2
                    </div>
                    <div className="absolute -left-3 top-4 w-5 h-7 border-2 border-indigo-500 bg-white rounded-r-full"></div>
                  </div>

                  {/* Kitchen */}
                  <div className="absolute bottom-[18%] left-[5%] w-[60%] sm:left-[30%] sm:w-[25%] h-[25%] bg-white border-2 border-indigo-500 rounded-sm">
                    <div className="absolute -top-6 left-2 text-sm font-medium text-gray-600">
                      Kitchen
                    </div>
                    <div className="absolute -right-3 top-1/2 w-5 h-7 border-2 border-indigo-500 bg-white transform -translate-y-1/2 rounded-l-full"></div>
                  </div>

                  {/* Hallway */}
                  <div className="absolute top-[25%] left-[75%] w-[20%] sm:left-[70%] sm:w-[10%] h-[50%] bg-white border-2 border-indigo-500 rounded-sm">
                    <div className="absolute -top-6 left-2 text-sm font-medium text-gray-600">
                      Hall
                    </div>
                  </div>

                  {/* Measurements */}
                  <div className="absolute top-[14%] left-[5%] sm:left-[30%] text-xs text-gray-500">
                    6.5m
                  </div>
                  <div className="absolute top-[52%] left-[10%] sm:left-[25%] text-xs text-gray-500 transform -rotate-90">
                    4.2m
                  </div>
                </div>

                {/* Vertical Toolbar */}
                <div className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-md p-1 sm:p-2 flex flex-col gap-2 sm:gap-4">
                  {["home", "couch", "door-open", "user", "pencil-alt"].map(
                    (icon, idx) => (
                      <button
                        key={idx}
                        className="p-1 sm:p-2 text-gray-600 hover:text-indigo-500 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <i className={`fas fa-${icon}`}></i>
                      </button>
                    )
                  )}
                </div>

                {/* Animated Cursor */}
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out"
                  style={{
                    left: `${cursorPosition.x}%`,
                    top: `${cursorPosition.y}%`,
                  }}
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 text-black">
                    <i className="fas fa-mouse-pointer text-lg sm:text-xl"></i>
                  </div>
                </div>
              </div>
            </div>
            {/* Shadow under browser */}
            <div className="absolute -bottom-3 left-4 right-4 h-6 bg-gray-200 rounded-b-xl blur-md -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFeature;
