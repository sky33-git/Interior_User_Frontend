// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
const DesignIdeas = () => {
  const [zipCode, setZipCode] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [radius, setRadius] = useState(25);
  const [showFilters, setShowFilters] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const [attachments, setAttachments] = useState(null);

  const handleSendMessage = (providerId) => {
    const provider = serviceProviders.find((p) => p.id === providerId);
    setSelectedProvider(provider);
    setMessageModal(true);
  };

  const handleSubmitMessage = () => {
    // Here you would typically send the message to your backend
    console.log("Sending message to:", selectedProvider?.name);
    console.log("Message:", messageContent);
    console.log("Attachments:", attachments);

    // Reset form and close modal
    setMessageContent("");
    setAttachments(null);
    setMessageModal(false);
  };
  // Sample service providers data
  const serviceProviders = [
    {
      id: 1,
      name: "Sharma Home Solutions",
      rating: 4.8,
      reviews: 127,
      description:
        "Professional home renovation and repair services with over 15 years of experience. Specializing in kitchen remodels, bathroom upgrades, and general home improvements.",
      address: "1234 Main Street, Seattle, WA",
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
    {
      id: 2,
      name: "GreenLeaf Landscaping Services",
      rating: 4.9,
      reviews: 215,
      description:
        "Complete landscaping solutions for residential and commercial properties. Our team creates beautiful outdoor spaces that enhance your property value and enjoyment.",
      address: "567 Garden Ave, Portland, OR",
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
    {
      id: 3,
      name: "Patel Plumbing Works",
      rating: 4.6,
      reviews: 156,
      description:
        "24/7 emergency plumbing services with licensed and insured professionals. From minor repairs to major installations, we handle all your plumbing needs.",
      address: "432 Water Way, Denver, CO",
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
    {
      id: 4,
      name: "Verma Paint & Decor",
      rating: 4.7,
      reviews: 142,
      description:
        "Interior and exterior painting services with attention to detail. We transform spaces with premium paints and expert application techniques.",
      address: "321 Color Lane, Chicago, IL",
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
    {
      id: 5,
      name: "Elegant Living Interiors",
      rating: 4.9,
      reviews: 198,
      description:
        "Specializing in luxury interior design for homes and apartments. From space planning to final styling, we deliver customized, elegant living experiences.",
      address: "45 MG Road, Bengaluru, KA",
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
    {
      id: 6,
      name: "ModSpace Modular Interiors",
      rating: 4.8,
      reviews: 174,
      description:
        "Experts in modular kitchens, wardrobes, and smart storage solutions. Our modern interior concepts blend form and function to suit urban lifestyles.",
      address: "101 Sector 62, Noida, UP",
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
  ];

  // Indian service categories
  const categories = [
    "Landscaping",
    "Painting",
    "Flooring & Tiling",
    "Roof Waterproofing",
    "HVAC Installation",
    "Interior Design",
    "Home Renovation",
    "Pest Control",
    "Appliance Repair",
    "Modular Kitchen Design",
    "Custom Wardrobes",
    "Space Planning",
    "False Ceiling & Lighting",
    "Vastu Consultation",
    "Smart Home Automation",
    "POP & Wall Textures",
    "Balcony & Terrace Garden",
    "Modular Furniture",
    "Pooja Unit Design",
  ];

  // Generate star rating component
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<i key={i} className="fas fa-star text-yellow-400"></i>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <i key={i} className="fas fa-star-half-alt text-yellow-400"></i>
        );
      } else {
        stars.push(<i key={i} className="far fa-star text-yellow-400"></i>);
      }
    }
    return stars;
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <header className="bg-indigo-800 text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Get Matched with Local Professionals
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-indigo-700 rounded-full flex items-center justify-center mb-3">
                <span className="text-xl font-bold">1</span>
              </div>
              <p className="text-lg">
                <i className="fas fa-clipboard-list mr-2"></i>Answer questions
                about your project
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-indigo-700 rounded-full flex items-center justify-center mb-3">
                <span className="text-xl font-bold">2</span>
              </div>
              <p className="text-lg">
                <i className="fas fa-users mr-2"></i>Get connected with pros for
                free
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-indigo-700 rounded-full flex items-center justify-center mb-3">
                <span className="text-xl font-bold">3</span>
              </div>
              <p className="text-lg">
                <i className="fas fa-handshake mr-2"></i>Hire the right pro with
                confidence
              </p>
            </div>
          </div>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Enter ZIP Code"
                className="h-12 border-2 border-white bg-white/10 text-white placeholder:text-white/70 focus:border-indigo-400 w-full"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
            <Button className="h-12 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 !rounded-button whitespace-nowrap">
              Get Started
            </Button>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white !rounded-button whitespace-nowrap"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}{" "}
            <i
              className={`fas fa-filter ml-2 ${
                showFilters ? "fa-rotate-180" : ""
              }`}
            ></i>
          </Button>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div
            className={`md:w-1/4 ${showFilters ? "block" : "hidden"} md:block`}
          >
            <div className="bg-white rounded-lg shadow-md p-5 sticky top-4">
              <h2 className="text-xl font-bold mb-5 text-indigo-800">
                Filters
              </h2>
              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Location
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="City, State or ZIP"
                    className="pl-10 border-gray-300"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>
              {/* Radius Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Radius</label>
                <div className="space-y-2">
                  <Slider
                    defaultValue={[25]}
                    max={100}
                    step={5}
                    onValueChange={(value) => setRadius(value[0])}
                    className="my-4"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>0 km</span>
                    <span>{radius} km</span>
                    <span>100 km</span>
                  </div>
                </div>
              </div>
              {/* Categories Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Professional Category
                </label>
                <ScrollArea className="h-48 rounded border border-gray-200 p-2">
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={`category-${index}`} />
                        <Label
                          htmlFor={`category-${index}`}
                          className="text-sm cursor-pointer"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              {/* Ratings Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Ratings
                </label>
                <RadioGroup defaultValue="all">
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="all" id="rating-all" />
                    <Label htmlFor="rating-all" className="cursor-pointer">
                      All Ratings
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="5" id="rating-5" />
                    <Label
                      htmlFor="rating-5"
                      className="cursor-pointer flex items-center"
                    >
                      <span className="flex text-yellow-400">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="4" id="rating-4" />
                    <Label
                      htmlFor="rating-4"
                      className="cursor-pointer flex items-center"
                    >
                      <span className="flex text-yellow-400">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </span>
                      <span className="text-gray-400">
                        <i className="fas fa-star"></i>
                      </span>
                      <span className="ml-1 text-sm text-gray-500">& up</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="3" id="rating-3" />
                    <Label
                      htmlFor="rating-3"
                      className="cursor-pointer flex items-center"
                    >
                      <span className="flex text-yellow-400">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </span>
                      <span className="text-gray-400">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </span>
                      <span className="ml-1 text-sm text-gray-500">& up</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          {/* Service Providers Listings */}
          {/* <div className="md:w-3/4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Available Service Providers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {serviceProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={provider.imageUrl}
                      alt={provider.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {provider.name}
                      </h3>
                      <div className="flex items-center">
                        <div className="flex mr-1">
                          {renderStars(provider.rating)}
                        </div>
                        <span className="text-sm text-gray-500">
                          ({provider.reviews})
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {provider.description}
                    </p>
                    <div className="flex items-start mb-4">
                      <i className="fas fa-map-marker-alt text-indigo-700 mt-1 mr-2"></i>
                      <span className="text-sm text-gray-500">
                        {provider.address}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                      <Button
                        className="bg-indigo-700 hover:bg-indigo-800 text-white flex-grow !rounded-button whitespace-nowrap cursor-pointer"
                        onClick={() => handleSendMessage(provider.id)}
                      >
                        <i className="fas fa-envelope mr-2"></i> Send Message
                      </Button>

                      <Dialog
                        open={messageModal}
                        onOpenChange={setMessageModal}
                      >
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                              <i className="fas fa-envelope text-indigo-700"></i>
                              Message to {selectedProvider?.name}
                            </DialogTitle>
                            <p className="text-sm text-gray-500">
                              <i className="fas fa-clock mr-2"></i>
                              Typically responds within 24 hours
                            </p>
                          </DialogHeader>

                          <div className="space-y-4 py-4">
                            <div>
                              <Label
                                htmlFor="subject"
                                className="text-sm font-medium"
                              >
                                Subject
                              </Label>
                              <Input
                                id="subject"
                                value={`Inquiry about services from ${selectedProvider?.name}`}
                                readOnly
                                className="mt-1"
                              />
                            </div>

                            <div>
                              <Label
                                htmlFor="message"
                                className="text-sm font-medium"
                              >
                                Message
                              </Label>
                              <Textarea
                                id="message"
                                placeholder="Type your message here..."
                                value={messageContent}
                                onChange={(e) =>
                                  setMessageContent(e.target.value)
                                }
                                className="mt-1 min-h-[150px]"
                              />
                            </div>

                            <div>
                              <Label
                                htmlFor="attachments"
                                className="text-sm font-medium"
                              >
                                Attachments (optional)
                              </Label>
                              <Input
                                id="attachments"
                                type="file"
                                multiple
                                className="mt-1"
                                onChange={(e) => setAttachments(e.target.files)}
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Max file size: 10MB. Supported formats: jpg,
                                png, pdf, doc
                              </p>
                            </div>
                          </div>

                          <DialogFooter className="flex gap-2">
                            <Button
                              variant="outline"
                              onClick={() => setMessageModal(false)}
                              className="!rounded-button"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleSubmitMessage}
                              className="bg-indigo-700 hover:bg-indigo-800 text-white !rounded-button"
                            >
                              <i className="fas fa-paper-plane mr-2"></i>
                              Send Message
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Link to={"/design-vendor"}>
                        <Button
                          variant="outline"
                          className="text-indigo-700 border-indigo-700 hover:bg-indigo-50 !rounded-button whitespace-nowrap cursor-pointer"
                        >
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 !rounded-button whitespace-nowrap cursor-pointer">
                Load More <i className="fas fa-chevron-down ml-2"></i>
              </Button>
            </div>
          </div> */}
          <div className="md:w-3/4 mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Available Service Providers
            </h2>

            <div className="space-y-6">
              {serviceProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col md:flex-row"
                >
                  <Link
                    to="/design-vendor"
                    className="md:w-1/3 h-60 md:h-auto overflow-hidden block"
                  >
                    <img
                      src={provider.imageUrl}
                      alt={provider.name}
                      className="w-full h-full object-cover object-center md:rounded-l-lg"
                    />
                  </Link>

                  <div className="p-4 flex flex-col justify-between md:w-2/3">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {provider.name}
                        </h3>
                        <div className="flex items-center">
                          <div className="flex mr-1">
                            {renderStars(provider.rating)}
                          </div>
                          <span className="text-sm text-gray-500">
                            ({provider.reviews})
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {provider.description}
                      </p>

                      <div className="flex items-start mb-4">
                        <i className="fas fa-map-marker-alt text-indigo-700 mt-1 mr-2"></i>
                        <span className="text-sm text-gray-500">
                          {provider.address}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                      <Button
                        className="bg-indigo-700 hover:bg-indigo-800 text-white flex-grow !rounded-button"
                        onClick={() => {
                          setSelectedProvider(provider);
                          setMessageModal(true);
                        }}
                      >
                        <i className="fas fa-envelope mr-2"></i> Send Message
                      </Button>

                      <Link to="/design-vendor">
                        <Button
                          variant="outline"
                          className="text-indigo-700 border-indigo-700 hover:bg-indigo-50 !rounded-button whitespace-nowrap"
                        >
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Dialog Outside Map */}
            <Dialog open={messageModal} onOpenChange={setMessageModal}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                    <i className="fas fa-envelope text-indigo-700"></i>
                    Message to {selectedProvider?.name}
                  </DialogTitle>
                  <p className="text-sm text-gray-500">
                    <i className="fas fa-clock mr-2"></i>
                    Typically responds within 24 hours
                  </p>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      value={`Inquiry about services from ${selectedProvider?.name}`}
                      readOnly
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Type your message here..."
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      className="mt-1 min-h-[150px]"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="attachments"
                      className="text-sm font-medium"
                    >
                      Attachments (optional)
                    </Label>
                    <Input
                      id="attachments"
                      type="file"
                      multiple
                      className="mt-1"
                      onChange={(e) => setAttachments(e.target.files)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Max file size: 10MB. Supported formats: jpg, png, pdf, doc
                    </p>
                  </div>
                </div>

                <DialogFooter className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setMessageModal(false)}
                    className="!rounded-button"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmitMessage}
                    className="bg-indigo-700 hover:bg-indigo-800 text-white !rounded-button"
                  >
                    <i className="fas fa-paper-plane mr-2"></i>
                    Send Message
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <div className="mt-8 text-center">
              <Button className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 !rounded-button whitespace-nowrap">
                Load More <i className="fas fa-chevron-down ml-2"></i>
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
    </div>
  );
};
export default DesignIdeas;
