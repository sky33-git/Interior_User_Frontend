// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const Feature = () => {
  //   const currentDate = "June 15, 2025";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-transparent z-10"></div>
          <img
            src="https://readdy.ai/api/search-image?query=modern%20interior%20design%20studio%20with%203D%20visualization%20software%20on%20large%20screens%2C%20elegant%20workspace%20with%20design%20tools%2C%20soft%20lighting%2C%20minimalist%20furniture%2C%20professional%20atmosphere%2C%20high-end%20technology%2C%20clean%20and%20spacious%20environment&width=1440&height=600&seq=hero1&orientation=landscape"
            alt="DesignVerse Features"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-20 md:py-28 lg:py-32 max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Powerful Features for Limitless Design
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Everything you need to bring your design vision to life with
              intuitive tools, AI assistance, and stunning visualizations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
                Try For Free
              </Button>
              <Button
                variant="outline"
                className="!rounded-button whitespace-nowrap cursor-pointer"
              >
                <i className="fas fa-play-circle mr-2"></i> Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Revolutionary Design Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the powerful features that make DesignVerse the ultimate
              platform for interior designers and enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 h-full">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=intuitive%20drag%20and%20drop%20interface%20for%20interior%20design%20software%20with%202D%20and%203D%20modes%20visible%2C%20clean%20modern%20UI%2C%20professional%20design%20tools%2C%20showing%20floor%20plan%20and%203D%20view%20side%20by%20side%2C%20minimalist%20design%2C%20high%20contrast&width=400&height=200&seq=feat1&orientation=landscape"
                  alt="Drag-and-Drop Design Tools"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4">
                    <i className="fas fa-vector-square text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Drag-and-Drop Design Tools
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Intuitive design interface with seamless switching between 2D
                  floor plans and immersive 3D environments. Design with
                  precision and ease.
                </p>
                <Tabs defaultValue="2d" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      value="2d"
                      className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                      2D Mode
                    </TabsTrigger>
                    <TabsTrigger
                      value="3d"
                      className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                      3D Mode
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="2d"
                    className="mt-4 text-sm text-gray-500"
                  >
                    Create precise floor plans with accurate measurements, wall
                    placements, and furniture layouts in an intuitive 2D
                    interface.
                  </TabsContent>
                  <TabsContent
                    value="3d"
                    className="mt-4 text-sm text-gray-500"
                  >
                    Walk through your designs in immersive 3D, adjust lighting,
                    materials, and experience spaces before they're built.
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 h-full">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=AI%20powered%20interior%20design%20layout%20assistant%20showing%20multiple%20suggested%20room%20arrangements%2C%20futuristic%20interface%20with%20glowing%20suggestions%2C%20clean%20modern%20UI%2C%20professional%20design%20software%20screen%2C%20high%20tech%20visualization%20of%20AI%20recommendations&width=400&height=200&seq=feat2&orientation=landscape"
                  alt="AI-powered Layout Suggestions"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4">
                    <i className="fas fa-brain text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    AI-powered Layout Suggestions
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Let our advanced AI analyze your space and suggest optimal
                  furniture arrangements based on room dimensions, traffic flow,
                  and design principles.
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span>Smart space optimization recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span>Style matching based on your preferences</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span>Traffic flow and ergonomic analysis</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 h-full">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=augmented%20reality%20interior%20design%20visualization%20showing%20smartphone%20displaying%20virtual%20furniture%20in%20real%20room%2C%20modern%20AR%20technology%2C%20person%20holding%20phone%20with%203D%20furniture%20overlay%20in%20actual%20space%2C%20high%20tech%20design%20application&width=400&height=200&seq=feat3&orientation=landscape"
                  alt="Real-time AR Visualization"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4">
                    <i className="fas fa-vr-cardboard text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Real-time AR Visualization
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  See your designs in your actual space with our cutting-edge
                  augmented reality technology. Perfect for visualizing before
                  purchasing.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    Compatible with:
                  </div>
                  <div className="flex space-x-3">
                    <div className="flex items-center">
                      <i className="fab fa-apple text-gray-700 mr-1"></i>
                      <span className="text-sm text-gray-600">iOS 14+</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fab fa-android text-gray-700 mr-1"></i>
                      <span className="text-sm text-gray-600">Android 10+</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-tablet-alt text-gray-700 mr-1"></i>
                      <span className="text-sm text-gray-600">Tablets</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 h-full">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=extensive%20digital%20catalog%20of%20furniture%20and%20decor%20items%20for%20interior%20design%20software%2C%20grid%20layout%20of%20various%20furniture%20styles%2C%20organized%20collection%20with%20search%20functionality%2C%20professional%20design%20application%20interface%2C%20clean%20modern%20UI&width=400&height=200&seq=feat4&orientation=landscape"
                  alt="Large Catalog of Furniture and Décor"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4">
                    <i className="fas fa-couch text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Extensive Furniture Catalog
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Access our vast library of furniture and décor items from
                  leading brands and designers. Find the perfect pieces for any
                  style or budget.
                </p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-gray-100 p-2 rounded text-center">
                    <div className="text-2xl font-bold text-indigo-600">
                      50K+
                    </div>
                    <div className="text-xs text-gray-500">Furniture Items</div>
                  </div>
                  <div className="bg-gray-100 p-2 rounded text-center">
                    <div className="text-2xl font-bold text-indigo-600">
                      200+
                    </div>
                    <div className="text-xs text-gray-500">Brands</div>
                  </div>
                  <div className="bg-gray-100 p-2 rounded text-center">
                    <div className="text-2xl font-bold text-indigo-600">
                      20+
                    </div>
                    <div className="text-xs text-gray-500">
                      Style Categories
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 h-full">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=ultra%20high%20resolution%204K%20rendering%20of%20interior%20design%2C%20photorealistic%20visualization%20of%20modern%20living%20room%2C%20incredibly%20detailed%20furniture%20textures%20and%20lighting%20effects%2C%20professional%20architectural%20rendering%2C%20studio%20quality%20image&width=400&height=200&seq=feat5&orientation=landscape"
                  alt="4K Realistic Rendering"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4">
                    <i className="fas fa-camera text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    4K Realistic Rendering
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Generate stunning photorealistic snapshots of your designs in
                  crystal-clear 4K resolution. Perfect for presentations or
                  sharing on social media.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      Rendering Quality
                    </span>
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                      Ultra HD
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full w-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 h-full">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=cloud%20synchronization%20across%20multiple%20devices%20showing%20interior%20design%20project%20on%20laptop%2C%20tablet%20and%20smartphone%20simultaneously%2C%20seamless%20workflow%2C%20modern%20technology%20integration%2C%20professional%20design%20software%2C%20clean%20interface&width=400&height=200&seq=feat6&orientation=landscape"
                  alt="Cloud Sync Across Devices"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4">
                    <i className="fas fa-cloud text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Cloud Sync Across Devices
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Work seamlessly across all your devices with real-time cloud
                  synchronization. Start on your desktop and continue on your
                  tablet or smartphone.
                </p>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <i className="fas fa-desktop text-gray-600 mr-2"></i>
                    <span className="text-sm text-gray-600">Desktop</span>
                  </div>
                  <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <i className="fas fa-tablet-alt text-gray-600 mr-2"></i>
                    <span className="text-sm text-gray-600">Tablet</span>
                  </div>
                  <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <i className="fas fa-mobile-alt text-gray-600 mr-2"></i>
                    <span className="text-sm text-gray-600">Mobile</span>
                  </div>
                  <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <i className="fas fa-globe text-gray-600 mr-2"></i>
                    <span className="text-sm text-gray-600">Web</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Designers Are Saying
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of professionals who are transforming their design
              workflow with DesignVerse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="bg-white p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4">
                  <i className="fas fa-user text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">
                    Interior Designer, Studio Spaces
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The AR visualization feature has completely transformed how I
                present concepts to clients. They can now see exactly how their
                space will look before making any purchases."
              </p>
              <div className="flex text-yellow-400">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </Card>

            {/* Testimonial 2 */}
            <Card className="bg-white p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4">
                  <i className="fas fa-user text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Michael Chen</h4>
                  <p className="text-sm text-gray-500">
                    Architect, Modern Designs
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The AI layout suggestions have saved me countless hours of
                work. It provides intelligent starting points that I can then
                refine to match my client's specific needs."
              </p>
              <div className="flex text-yellow-400">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
            </Card>

            {/* Testimonial 3 */}
            <Card className="bg-white p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4">
                  <i className="fas fa-user text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Emma Rodriguez</h4>
                  <p className="text-sm text-gray-500">
                    Home Stager, Perfect Spaces
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The extensive furniture catalog means I can always find exactly
                what I need for any project. The 4K rendering capabilities have
                elevated my presentation materials to a new level."
              </p>
              <div className="flex text-yellow-400">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Design Process?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join thousands of designers who are creating stunning spaces with
            DesignVerse's powerful features.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-indigo-600 hover:bg-indigo-50 !rounded-button whitespace-nowrap cursor-pointer">
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-indigo-700 !rounded-button whitespace-nowrap cursor-pointer"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default Feature;
