// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
const VenderDetail = () => {
  const [expandedAbout, setExpandedAbout] = useState(false);
  const projects = [
    {
      id: 1,
      title: "Modern Minimalist Apartment",
      location: "Bangalore, India",
      photoCount: 12,
      imageUrl:
        "https://readdy.ai/api/search-image?query=A%20luxurious%20modern%20minimalist%20apartment%20interior%20with%20clean%20lines%2C%20neutral%20colors%2C%20elegant%20furniture%2C%20large%20windows%20with%20natural%20light%2C%20wooden%20floors%2C%20and%20tasteful%20decor%20elements.%20The%20space%20looks%20spacious%20and%20well-designed%20with%20perfect%20lighting%20and%20sophisticated%20styling.&width=600&height=400&seq=1&orientation=landscape",
    },
    {
      id: 2,
      title: "Contemporary Villa Design",
      location: "Mumbai, India",
      photoCount: 18,
      imageUrl:
        "https://readdy.ai/api/search-image?query=A%20contemporary%20luxury%20villa%20interior%20with%20high%20ceilings%2C%20open%20floor%20plan%2C%20designer%20furniture%2C%20marble%20flooring%2C%20large%20glass%20windows%2C%20neutral%20color%20palette%20with%20gold%20accents%2C%20sophisticated%20lighting%20fixtures%2C%20and%20elegant%20decor%20elements%20creating%20a%20harmonious%20space.&width=600&height=400&seq=2&orientation=landscape",
    },
    {
      id: 3,
      title: "Luxury Penthouse",
      location: "Delhi, India",
      photoCount: 15,
      imageUrl:
        "https://readdy.ai/api/search-image?query=A%20high-end%20luxury%20penthouse%20interior%20with%20panoramic%20city%20views%2C%20open%20concept%20living%20space%2C%20designer%20furniture%2C%20marble%20floors%2C%20neutral%20color%20palette%20with%20gold%20accents%2C%20statement%20lighting%20fixtures%2C%20and%20curated%20art%20pieces%20creating%20a%20sophisticated%20urban%20retreat.&width=600&height=400&seq=3&orientation=landscape",
    },
    {
      id: 4,
      title: "Classic Heritage Home",
      location: "Jaipur, India",
      photoCount: 20,
      imageUrl:
        "https://readdy.ai/api/search-image?query=A%20classic%20heritage%20home%20interior%20with%20traditional%20Indian%20elements%20blended%20with%20modern%20luxury%2C%20featuring%20ornate%20woodwork%2C%20elegant%20furniture%2C%20neutral%20color%20palette%20with%20gold%20accents%2C%20statement%20chandeliers%2C%20marble%20floors%2C%20and%20sophisticated%20decor%20creating%20a%20timeless%20elegant%20space.&width=600&height=400&seq=4&orientation=landscape",
    },
  ];
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=A%20luxurious%20interior%20design%20showroom%20with%20elegant%20furniture%20arrangement%2C%20neutral%20color%20palette%2C%20sophisticated%20lighting%2C%20designer%20decor%20elements%2C%20and%20a%20spacious%20layout%20showcasing%20high-end%20interior%20design%20with%20perfect%20styling%20and%20ambiance.&width=1440&height=500&seq=5&orientation=landscape"
          alt="De Panache Interior Design"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute top-0 right-0 w-full md:w-1/3 lg:w-1/4 p-6 md:p-8 flex justify-end">
          <Card className="w-full max-w-[350px] bg-white shadow-lg p-6">
            <h3 className="text-lg font-medium mb-4">Contact De Panache</h3>
            <Button className="w-full bg-black hover:bg-gray-800 text-white !rounded-button whitespace-nowrap cursor-pointer">
              Send Message
            </Button>
          </Card>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Vendor Info Section */}
        <div className="py-8 border-b">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border">
                <div className="font-serif text-xl font-bold text-amber-700">
                  DP
                </div>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">De Panache</h1>
                <div className="flex items-center mt-1">
                  <span className="text-amber-500 font-medium mr-2">5.0</span>
                  <div className="flex text-amber-500">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <span className="ml-2 text-gray-600">161 Reviews</span>
                </div>
                <p className="text-gray-600 mt-1">
                  Interior Designers & Decorators
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0 md:ml-auto">
              <Button
                variant="outline"
                className="flex items-center gap-2 !rounded-button whitespace-nowrap cursor-pointer"
              >
                <i className="fas fa-pencil-alt text-sm"></i>
                Write a Review
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 !rounded-button whitespace-nowrap cursor-pointer"
              >
                <i className="fas fa-share-alt text-sm"></i>
                Share
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 !rounded-button whitespace-nowrap cursor-pointer"
              >
                <i className="fas fa-bookmark text-sm"></i>
                Save
              </Button>
            </div>
          </div>
        </div>
        {/* Tabbed Navigation */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto py-0 mb-6">
            <TabsTrigger
              value="about"
              className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-4 py-3 text-base font-medium cursor-pointer"
            >
              About Us
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-4 py-3 text-base font-medium cursor-pointer"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="business"
              className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-4 py-3 text-base font-medium cursor-pointer"
            >
              Business
            </TabsTrigger>
            <TabsTrigger
              value="credentials"
              className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-4 py-3 text-base font-medium cursor-pointer"
            >
              Credentials
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-4 py-3 text-base font-medium cursor-pointer"
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="ideabooks"
              className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-4 py-3 text-base font-medium cursor-pointer"
            >
              Ideabooks
            </TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="mt-0">
            <div className="max-w-3xl">
              <p className="text-gray-700 mb-4">
                De Panache has been an interior design and execution firm based
                in Bangalore for the last ten years.
              </p>
              {expandedAbout && (
                <div className="text-gray-700 space-y-4">
                  <p>
                    Founded in 2015, De Panache has established itself as one of
                    the premier interior design studios in India. Our team of
                    passionate designers combines creativity with functionality
                    to transform spaces into personalized works of art.
                  </p>
                  <p>
                    We specialize in residential and commercial projects,
                    offering comprehensive design solutions from concept to
                    completion. Our approach is client-centered, ensuring that
                    each project reflects the unique personality and
                    requirements of our clients.
                  </p>
                  <p>
                    With a portfolio spanning luxury homes, boutique hotels, and
                    corporate offices, we pride ourselves on attention to
                    detail, quality craftsmanship, and innovative design
                    solutions that stand the test of time.
                  </p>
                  <p>
                    Our services include space planning, custom furniture
                    design, material selection, lighting design, and project
                    management. We collaborate with skilled craftsmen and
                    trusted vendors to deliver exceptional results that exceed
                    expectations.
                  </p>
                </div>
              )}
              <Button
                variant="ghost"
                onClick={() => setExpandedAbout(!expandedAbout)}
                className="text-gray-600 hover:text-black mt-2 p-0 h-auto font-medium !rounded-button whitespace-nowrap cursor-pointer"
              >
                {expandedAbout ? "Read Less" : "Read More"}{" "}
                <i
                  className={`fas fa-chevron-${
                    expandedAbout ? "up" : "down"
                  } ml-1`}
                ></i>
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="projects" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
                      {project.photoCount} Photos
                    </div>
                    <button className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer !rounded-button whitespace-nowrap">
                      <i className="fas fa-share-alt text-gray-700"></i>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg">{project.title}</h3>
                    <p className="text-gray-600 flex items-center mt-1">
                      <i className="fas fa-map-marker-alt mr-2 text-gray-400"></i>
                      {project.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="business" className="mt-0">
            <div className="max-w-3xl">
              <h3 className="text-xl font-medium mb-4">Business Information</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <p className="flex items-center text-gray-700 mb-2">
                    <i className="fas fa-phone-alt w-6 text-gray-500"></i>
                    +91 98765 43210
                  </p>
                  <p className="flex items-center text-gray-700 mb-2">
                    <i className="fas fa-envelope w-6 text-gray-500"></i>
                    info@depanache.com
                  </p>
                  <p className="flex items-center text-gray-700">
                    <i className="fas fa-globe w-6 text-gray-500"></i>
                    www.depanache.com
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Business Hours</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-700 mb-1">Monday - Friday</p>
                      <p className="text-gray-600">9:00 AM - 6:00 PM</p>
                    </div>
                    <div>
                      <p className="text-gray-700 mb-1">Saturday</p>
                      <p className="text-gray-600">10:00 AM - 4:00 PM</p>
                    </div>
                    <div>
                      <p className="text-gray-700 mb-1">Sunday</p>
                      <p className="text-gray-600">Closed</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Address</h4>
                  <p className="text-gray-700 mb-2">
                    123 Design Avenue, Koramangala
                    <br />
                    Bangalore, Karnataka 560034
                    <br />
                    India
                  </p>
                  <div className="h-64 bg-gray-200 rounded-lg mt-4">
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <i className="fas fa-map-marked-alt text-3xl mr-3"></i>
                      <span>Map location</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="credentials" className="mt-0">
            <div className="max-w-3xl">
              <h3 className="text-xl font-medium mb-4">
                Professional Information
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Certifications & Awards</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <i className="fas fa-award text-amber-500 mt-1 mr-3"></i>
                      <div>
                        <p className="font-medium">
                          Best Interior Design Studio 2024
                        </p>
                        <p className="text-gray-600 text-sm">
                          India Design Association
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-certificate text-amber-500 mt-1 mr-3"></i>
                      <div>
                        <p className="font-medium">
                          Excellence in Residential Design
                        </p>
                        <p className="text-gray-600 text-sm">
                          Architecture & Design Summit 2023
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-trophy text-amber-500 mt-1 mr-3"></i>
                      <div>
                        <p className="font-medium">
                          Top 10 Design Studios in South India
                        </p>
                        <p className="text-gray-600 text-sm">
                          Interior Design Magazine 2022
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Professional Memberships</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <i className="fas fa-user-tie text-gray-500 mt-1 mr-3"></i>
                      <div>
                        <p className="font-medium">
                          Institute of Indian Interior Designers (IIID)
                        </p>
                        <p className="text-gray-600 text-sm">
                          Member since 2015
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-user-tie text-gray-500 mt-1 mr-3"></i>
                      <div>
                        <p className="font-medium">Council of Architecture</p>
                        <p className="text-gray-600 text-sm">
                          Registered since 2016
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">
                    Education & Qualifications
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <i className="fas fa-graduation-cap text-gray-500 mt-1 mr-3"></i>
                      <div>
                        <p className="font-medium">
                          Master of Interior Architecture
                        </p>
                        <p className="text-gray-600 text-sm">
                          National Institute of Design, 2012
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-graduation-cap text-gray-500 mt-1 mr-3"></i>
                      <div>
                        <p className="font-medium">Bachelor of Architecture</p>
                        <p className="text-gray-600 text-sm">
                          School of Planning and Architecture, 2010
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-0">
            <div className="max-w-3xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-medium">Client Reviews</h3>
                  <div className="flex items-center mt-2">
                    <div className="flex text-amber-500 mr-2">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <span className="font-medium">5.0</span>
                    <span className="text-gray-500 ml-2">(161 reviews)</span>
                  </div>
                </div>
                <Button className="bg-black hover:bg-gray-800 text-white !rounded-button whitespace-nowrap cursor-pointer">
                  Write a Review
                </Button>
              </div>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((review) => (
                    <div key={review} className="border-b pb-6">
                      <div className="flex items-start">
                        <Avatar className="h-10 w-10 mr-3">
                          <div className="font-medium text-sm">
                            {String.fromCharCode(64 + review)}
                          </div>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">Client {review}</h4>
                          <p className="text-gray-500 text-sm">
                            June {15 + review}, 2025
                          </p>
                          <div className="flex text-amber-500 mt-1 mb-2">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                          </div>
                          <p className="text-gray-700">
                            Working with De Panache was an absolute pleasure.
                            Their team understood our vision perfectly and
                            transformed our space into something beyond our
                            expectations. The attention to detail and quality of
                            work was exceptional.
                          </p>
                          <div className="flex gap-2 mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs !rounded-button whitespace-nowrap cursor-pointer"
                            >
                              <i className="fas fa-thumbs-up mr-1"></i> Helpful
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs !rounded-button whitespace-nowrap cursor-pointer"
                            >
                              <i className="fas fa-comment mr-1"></i> Comment
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
          <TabsContent value="ideabooks" className="mt-0">
            <div className="max-w-3xl">
              <h3 className="text-xl font-medium mb-6">Design Ideabooks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group cursor-pointer">
                  <div className="relative h-48 overflow-hidden rounded-lg">
                    <img
                      src="https://static.readdy.ai/image/525984788c167e1c3dc52c2c87f15903/2b9f2c6f8ef7ff2e26684a7f59c0a1ac.png"
                      alt="Bedroom Ideas"
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="outline"
                        className="bg-white/90 !rounded-button whitespace-nowrap cursor-pointer"
                      >
                        View Ideabook
                      </Button>
                    </div>
                  </div>
                  <h4 className="font-medium mt-3">Bedroom Ideas</h4>
                  <p className="text-gray-600 text-sm mt-1">4 ideas</p>
                </div>

                <div className="group cursor-pointer">
                  <div className="relative h-48 overflow-hidden rounded-lg">
                    <img
                      src="https://static.readdy.ai/image/525984788c167e1c3dc52c2c87f15903/2b9f2c6f8ef7ff2e26684a7f59c0a1ac.png"
                      alt="Kitchen Ideas"
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="outline"
                        className="bg-white/90 !rounded-button whitespace-nowrap cursor-pointer"
                      >
                        View Ideabook
                      </Button>
                    </div>
                  </div>
                  <h4 className="font-medium mt-3">Kitchen Ideas</h4>
                  <p className="text-gray-600 text-sm mt-1">2 ideas</p>
                </div>

                <div className="group cursor-pointer">
                  <div className="relative h-48 overflow-hidden rounded-lg">
                    <img
                      src="https://static.readdy.ai/image/525984788c167e1c3dc52c2c87f15903/2b9f2c6f8ef7ff2e26684a7f59c0a1ac.png"
                      alt="Living Room Ideas"
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="outline"
                        className="bg-white/90 !rounded-button whitespace-nowrap cursor-pointer"
                      >
                        View Ideabook
                      </Button>
                    </div>
                  </div>
                  <h4 className="font-medium mt-3">Living Room Ideas</h4>
                  <p className="text-gray-600 text-sm mt-1">2 ideas</p>
                </div>

                <div className="group cursor-pointer">
                  <div className="relative h-48 overflow-hidden rounded-lg">
                    <img
                      src="https://static.readdy.ai/image/525984788c167e1c3dc52c2c87f15903/2b9f2c6f8ef7ff2e26684a7f59c0a1ac.png"
                      alt="Bedroom with Accent wall Ideas"
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="outline"
                        className="bg-white/90 !rounded-button whitespace-nowrap cursor-pointer"
                      >
                        View Ideabook
                      </Button>
                    </div>
                  </div>
                  <h4 className="font-medium mt-3">
                    Bedroom with Accent wall Ideas
                  </h4>
                  <p className="text-gray-600 text-sm mt-1">2 ideas</p>
                </div>

                <div className="group cursor-pointer">
                  <div className="relative h-48 overflow-hidden rounded-lg">
                    <img
                      src="https://static.readdy.ai/image/525984788c167e1c3dc52c2c87f15903/2b9f2c6f8ef7ff2e26684a7f59c0a1ac.png"
                      alt="Depanache"
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="outline"
                        className="bg-white/90 !rounded-button whitespace-nowrap cursor-pointer"
                      >
                        View Ideabook
                      </Button>
                    </div>
                  </div>
                  <h4 className="font-medium mt-3">Depanache</h4>
                  <p className="text-gray-600 text-sm mt-1">1 idea</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default VenderDetail;
