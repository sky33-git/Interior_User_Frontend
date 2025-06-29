// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const DesignDetailPage = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Product Image */}
          <div className="relative h-[500px] lg:h-[800px] rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://readdy.ai/api/search-image?query=Modern%20U-shaped%20kitchen%20with%20marigold%20yellow%20cabinets%2C%20white%20contrast%20elements%2C%20marble%20countertops%2C%20under-cabinet%20lighting%2C%20sleek%20appliances%2C%20minimalist%20hardware%2C%20spacious%20layout%2C%20bright%20natural%20lighting%2C%20clean%20lines%2C%20contemporary%20design&width=700&height=1000&seq=1&orientation=portrait"
              alt="Marigold U-Shaped Modern Kitchen Design"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Right Column - Product Details */}
          <div className="relative">
            {/* Floating Share and Favorite Buttons */}
            <div className="absolute top-0 right-0 flex space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full !rounded-button cursor-pointer"
              >
                <i className="fas fa-share-alt text-gray-600"></i>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full !rounded-button cursor-pointer"
                onClick={toggleFavorite}
              >
                <i
                  className={`${
                    isFavorite
                      ? "fas fa-heart text-red-500"
                      : "far fa-heart text-gray-600"
                  }`}
                ></i>
              </Button>
            </div>

            {/* Product Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 pr-20 mb-6 leading-tight">
              Marigold U-Shaped Modern Kitchen Design with White Contrast and
              Warm Lighting
            </h1>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Badge className="px-4 py-2 bg-amber-100 text-amber-800 hover:bg-amber-200 !rounded-button whitespace-nowrap cursor-pointer">
                <i className="fas fa-palette mr-2"></i> Customisable Designs
              </Badge>
              <Badge className="px-4 py-2 bg-blue-100 text-blue-800 hover:bg-blue-200 !rounded-button whitespace-nowrap cursor-pointer">
                <i className="fas fa-shield-alt mr-2"></i> Flat 10 year warranty
              </Badge>
              <Badge className="px-4 py-2 bg-green-100 text-green-800 hover:bg-green-200 !rounded-button whitespace-nowrap cursor-pointer">
                <i className="fas fa-credit-card mr-2"></i> Easy EMIs
              </Badge>
              <Badge className="px-4 py-2 bg-purple-100 text-purple-800 hover:bg-purple-200 !rounded-button whitespace-nowrap cursor-pointer">
                <i className="fas fa-truck mr-2"></i> 45 day delivery
              </Badge>
              <Badge className="px-4 py-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 !rounded-button whitespace-nowrap cursor-pointer">
                <i className="fas fa-star mr-2"></i> 4.5 rating
              </Badge>
            </div>

            <Card className="p-6 mb-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-5">
                Kitchen Design Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Layout</p>
                  <p className="text-base font-medium">
                    U Shaped Kitchen Design
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Room Dimension</p>
                  <p className="text-base font-medium">14x12 feet</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Style</p>
                  <p className="text-base font-medium">Modern</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Colour</p>
                  <p className="text-base font-medium">
                    <span className="inline-block w-4 h-4 bg-amber-400 rounded-full mr-2 align-middle"></span>
                    Marigold (Base & Wall units)
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Shutter finish</p>
                  <p className="text-base font-medium">
                    Laminate in suede finish
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Countertop Material
                  </p>
                  <p className="text-base font-medium">Marble</p>
                </div>
              </div>
            </Card>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Storage Features
              </h3>
              <ul className="space-y-2 pl-1">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span>Pull-out pantry with adjustable shelves</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span>
                    Corner carousel units for maximum space utilization
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span>Soft-close drawers with cutlery organizers</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span>Overhead cabinets with lift-up doors</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span>Integrated waste sorting system</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span>Dedicated spice rack and bottle pull-outs</span>
                </li>
              </ul>
            </div>

            <Button className="w-full py-6 text-lg bg-amber-500 hover:bg-amber-600 text-white !rounded-button whitespace-nowrap cursor-pointer">
              Request Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignDetailPage;
