import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

const FindPros = () => {
  const [activeTab, setActiveTab] = useState("All");

  const categories = [
    {
      title: "Modular Kitchen",
      designs: 2738,
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
    {
      title: "Living Room",
      designs: 3142,
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
    {
      title: "Master Bedroom",
      designs: 2891,
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
    {
      title: "Pooja Room",
      designs: 1456,
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
    {
      title: "Kids Room",
      designs: 1987,
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
    {
      title: "Dining Room",
      designs: 2345,
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
    {
      title: "Guest Bedroom",
      designs: 1582,
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
    {
      title: "Balcony",
      designs: 1342,
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
    {
      title: "Traditional Courtyard",
      designs: 1011,
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
    {
      title: "Wardrobe",
      designs: 1756,
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
    {
      title: "Study Room",
      designs: 1543,
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
    {
      title: "Bathroom",
      designs: 2156,
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
  ];

  const filteredCategories =
    activeTab === "All"
      ? categories
      : categories.filter((cat) => cat.title === activeTab);

  return (
    <div className="min-h-[1024px] bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-8 py-12">
        {/* Hero Section */}
        <div className="relative h-[400px] mb-20 rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://readdy.ai/api/search-image?query=Panoramic%20view%20of%20a%20luxurious%20open%20concept%20home%20interior...')`,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent"></div>
          <div className="relative h-full flex items-center">
            <div className="text-white max-w-xl px-12">
              <h2 className="text-4xl font-bold mb-4 font-serif">
                Redefine Your Home with Indian Elegance
              </h2>
              <p className="text-lg mb-6">
                From modular kitchens to vastu-aligned interiors, our expert
                designers bring a perfect blend of tradition and modern design
                to your home.
              </p>
              <Button className="bg-white text-orange-600 hover:bg-orange-100 px-6 py-3 !rounded-button cursor-pointer whitespace-nowrap">
                View Our Work
              </Button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto whitespace-nowrap">
          <div className="flex gap-4 pb-2 border-b border-gray-300">
            <Button
              variant={activeTab === "All" ? "default" : "outline"}
              className="!rounded-full"
              onClick={() => setActiveTab("All")}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.title}
                variant={activeTab === cat.title ? "default" : "outline"}
                className="!rounded-full"
                onClick={() => setActiveTab(cat.title)}
              >
                {cat.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8 font-serif">
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {filteredCategories.map((category, index) => (
            <Link to="/design-page" key={index}>
              <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
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
      </div>
    </div>
  );
};

export default FindPros;
