// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const DesignPage = () => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [priceRange, setPriceRange] = useState([500, 10000]);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [savedDesigns, setSavedDesigns] = useState([]);
  const swiperModules = [Pagination, Autoplay];

  const categoryName = "Kitchen";

  //   interface {
  //     id: number;
  //     title: string;
  //     designer: string;
  //     description: string;
  //     priceRange: string;
  //     dimensions: string;
  //     style: string;
  //     rating: number;
  //     features: string;
  //     imageUrl: string;
  //   }

  const styles = [
    "Modern",
    "Traditional",
    "Contemporary",
    "Minimalist",
    "Industrial",
    "Scandinavian",
  ];
  const roomSizes = ["Small", "Medium", "Large", "Open Concept"];
  const colorSchemes = ["Neutral", "Warm", "Cool", "Monochromatic", "Colorful"];
  const sortOptions = [
    "Popular",
    "Latest",
    "Price: Low to High",
    "Price: High to Low",
  ];

  const designs = [
    {
      id: 1,
      title: "Modern Elegance Kitchen",
      designer: "Elena Designs",
      description:
        "A sleek, modern kitchen with high-end appliances and minimalist cabinetry, perfect for contemporary homes.",
      priceRange: "$8,000 - $12,000",
      dimensions: "15' x 18'",
      style: "Modern",
      rating: 4.8,
      features: [
        "Custom cabinetry",
        "Marble countertops",
        "Smart appliances",
        "Island with seating",
      ],
      imageUrl:
        "https://readdy.ai/api/search-image?query=Modern%2520kitchen%2520with%2520sleek%2520white%2520cabinetry%252C%2520marble%2520countertops%252C%2520and%2520stainless%2520steel%2520appliances.%2520Featuring%2520a%2520large%2520island%2520with%2520seating%252C%2520pendant%2520lighting%252C%2520and%2520minimalist%2520design.%2520Bright%2520space%2520with%2520natural%2520light%2520from%2520large%2520windows%252C%2520hardwood%2520flooring%252C%2520and%2520contemporary%2520fixtures.&width=600&height=400&seq=10&orientation=landscape",
    },
    {
      id: 2,
      title: "Rustic Farmhouse Kitchen",
      designer: "Countryside Interiors",
      description:
        "A warm, inviting kitchen with rustic elements and modern functionality, ideal for family gatherings.",
      priceRange: "$6,500 - $9,000",
      dimensions: "14' x 16'",
      style: "Traditional",
      rating: 4.6,
      features: [
        "Farmhouse sink",
        "Butcher block island",
        "Open shelving",
        "Vintage fixtures",
      ],
      imageUrl:
        "https://readdy.ai/api/search-image?query=Rustic%2520farmhouse%2520kitchen%2520with%2520wooden%2520beams%252C%2520white%2520shaker%2520cabinets%252C%2520and%2520a%2520large%2520farmhouse%2520sink.%2520Features%2520butcher%2520block%2520countertops%252C%2520open%2520shelving%2520with%2520ceramic%2520dishware%252C%2520vintage-inspired%2520pendant%2520lights%252C%2520and%2520a%2520central%2520island.%2520Warm%2520and%2520inviting%2520atmosphere%2520with%2520terracotta%2520tiles%2520and%2520potted%2520herbs.&width=600&height=400&seq=11&orientation=landscape",
    },
    {
      id: 3,
      title: "Minimalist Scandi Kitchen",
      designer: "Nordic Home",
      description:
        "A clean, bright kitchen with Scandinavian influences, focusing on functionality and simplicity.",
      priceRange: "$7,200 - $10,500",
      dimensions: "12' x 14'",
      style: "Scandinavian",
      rating: 4.9,
      features: [
        "Hidden storage",
        "Integrated appliances",
        "Natural materials",
        "Minimalist hardware",
      ],
      imageUrl:
        "https://readdy.ai/api/search-image?query=Scandinavian%2520minimalist%2520kitchen%2520with%2520white%2520cabinets%252C%2520light%2520wood%2520accents%252C%2520and%2520simple%2520hardware.%2520Clean%2520lines%2520and%2520uncluttered%2520countertops%2520with%2520integrated%2520appliances.%2520Large%2520windows%2520allowing%2520abundant%2520natural%2520light%252C%2520potted%2520plants%2520adding%2520greenery%252C%2520and%2520simple%2520pendant%2520lights%2520over%2520a%2520small%2520dining%2520area.&width=600&height=400&seq=12&orientation=landscape",
    },
    {
      id: 4,
      title: "Industrial Loft Kitchen",
      designer: "Urban Spaces",
      description:
        "An edgy, industrial-style kitchen with raw materials and exposed elements, perfect for urban lofts.",
      priceRange: "$9,000 - $14,000",
      dimensions: "16' x 20'",
      style: "Industrial",
      rating: 4.7,
      features: [
        "Exposed brick",
        "Metal shelving",
        "Commercial-grade appliances",
        "Concrete countertops",
      ],
      imageUrl:
        "https://readdy.ai/api/search-image?query=Industrial%2520loft%2520kitchen%2520with%2520exposed%2520brick%2520walls%252C%2520metal%2520shelving%252C%2520and%2520concrete%2520countertops.%2520Features%2520commercial-grade%2520stainless%2520steel%2520appliances%252C%2520pendant%2520lighting%2520with%2520Edison%2520bulbs%252C%2520and%2520a%2520large%2520island%2520with%2520bar%2520seating.%2520High%2520ceilings%2520with%2520exposed%2520ducts%2520and%2520pipes%252C%2520large%2520factory-style%2520windows%252C%2520and%2520polished%2520concrete%2520floors.&width=600&height=400&seq=13&orientation=landscape",
    },
    {
      id: 5,
      title: "Contemporary Open Kitchen",
      designer: "Metro Design Studio",
      description:
        "A spacious, open-concept kitchen that seamlessly integrates with the living and dining areas.",
      priceRange: "$10,000 - $15,000",
      dimensions: "18' x 22'",
      style: "Contemporary",
      rating: 4.9,
      features: [
        "Open floor plan",
        "Large island",
        "High-end finishes",
        "Custom lighting",
      ],
      imageUrl:
        "https://readdy.ai/api/search-image?query=Contemporary%2520open%2520concept%2520kitchen%2520that%2520flows%2520into%2520living%2520and%2520dining%2520areas.%2520Features%2520sleek%2520cabinetry%252C%2520waterfall%2520countertop%2520island%252C%2520and%2520high-end%2520appliances.%2520Large%2520windows%2520providing%2520natural%2520light%252C%2520designer%2520pendant%2520lighting%252C%2520engineered%2520hardwood%2520floors%252C%2520and%2520a%2520cohesive%2520color%2520scheme%2520that%2520unifies%2520the%2520space.&width=600&height=400&seq=14&orientation=landscape",
    },
    {
      id: 6,
      title: "Luxury Chef's Kitchen",
      designer: "Gourmet Interiors",
      description:
        "A professional-grade kitchen designed for serious home chefs with top-of-the-line appliances and ample workspace.",
      priceRange: "$15,000 - $25,000",
      dimensions: "20' x 24'",
      style: "Modern",
      rating: 5.0,
      features: [
        "Professional range",
        "Double islands",
        "Walk-in pantry",
        "Custom hood vent",
      ],
      imageUrl:
        "https://readdy.ai/api/search-image?query=Luxury%2520chef%2527s%2520kitchen%2520with%2520professional-grade%2520appliances%2520including%2520a%2520six-burner%2520gas%2520range%2520and%2520double%2520ovens.%2520Features%2520two%2520large%2520islands%2520with%2520prep%2520sinks%252C%2520extensive%2520marble%2520countertops%252C%2520custom%2520cabinetry%2520with%2520specialized%2520storage%252C%2520and%2520a%2520dramatic%2520custom%2520hood%2520vent.%2520Includes%2520a%2520walk-in%2520pantry%2520and%2520wine%2520refrigerator.&width=600&height=400&seq=15&orientation=landscape",
    },
    {
      id: 7,
      title: "Compact Efficiency Kitchen",
      designer: "Small Space Solutions",
      description:
        "A cleverly designed kitchen that maximizes functionality in a limited space without sacrificing style.",
      priceRange: "$4,500 - $7,000",
      dimensions: "8' x 10'",
      style: "Minimalist",
      rating: 4.7,
      features: [
        "Space-saving appliances",
        "Vertical storage",
        "Fold-down surfaces",
        "Multi-functional elements",
      ],
      imageUrl:
        "https://readdy.ai/api/search-image?query=Compact%2520efficiency%2520kitchen%2520designed%2520for%2520small%2520spaces%2520with%2520clever%2520storage%2520solutions.%2520Features%2520slim%2520appliances%252C%2520vertical%2520storage%2520utilizing%2520wall%2520space%252C%2520fold-down%2520countertop%2520extensions%252C%2520and%2520multi-functional%2520furniture.%2520Bright%2520color%2520scheme%2520with%2520reflective%2520surfaces%2520to%2520enhance%2520the%2520sense%2520of%2520space%252C%2520under-cabinet%2520lighting%252C%2520and%2520minimalist%2520hardware.&width=600&height=400&seq=16&orientation=landscape",
    },
    {
      id: 8,
      title: "Mediterranean Inspired Kitchen",
      designer: "Coastal Designs",
      description:
        "A warm, inviting kitchen with Mediterranean influences featuring terracotta tiles and blue accents.",
      priceRange: "$7,500 - $11,000",
      dimensions: "14' x 17'",
      style: "Traditional",
      rating: 4.6,
      features: [
        "Terracotta flooring",
        "Hand-painted tiles",
        "Arched details",
        "Wrought iron accents",
      ],
      imageUrl:
        "https://readdy.ai/api/search-image?query=Mediterranean%2520inspired%2520kitchen%2520with%2520warm%2520terracotta%2520floors%252C%2520cream-colored%2520cabinetry%252C%2520and%2520blue%2520tile%2520backsplash.%2520Features%2520arched%2520doorways%252C%2520wrought%2520iron%2520light%2520fixtures%2520and%2520hardware%252C%2520hand-painted%2520ceramic%2520details%252C%2520and%2520a%2520large%2520farmhouse%2520sink.%2520Includes%2520open%2520shelving%2520displaying%2520colorful%2520pottery%2520and%2520a%2520rustic%2520wooden%2520table%2520for%2520dining.&width=600&height=400&seq=17&orientation=landscape",
    },
  ];

  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const toggleSaveDesign = (id, event) => {
    event.stopPropagation();
    if (savedDesigns.includes(id)) {
      setSavedDesigns(savedDesigns.filter((designId) => designId !== id));
    } else {
      setSavedDesigns([...savedDesigns, id]);
    }
  };

  const openDesignDetail = (design) => {
    setSelectedDesign(design);
  };

  return (
    <div className="min-h-[1024px] bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-8 py-12">
        {/* Breadcrumb Navigation */}

        {/* Header Section */}

        {/* Hero Banner */}
        <div className="relative h-[400px] mb-16 rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://readdy.ai/api/search-image?query=Panoramic%2520view%2520of%2520a%2520luxurious%2520modern%2520kitchen%2520with%2520island%2520and%2520high-end%2520appliances.%2520Features%2520elegant%2520cabinetry%252C%2520marble%2520countertops%252C%2520and%2520pendant%2520lighting.%2520The%2520left%2520side%2520has%2520a%2520dark%2520gradient%2520overlay%2520that%2520smoothly%2520blends%2520with%2520text%2520area%252C%2520while%2520the%2520right%2520side%2520shows%2520the%2520full%2520kitchen%2520with%2520natural%2520light%2520from%2520large%2520windows.&width=1400&height=400&seq=18&orientation=landscape')`,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent"></div>
          <div className="relative h-full flex items-center">
            <div className="text-white max-w-xl px-12">
              <h2 className="text-4xl font-bold mb-4 font-serif">
                Transform Your {categoryName}
              </h2>
              <p className="text-lg mb-6">
                Discover how our expert designers can help you create the
                perfect {categoryName.toLowerCase()} that combines style,
                functionality, and your personal taste.
              </p>
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 !rounded-button cursor-pointer whitespace-nowrap">
                Get a Custom Design
              </Button>
            </div>
          </div>
        </div>

        {/* Filtering Section */}
        {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-10">
          <div className="flex flex-col lg:flex-row justify-between gap-6 mb-6">
            <div className="flex flex-wrap gap-4">
              <div className="w-full md:w-auto">
                <p className="text-sm font-medium text-gray-700 mb-2">Style</p>
                <div className="flex flex-wrap gap-2">
                  {styles.map((style) => (
                    <Badge
                      key={style}
                      variant={
                        activeFilters.includes(style) ? "default" : "outline"
                      }
                      className={`cursor-pointer ${
                        activeFilters.includes(style)
                          ? "bg-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => toggleFilter(style)}
                    >
                      {style}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-auto">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Room Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {roomSizes.map((size) => (
                    <Badge
                      key={size}
                      variant={
                        activeFilters.includes(size) ? "default" : "outline"
                      }
                      className={`cursor-pointer ${
                        activeFilters.includes(size)
                          ? "bg-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => toggleFilter(size)}
                    >
                      {size}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-auto">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Color Scheme
                </p>
                <div className="flex flex-wrap gap-2">
                  {colorSchemes.map((color) => (
                    <Badge
                      key={color}
                      variant={
                        activeFilters.includes(color) ? "default" : "outline"
                      }
                      className={`cursor-pointer ${
                        activeFilters.includes(color)
                          ? "bg-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => toggleFilter(color)}
                    >
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-64">
              <p className="text-sm font-medium text-gray-700 mb-2">Sort By</p>
              <select className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-700 cursor-pointer">
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </p>
                <div className="w-full md:w-80">
                  <Slider
                    defaultValue={[500, 10000]}
                    max={25000}
                    min={500}
                    step={500}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-4"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0].toLocaleString()}</span>
                    <span>${priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                {activeFilters.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-gray-600">
                      Active Filters:
                    </span>
                    {activeFilters.map((filter) => (
                      <Badge
                        key={filter}
                        className="bg-blue-100 text-blue-800 cursor-pointer"
                        onClick={() => toggleFilter(filter)}
                      >
                        {filter} <i className="fas fa-times ml-1"></i>
                      </Badge>
                    ))}
                    <Button
                      variant="link"
                      className="text-blue-600 hover:text-blue-800 p-0 h-auto text-sm !rounded-button whitespace-nowrap cursor-pointer"
                      onClick={() => setActiveFilters([])}
                    >
                      Clear All
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div> */}

        {/* Design Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {designs.map((design) => (
            <Link to={"/design-detail-page"}>
              <Card
                key={design.id}
                className="overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer"
                //   onClick={() => openDesignDetail(design)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={design.imageUrl}
                    alt={design.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 z-10">
                    <Button
                      variant="outline"
                      size="icon"
                      className={`rounded-full bg-white/80 backdrop-blur-sm hover:bg-white ${
                        savedDesigns.includes(design.id)
                          ? "text-red-500"
                          : "text-gray-600"
                      } !rounded-button cursor-pointer`}
                      onClick={(e) => toggleSaveDesign(design.id, e)}
                    >
                      <i
                        className={`${
                          savedDesigns.includes(design.id) ? "fas" : "far"
                        } fa-heart`}
                      ></i>
                    </Button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex justify-between items-center">
                      <Badge className="bg-blue-600">{design.style}</Badge>
                      <div className="flex items-center text-yellow-400">
                        <i className="fas fa-star mr-1"></i>
                        <span className="text-white text-sm">
                          {design.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {design.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    By {design.designer}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {design.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-blue-600">
                      {design.priceRange}
                    </p>
                    <Button
                      variant="outline"
                      className="text-blue-600 border-blue-600 hover:bg-blue-50 !rounded-button cursor-pointer whitespace-nowrap"
                    >
                      Details <i className="fas fa-arrow-right ml-2"></i>
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        {/* <div className="bg-blue-600 rounded-2xl p-12 text-white text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 font-serif">
            Ready to Transform Your {categoryName}?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our expert designers are ready to help you create the perfect{" "}
            {categoryName.toLowerCase()} that matches your style and budget.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg !rounded-button cursor-pointer whitespace-nowrap">
              Request a Quote
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-blue-700 px-8 py-3 text-lg !rounded-button cursor-pointer whitespace-nowrap"
            >
              View More Designs
            </Button>
          </div>
        </div> */}

        {/* Related Categories */}
        {/* <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 font-serif">
            Explore Related Categories
          </h2>
          <Tabs defaultValue="popular" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger
                value="popular"
                className="!rounded-button whitespace-nowrap cursor-pointer"
              >
                Popular Combinations
              </TabsTrigger>
              <TabsTrigger
                value="styles"
                className="!rounded-button whitespace-nowrap cursor-pointer"
              >
                Similar Styles
              </TabsTrigger>
              <TabsTrigger
                value="rooms"
                className="!rounded-button whitespace-nowrap cursor-pointer"
              >
                Connected Rooms
              </TabsTrigger>
            </TabsList>

            <TabsContent value="popular" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className="h-48 overflow-hidden">
                    <img
                      src="https://readdy.ai/api/search-image?query=Modern%2520kitchen%2520and%2520dining%2520room%2520combination%2520with%2520open%2520concept%2520design.%2520Features%2520sleek%2520cabinetry%252C%2520island%2520with%2520seating%252C%2520and%2520connected%2520dining%2520area%2520with%2520contemporary%2520table%2520and%2520chairs.%2520Cohesive%2520design%2520elements%2520throughout%2520both%2520spaces%2520with%2520consistent%2520color%2520scheme%2520and%2520materials.&width=400&height=300&seq=19&orientation=landscape"
                      alt="Kitchen & Dining Room"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Kitchen & Dining Room
                    </h3>
                    <p className="text-gray-600 text-sm">
                      1,245 Combination Designs
                    </p>
                  </div>
                </Card>

                <Card className="overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className="h-48 overflow-hidden">
                    <img
                      src="https://readdy.ai/api/search-image?query=Kitchen%2520and%2520living%2520room%2520open%2520floor%2520plan%2520with%2520seamless%2520transition%2520between%2520spaces.%2520Modern%2520kitchen%2520with%2520island%2520opening%2520to%2520comfortable%2520living%2520area%2520with%2520sofa%2520and%2520coffee%2520table.%2520Consistent%2520flooring%252C%2520color%2520palette%252C%2520and%2520design%2520elements%2520unifying%2520both%2520spaces%2520in%2520a%2520contemporary%2520style.&width=400&height=300&seq=20&orientation=landscape"
                      alt="Kitchen & Living Room"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Kitchen & Living Room
                    </h3>
                    <p className="text-gray-600 text-sm">
                      1,876 Combination Designs
                    </p>
                  </div>
                </Card>

                <Card className="overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className="h-48 overflow-hidden">
                    <img
                      src="https://readdy.ai/api/search-image?query=Kitchen%2520with%2520attached%2520pantry%2520and%2520utility%2520room%2520design.%2520Efficient%2520layout%2520with%2520modern%2520kitchen%2520connected%2520to%2520organized%2520pantry%2520storage%2520and%2520functional%2520utility%2520space.%2520Smart%2520storage%2520solutions%252C%2520complementary%2520cabinetry%252C%2520and%2520practical%2520design%2520elements%2520throughout%2520all%2520connected%2520spaces.&width=400&height=300&seq=21&orientation=landscape"
                      alt="Kitchen & Pantry"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Kitchen & Pantry
                    </h3>
                    <p className="text-gray-600 text-sm">
                      954 Combination Designs
                    </p>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="styles" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {styles.slice(0, 4).map((style) => (
                  <Card
                    key={style}
                    className="overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={`https://readdy.ai/api/search-image?query=$%7Bstyle%7D%2520style%2520kitchen%2520interior%2520design%2520with%2520characteristic%2520elements%2520and%2520features.%2520Showcasing%2520typical%2520color%2520scheme%252C%2520materials%252C%2520and%2520design%2520elements%2520of%2520$%7Bstyle%7D%2520kitchen%2520style.%2520Clean%2520composition%2520with%2520focus%2520on%2520key%2520style%2520identifiers%2520and%2520aesthetic%2520qualities.&width=300&height=200&seq=${
                          styles.indexOf(style) + 22
                        }&orientation=landscape`}
                        alt={style}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {style}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {Math.floor(Math.random() * 1000) + 500} Designs
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rooms" className="mt-0">
              <Swiper
                modules={swiperModules}
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                className="pb-12"
              >
                <SwiperSlide>
                  <Card className="overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer h-full">
                    <div className="h-48 overflow-hidden">
                      <img
                        src="https://readdy.ai/api/search-image?query=Modern%2520dining%2520room%2520interior%2520with%2520wooden%2520table%2520and%2520comfortable%2520chairs.%2520Features%2520pendant%2520lighting%252C%2520decorative%2520elements%252C%2520and%2520stylish%2520decor.%2520Bright%2520space%2520with%2520large%2520windows%252C%2520contemporary%2520design%2520elements%252C%2520and%2520elegant%2520atmosphere%2520perfect%2520for%2520entertaining.&width=400&height=300&seq=26&orientation=landscape"
                        alt="Dining Room"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Dining Room
                      </h3>
                      <p className="text-gray-600 text-sm">2,345 Designs</p>
                    </div>
                  </Card>
                </SwiperSlide>

                <SwiperSlide>
                  <Card className="overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer h-full">
                    <div className="h-48 overflow-hidden">
                      <img
                        src="https://readdy.ai/api/search-image?query=Contemporary%2520living%2520room%2520with%2520comfortable%2520seating%252C%2520coffee%2520table%252C%2520and%2520entertainment%2520center.%2520Features%2520stylish%2520furniture%252C%2520decorative%2520elements%252C%2520and%2520modern%2520design.%2520Bright%2520space%2520with%2520large%2520windows%252C%2520area%2520rug%252C%2520and%2520cohesive%2520color%2520scheme%2520creating%2520an%2520inviting%2520atmosphere.&width=400&height=300&seq=27&orientation=landscape"
                        alt="Living Room"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Living Room
                      </h3>
                      <p className="text-gray-600 text-sm">3,142 Designs</p>
                    </div>
                  </Card>
                </SwiperSlide>

                <SwiperSlide>
                  <Card className="overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer h-full">
                    <div className="h-48 overflow-hidden">
                      <img
                        src="https://readdy.ai/api/search-image?query=Modern%2520pantry%2520with%2520organized%2520shelving%2520systems%252C%2520storage%2520containers%252C%2520and%2520efficient%2520layout.%2520Features%2520custom%2520cabinetry%252C%2520labeled%2520storage%2520solutions%252C%2520and%2520practical%2520design.%2520Clean%2520and%2520functional%2520space%2520with%2520good%2520lighting%2520and%2520easy%2520access%2520to%2520kitchen%2520essentials%2520and%2520food%2520items.&width=400&height=300&seq=28&orientation=landscape"
                        alt="Pantry"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Pantry
                      </h3>
                      <p className="text-gray-600 text-sm">1,256 Designs</p>
                    </div>
                  </Card>
                </SwiperSlide>

                <SwiperSlide>
                  <Card className="overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer h-full">
                    <div className="h-48 overflow-hidden">
                      <img
                        src="https://readdy.ai/api/search-image?query=Modern%2520home%2520bar%2520adjacent%2520to%2520kitchen%2520with%2520counter%2520seating%252C%2520wine%2520storage%252C%2520and%2520glass%2520display.%2520Features%2520stylish%2520cabinetry%252C%2520under-cabinet%2520lighting%252C%2520and%2520elegant%2520design.%2520Sophisticated%2520space%2520with%2520premium%2520finishes%252C%2520cocktail%2520preparation%2520area%252C%2520and%2520entertainment-friendly%2520layout.&width=400&height=300&seq=29&orientation=landscape"
                        alt="Home Bar"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Home Bar
                      </h3>
                      <p className="text-gray-600 text-sm">876 Designs</p>
                    </div>
                  </Card>
                </SwiperSlide>
              </Swiper>
            </TabsContent>
          </Tabs>
        </div> */}

        {/* Floating Action Button */}
        {/* <div className="fixed bottom-8 right-8 z-50">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-16 w-16 shadow-lg !rounded-button cursor-pointer">
                <i className="fas fa-comment-dots text-xl"></i>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Request a Consultation</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Message
                    </label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md h-24"
                      placeholder="Tell us about your project"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white !rounded-button cursor-pointer whitespace-nowrap">
                    Submit Request
                  </Button>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div> */}
      </div>

      {/* Design Detail Dialog */}
      {selectedDesign && (
        <Dialog
          open={!!selectedDesign}
          onOpenChange={(open) => !open && setSelectedDesign(null)}
        >
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-full">
                <img
                  src={selectedDesign.imageUrl}
                  alt={selectedDesign.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6 overflow-y-auto max-h-[80vh]">
                <DialogHeader className="mb-4">
                  <div className="flex justify-between items-start">
                    <DialogTitle className="text-2xl font-bold">
                      {selectedDesign.title}
                    </DialogTitle>
                    <Button
                      variant="outline"
                      size="icon"
                      className={`rounded-full ${
                        savedDesigns.includes(selectedDesign.id)
                          ? "text-red-500 border-red-200"
                          : "text-gray-600"
                      } !rounded-button cursor-pointer`}
                      onClick={(e) => toggleSaveDesign(selectedDesign.id, e)}
                    >
                      <i
                        className={`${
                          savedDesigns.includes(selectedDesign.id)
                            ? "fas"
                            : "far"
                        } fa-heart`}
                      ></i>
                    </Button>
                  </div>
                </DialogHeader>

                <div className="mb-4">
                  <p className="text-gray-600">By {selectedDesign.designer}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`${
                            i < Math.floor(selectedDesign.rating)
                              ? "fas"
                              : i < selectedDesign.rating
                              ? "fas fa-star-half-alt"
                              : "far"
                          } fa-star`}
                        ></i>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">
                      {selectedDesign.rating}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <Badge className="bg-blue-600 mb-4">
                    {selectedDesign.style}
                  </Badge>
                  <p className="text-gray-700 mb-4">
                    {selectedDesign.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-500">Price Range</p>
                    <p className="font-medium text-blue-600">
                      {selectedDesign.priceRange}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-500">Dimensions</p>
                    <p className="font-medium">{selectedDesign.dimensions}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedDesign.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full !rounded-button cursor-pointer whitespace-nowrap">
                    Request Quote
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full !rounded-button cursor-pointer whitespace-nowrap"
                  >
                    <i className="fas fa-share-alt mr-2"></i> Share Design
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DesignPage;
