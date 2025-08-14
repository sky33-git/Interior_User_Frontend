import React, { useState } from "react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";

function Demo() {
  const [activeTab, setActiveTab] = useState("2d-3d");

  return (
    <section id="demo" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <Badge className="mb-3 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 cursor-pointer">
            Interactive Demo
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience Our Design Tools
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how DesignVerse transforms your ideas into beautiful, functional
            spaces with our powerful design tools.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <Tabs
            defaultValue="2d-3d"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="border-b">
              <div className="container mx-auto px-4">
                <TabsList className="bg-transparent h-16">
                  <TabsTrigger
                    value="2d-3d"
                    className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    <i className="fas fa-cube mr-2"></i> 2D/3D Planning
                  </TabsTrigger>
                  <TabsTrigger
                    value="ai-suggestions"
                    className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    <i className="fas fa-lightbulb mr-2"></i> AI Suggestions
                  </TabsTrigger>
                  <TabsTrigger
                    value="ar-view"
                    className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    <i className="fas fa-vr-cardboard mr-2"></i> AR View
                  </TabsTrigger>
                  <TabsTrigger
                    value="catalog"
                    className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    <i className="fas fa-box-open mr-2"></i> Item Catalog
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="2d-3d" className="mt-0">
              <div className="relative h-[500px] overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=modern%20interior%20design%20software%20interface%20showing%203D%20visualization%20of%20a%20living%20room%20with%20floor%20plan%20visible%2C%20professional%20UI%2C%20architectural%20visualization%20tool%2C%20high-end%20rendering%20with%20realistic%20lighting%20and%20materials%2C%20clean%20interface%20design&width=1200&height=600&seq=6&orientation=landscape"
                  alt="2D/3D Planning Tool"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      2D/3D Floor Planning
                    </h3>
                    <p className="mb-4 max-w-xl">
                      Seamlessly switch between 2D floor plans and immersive 3D
                      visualizations. Drag and drop elements, adjust dimensions,
                      and see your changes in real-time.
                    </p>
                    <Button className="bg-white text-indigo-700 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                      Try It Now
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ai-suggestions" className="mt-0">
              <div className="relative h-[500px] overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=AI%20interior%20design%20suggestion%20interface%20showing%20multiple%20design%20options%20for%20the%20same%20room%2C%20with%20AI%20recommendations%20and%20style%20variations%2C%20professional%20UI%20with%20material%20palettes%20and%20furniture%20suggestions%2C%20architectural%20visualization%20tool%20interface&width=1200&height=600&seq=7&orientation=landscape"
                  alt="AI Suggestions Tool"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      AI Design Suggestions
                    </h3>
                    <p className="mb-4 max-w-xl">
                      Get intelligent design recommendations tailored to your
                      space and preferences. Our AI analyzes thousands of
                      designs to suggest the perfect elements for your project.
                    </p>
                    <Button className="bg-white text-indigo-700 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                      Try It Now
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ar-view" className="mt-0">
              <div className="relative h-[500px] overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=augmented%20reality%20interior%20design%20app%20showing%20furniture%20placement%20in%20real%20room%20through%20smartphone%20camera%20view%2C%20AR%20visualization%20with%20digital%20furniture%20overlay%20in%20physical%20space%2C%20high-tech%20interface%20with%20measurements%20and%20placement%20guides&width=1200&height=600&seq=8&orientation=landscape"
                  alt="AR Visualization Tool"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      AR Visualization
                    </h3>
                    <p className="mb-4 max-w-xl">
                      See how furniture and décor will look in your actual space
                      with our augmented reality feature. Point your device and
                      place virtual items in your real environment.
                    </p>
                    <Button className="bg-white text-indigo-700 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                      Try It Now
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="catalog" className="mt-0">
              <div className="relative h-[500px] overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=interior%20design%20catalog%20interface%20showing%20grid%20of%20furniture%20and%20decor%20items%20with%20search%20filters%2C%20professional%20product%20catalog%20UI%20with%20categories%2C%20materials%2C%20and%20style%20filters%2C%20clean%20modern%20interface%20design%20with%20furniture%20thumbnails&width=1200&height=600&seq=9&orientation=landscape"
                  alt="Item Catalog Tool"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      8,000+ Item Catalog
                    </h3>
                    <p className="mb-4 max-w-xl">
                      Browse our extensive library of furniture, fixtures,
                      materials, and décor items. Filter by style, color, price,
                      and dimensions to find the perfect pieces for your design.
                    </p>
                    <Button className="bg-white text-indigo-700 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                      Try It Now
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

export default Demo;
