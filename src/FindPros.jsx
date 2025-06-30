// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

const FindPros = () => {
  //   const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);

  const categories = [
    {
      title: "Kitchen",
      designs: 2738,
      imageUrl:
        "https://readdy.ai/api/search-image?query=Modern%20kitchen%20interior%20design%20with%20marble%20countertops%2C%20wooden%20cabinets%2C%20and%20stainless%20steel%20appliances%2C%20bright%20and%20airy%20space%20with%20natural%20light%20coming%20through%20large%20windows%2C%20minimalist%20style%20with%20clean%20lines%20and%20organized%20space&width=600&height=400&seq=1&orientation=landscape",
    },
    {
      title: "Living Room",
      designs: 3142,
      imageUrl:
        "https://readdy.ai/api/search-image?query=Contemporary%20living%20room%20interior%20with%20comfortable%20sofa%2C%20coffee%20table%2C%20and%20decorative%20elements%2C%20large%20windows%20with%20natural%20light%2C%20neutral%20color%20palette%20with%20accent%20pieces%2C%20modern%20artwork%20on%20walls%2C%20stylish%20and%20inviting%20atmosphere&width=600&height=400&seq=2&orientation=landscape",
    },
    {
      title: "Master Bedroom",
      designs: 2891,
      imageUrl:
        "https://readdy.ai/api/search-image?query=Elegant%20master%20bedroom%20with%20king-size%20bed%2C%20luxurious%20bedding%2C%20bedside%20tables%20with%20lamps%2C%20large%20windows%20with%20curtains%2C%20neutral%20color%20palette%2C%20plush%20carpet%2C%20decorative%20pillows%2C%20and%20a%20cozy%20reading%20nook%2C%20peaceful%20and%20sophisticated%20atmosphere&width=600&height=400&seq=3&orientation=landscape",
    },
    {
      title: "Kids Room",
      designs: 1987,
      imageUrl:
        "https://readdy.ai/api/search-image?query=Colorful%20and%20playful%20kids%20bedroom%20with%20bunk%20beds%2C%20storage%20solutions%2C%20educational%20toys%2C%20bright%20wall%20decorations%2C%20study%20area%20with%20desk%20and%20chair%2C%20bookshelf%20with%20children%20books%2C%20comfortable%20rug%20for%20play%20area%2C%20creative%20and%20stimulating%20environment&width=600&height=400&seq=4&orientation=landscape",
    },
    {
      title: "Dining Room",
      designs: 2345,
      imageUrl:
        "https://readdy.ai/api/search-image?query=Sophisticated%20dining%20room%20with%20wooden%20table%20and%20comfortable%20chairs%2C%20pendant%20lighting%2C%20decorative%20centerpiece%2C%20sideboard%20with%20dishware%2C%20large%20windows%20with%20views%2C%20elegant%20wall%20art%2C%20warm%20color%20palette%2C%20perfect%20for%20family%20gatherings%20and%20entertaining%20guests&width=600&height=400&seq=5&orientation=landscape",
    },
    {
      title: "Wardrobe",
      designs: 1756,
      imageUrl:
        "https://readdy.ai/api/search-image?query=Custom%20built-in%20wardrobe%20with%20sliding%20doors%2C%20organized%20compartments%20for%20clothes%2C%20shoes%20and%20accessories%2C%20integrated%20lighting%2C%20full-length%20mirror%2C%20wooden%20finishes%2C%20minimalist%20design%2C%20efficient%20storage%20solutions%2C%20clean%20and%20sophisticated%20appearance&width=600&height=400&seq=6&orientation=landscape",
    },
    {
      title: "Study Room",
      designs: 1543,
      imageUrl:
        "https://readdy.ai/api/search-image?query=Modern%20home%20office%20with%20wooden%20desk%2C%20ergonomic%20chair%2C%20bookshelf%20with%20books%20and%20decorative%20items%2C%20computer%20setup%2C%20task%20lighting%2C%20window%20with%20natural%20light%2C%20indoor%20plants%2C%20inspirational%20artwork%2C%20productive%20and%20comfortable%20workspace%20environment&width=600&height=400&seq=7&orientation=landscape",
    },
    {
      title: "Bathroom",
      designs: 2156,
      imageUrl:
        "https://readdy.ai/api/search-image?query=Luxury%20bathroom%20with%20freestanding%20bathtub%2C%20walk-in%20shower%20with%20glass%20enclosure%2C%20double%20vanity%20with%20mirrors%2C%20marble%20countertops%2C%20tile%20flooring%2C%20towel%20racks%2C%20indoor%20plants%2C%20natural%20light%20from%20windows%2C%20spa-like%20atmosphere%20with%20clean%20lines%20and%20elegant%20fixtures&width=600&height=400&seq=8&orientation=landscape",
    },
  ];

  return (
    <div className="min-h-[1024px] bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-8 py-12">
        {/* Header Section */}
        {/* <div className="relative mb-16 flex justify-between items-start">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 font-serif">
              Home Interior Design
            </h1>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              We bring you carefully-curated interior design ideas to give your
              home a brand new look. Explore exclusive interior designs and
              trends that are inspirational as well as practical.
            </p>

            <div className="relative">
              <Button
                variant="link"
                className="text-blue-600 hover:text-blue-800 p-0 flex items-center gap-2 cursor-pointer !rounded-button whitespace-nowrap"
                onClick={() => setIsReadMoreOpen(!isReadMoreOpen)}
              >
                Read More
                <i
                  className={`fas fa-chevron-down transition-transform ${
                    isReadMoreOpen ? "rotate-180" : ""
                  }`}
                ></i>
              </Button>

              {isReadMoreOpen && (
                <div className="mt-4 p-6 bg-white rounded-lg shadow-md border border-gray-100 text-gray-700">
                  <ScrollArea className="h-[200px] w-full pr-4">
                    <p className="mb-4">
                      Our interior design services are tailored to meet your
                      unique style preferences and functional needs. We believe
                      that a well-designed home should not only look beautiful
                      but also enhance your quality of life.
                    </p>
                    <p className="mb-4">
                      Each category in our collection represents years of
                      expertise and careful curation by our team of professional
                      interior designers. We stay updated with the latest trends
                      while ensuring timeless appeal in all our designs.
                    </p>
                    <p>
                      Whether you're looking for a complete home makeover or
                      just want to refresh a single room, our extensive
                      collection of designs provides inspiration and practical
                      solutions for spaces of all sizes and budgets.
                    </p>
                  </ScrollArea>
                </div>
              )}
            </div>
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg !rounded-button cursor-pointer whitespace-nowrap">
            Consult Now
          </Button>
        </div> */}

        {/* Hero Section */}
        <div className="relative h-[400px] mb-20 rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://readdy.ai/api/search-image?query=Panoramic%20view%20of%20a%20luxurious%20open%20concept%20home%20interior%20with%20seamless%20transition%20between%20living%2C%20dining%20and%20kitchen%20areas.%20Featuring%20floor-to-ceiling%20windows%20with%20natural%20light%2C%20modern%20furniture%2C%20wooden%20elements%2C%20and%20minimalist%20decor.%20The%20left%20side%20has%20a%20gradient%20that%20smoothly%20blends%20with%20text%20overlay&width=1400&height=400&seq=9&orientation=landscape')`,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent"></div>
          <div className="relative h-full flex items-center">
            <div className="text-white max-w-xl px-12">
              <h2 className="text-4xl font-bold mb-4 font-serif">
                Transform Your Living Space
              </h2>
              <p className="text-lg mb-6">
                Discover how our expert designers can help you create the home
                of your dreams with personalized interior solutions.
              </p>
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 !rounded-button cursor-pointer whitespace-nowrap">
                Explore Our Portfolio
              </Button>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8 font-serif">
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {categories.map((category, index) => (
            <Link to={"/design-page"}>
              <Card
                key={index}
                className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={category.imageUrl}
                    alt={category.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {category.designs.toLocaleString()} Designs
                  </p>
                  <Button
                    variant="outline"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50 !rounded-button cursor-pointer whitespace-nowrap"
                  >
                    View Designs <i className="fas fa-arrow-right ml-2"></i>
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
      </div>
    </div>
  );
};

export default FindPros;
