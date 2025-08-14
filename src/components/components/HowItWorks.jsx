import React from "react";
import { Badge } from "../ui/badge";

function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <Badge className="mb-3 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 cursor-pointer">
            Process
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How DesignVerse Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From concept to completion, our streamlined process makes designing
            your space simple and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-pencil-ruler text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">1. Create Your Space</h3>
            <p className="text-gray-600">
              Start with a blank canvas or choose from our templates. Define
              your space dimensions and layout preferences.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-magic text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">2. Design with AI</h3>
            <p className="text-gray-600">
              Add furniture and décor with AI assistance, or choose from our
              extensive catalog of items.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-eye text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">3. Visualize & Share</h3>
            <p className="text-gray-600">
              Experience your design in 3D or AR, make adjustments, and share
              your creation with others.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
