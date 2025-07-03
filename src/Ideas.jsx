// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

/**
 * @typedef {Object} Project
 * @property {*} id
 * @property {string} title
 * @property {string} designer
 * @property {string} roomType
 * @property {string} style
 * @property {string} imageUrl
 * @property {number} likes
 * @property {string} description
 * @property {number} budget
 */

const Ideas = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [budgetRange, setBudgetRange] = useState([0, 10000]);
  const [selectedFilters, setSelectedFilters] = useState({
    roomTypes: [],
    styles: [],
    colors: [],
  });
  // Project data

  // interface Project {
  //   id: Number;
  //   title: string;
  //   designer: string;
  //   roomType: string;
  //   style: string;
  //   imageUrl: string;
  //   likes: number;
  //   description: string;
  //   budget: number;
  // }

  /** @type {Project[]} */

  const projects = [
    {
      id: 1,
      title: "Modern Minimalist Living Room by Aakash Interiors",
      designer: "Aakash Interiors",
      roomType: "livingRoom",
      style: "Modern",
      imageUrl: "...",
      likes: 245,
      description: "...",
      budget: 8500,
    },
    {
      id: 2,
      title: "Contemporary Kitchen with Island by Kshitij Designs",
      designer: "Kshitij Designs",
      roomType: "kitchen",
      style: "Contemporary",
      imageUrl: "...",
      likes: 189,
      description: "...",
      budget: 12000,
    },
    {
      id: 3,
      title: "Serene Master Bedroom Retreat by Tranquil Spaces",
      designer: "Tranquil Spaces",
      roomType: "bedroom",
      style: "Transitional",
      imageUrl: "...",
      likes: 156,
      description: "...",
      budget: 6500,
    },
    {
      id: 4,
      title: "Luxury Spa-Inspired Bathroom by Aastha Interiors",
      designer: "Aastha Interiors",
      roomType: "bathroom",
      style: "Luxury",
      imageUrl: "...",
      likes: 203,
      description: "...",
      budget: 9200,
    },
    {
      id: 5,
      title: "Productive Home Office Setup by DesignShala",
      designer: "DesignShala",
      roomType: "office",
      style: "Modern",
      imageUrl: "...",
      likes: 178,
      description: "...",
      budget: 4800,
    },
    {
      id: 6,
      title: "Scandinavian Living Room by Urban Nest",
      designer: "Urban Nest",
      roomType: "livingRoom",
      style: "Scandinavian",
      imageUrl: "...",
      likes: 231,
      description: "...",
      budget: 7300,
    },
    {
      id: 7,
      title: "Industrial Loft Kitchen by Studio Prakriti",
      designer: "Studio Prakriti",
      roomType: "kitchen",
      style: "Industrial",
      imageUrl: "...",
      likes: 167,
      description: "...",
      budget: 10500,
    },
    {
      id: 8,
      title: "Bohemian Bedroom Oasis by Ananya Creations",
      designer: "Ananya Creations",
      roomType: "bedroom",
      style: "Bohemian",
      imageUrl: "...",
      likes: 192,
      description: "...",
      budget: 5800,
    },
    {
      id: 9,
      title: "Mid-Century Modern Living Room by D’Décor Studio",
      designer: "D’Décor Studio",
      roomType: "livingRoom",
      style: "Mid-Century",
      imageUrl: "...",
      likes: 218,
      description: "...",
      budget: 8900,
    },
    {
      id: 10,
      title: "Farmhouse Style Kitchen by GharDekho Interiors",
      designer: "GharDekho Interiors",
      roomType: "kitchen",
      style: "Farmhouse",
      imageUrl: "...",
      likes: 246,
      description: "...",
      budget: 9500,
    },
    {
      id: 11,
      title: "Minimalist Bathroom Design by Neha Bansal Design Co.",
      designer: "Neha Bansal Design Co.",
      roomType: "bathroom",
      style: "Minimalist",
      imageUrl: "...",
      likes: 172,
      description: "...",
      budget: 7200,
    },
    {
      id: 12,
      title: "Creative Studio Office by Aarambh Studios",
      designer: "Aarambh Studios",
      roomType: "office",
      style: "Eclectic",
      imageUrl: "...",
      likes: 183,
      description: "...",
      budget: 5500,
    },
  ];

  // Filter projects based on active category, search query, and filters
  const filteredProjects = projects.filter((project) => {
    // Filter by category
    if (activeCategory !== "all" && project.roomType !== activeCategory) {
      return false;
    }
    // Filter by search query
    if (
      searchQuery &&
      !project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !project.designer.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !project.style.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    // Filter by room types
    if (
      selectedFilters.roomTypes.length > 0 &&
      !selectedFilters.roomTypes.includes(project.roomType)
    ) {
      return false;
    }
    // Filter by styles
    if (
      selectedFilters.styles.length > 0 &&
      !selectedFilters.styles.includes(project.style)
    ) {
      return false;
    }
    // Filter by budget
    if (project.budget < budgetRange[0] || project.budget > budgetRange[1]) {
      return false;
    }
    return true;
  });
  // Pagination
  const projectsPerPage = 8;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  // Handle filter changes
  const handleRoomTypeFilter = (roomType) => {
    if (selectedFilters.roomTypes.includes(roomType)) {
      setSelectedFilters({
        ...selectedFilters,
        roomTypes: selectedFilters.roomTypes.filter(
          (type) => type !== roomType
        ),
      });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        roomTypes: [...selectedFilters.roomTypes, roomType],
      });
    }
  };
  const handleStyleFilter = (style) => {
    if (selectedFilters.styles.includes(style)) {
      setSelectedFilters({
        ...selectedFilters,
        styles: selectedFilters.styles.filter((s) => s !== style),
      });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        styles: [...selectedFilters.styles, style],
      });
    }
  };
  const clearFilters = () => {
    setSelectedFilters({
      roomTypes: [],
      styles: [],
      colors: [],
    });
    setBudgetRange([0, 10000]);
    setSearchQuery("");
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-indigo-700/60 z-10"></div>
          <img
            src="https://readdy.ai/api/search-image?query=luxury%20interior%20design%20gallery%20showcase%20with%20multiple%20beautiful%20rooms%20displayed%20in%20a%20modern%20gallery%20setting%2C%20dramatic%20lighting%20highlighting%20stunning%20furniture%20arrangements%2C%20professional%20interior%20design%20portfolio%20display%2C%20high%20end%20design%20exhibition%20with%20elegant%20spaces%2C%20professional%20architectural%20photography&width=1440&height=500&seq=gallery-hero&orientation=landscape"
            alt="Design Gallery"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-20 md:py-28 lg:py-32 max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Design Gallery
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Explore our curated collection of stunning interior designs
              created with DesignVerse. Get inspired for your next project.
            </p>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by project name, designer, or style..."
                  className="pl-10 pr-4 py-3 bg-white/90 border-none text-gray-800 placeholder-gray-500 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Category Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={setActiveCategory}
          >
            <div className="overflow-x-auto">
              <TabsList className="h-16 bg-transparent border-b-0 justify-start">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-6 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  All Projects
                </TabsTrigger>
                <TabsTrigger
                  value="livingRoom"
                  className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-6 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fas fa-couch mr-2"></i> Living Room
                </TabsTrigger>
                <TabsTrigger
                  value="kitchen"
                  className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-6 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fas fa-utensils mr-2"></i> Kitchen
                </TabsTrigger>
                <TabsTrigger
                  value="bedroom"
                  className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-6 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fas fa-bed mr-2"></i> Bedroom
                </TabsTrigger>
                <TabsTrigger
                  value="bathroom"
                  className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-6 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fas fa-bath mr-2"></i> Bathroom
                </TabsTrigger>
                <TabsTrigger
                  value="office"
                  className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-6 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fas fa-briefcase mr-2"></i> Office
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>
      </section>
      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                  <Button
                    variant="ghost"
                    className="text-sm text-indigo-600 hover:text-indigo-800 p-0 h-auto !rounded-button whitespace-nowrap cursor-pointer"
                    onClick={clearFilters}
                  >
                    Clear All
                  </Button>
                </div>
                {/* Room Type Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Room Type
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="livingRoom"
                        checked={selectedFilters.roomTypes.includes(
                          "livingRoom"
                        )}
                        onCheckedChange={() =>
                          handleRoomTypeFilter("livingRoom")
                        }
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor="livingRoom"
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        Living Room
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="kitchen"
                        checked={selectedFilters.roomTypes.includes("kitchen")}
                        onCheckedChange={() => handleRoomTypeFilter("kitchen")}
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor="kitchen"
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        Kitchen
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="bedroom"
                        checked={selectedFilters.roomTypes.includes("bedroom")}
                        onCheckedChange={() => handleRoomTypeFilter("bedroom")}
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor="bedroom"
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        Bedroom
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="bathroom"
                        checked={selectedFilters.roomTypes.includes("bathroom")}
                        onCheckedChange={() => handleRoomTypeFilter("bathroom")}
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor="bathroom"
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        Bathroom
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="office"
                        checked={selectedFilters.roomTypes.includes("office")}
                        onCheckedChange={() => handleRoomTypeFilter("office")}
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor="office"
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        Office
                      </label>
                    </div>
                  </div>
                </div>
                {/* Style Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Style
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="modern"
                        checked={selectedFilters.styles.includes("Modern")}
                        onCheckedChange={() => handleStyleFilter("Modern")}
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor="modern"
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        Modern
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="contemporary"
                        checked={selectedFilters.styles.includes(
                          "Contemporary"
                        )}
                        onCheckedChange={() =>
                          handleStyleFilter("Contemporary")
                        }
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor="contemporary"
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        Contemporary
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="traditional"
                        checked={selectedFilters.styles.includes(
                          "Transitional"
                        )}
                        onCheckedChange={() =>
                          handleStyleFilter("Transitional")
                        }
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor="traditional"
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        Transitional
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="industrial"
                        checked={selectedFilters.styles.includes("Industrial")}
                        onCheckedChange={() => handleStyleFilter("Industrial")}
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor="industrial"
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        Industrial
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="scandinavian"
                        checked={selectedFilters.styles.includes(
                          "Scandinavian"
                        )}
                        onCheckedChange={() =>
                          handleStyleFilter("Scandinavian")
                        }
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor="scandinavian"
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        Scandinavian
                      </label>
                    </div>
                  </div>
                </div>
                {/* Budget Range */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      Budget Range
                    </h4>
                    <span className="text-xs text-gray-500">
                      ${budgetRange[0]} - ${budgetRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 10000]}
                    max={15000}
                    step={500}
                    value={budgetRange}
                    onValueChange={setBudgetRange}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">$0</span>
                    <span className="text-xs text-gray-500">$15,000</span>
                  </div>
                </div>
                {/* Color Palette */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Color Palette
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "bg-gray-200",
                      "bg-indigo-200",
                      "bg-blue-200",
                      "bg-green-200",
                      "bg-yellow-200",
                      "bg-red-200",
                      "bg-purple-200",
                      "bg-pink-200",
                      "bg-orange-200",
                      "bg-teal-200",
                    ].map((color, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded-full ${color} cursor-pointer hover:ring-2 hover:ring-indigo-400 hover:ring-offset-2`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Gallery Grid */}
            <div className="lg:w-3/4">
              {filteredProjects.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    No projects found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button
                    onClick={clearFilters}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {currentProjects.map((project) => (
                      <Card
                        key={project.id}
                        className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 h-full"
                      >
                        <div className="relative h-64 overflow-hidden group">
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <div className="p-4 w-full">
                              <div className="flex justify-between items-center">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-white/90 hover:bg-white text-gray-800 !rounded-button whitespace-nowrap cursor-pointer"
                                  onClick={() => setSelectedProject(project)}
                                >
                                  View Details
                                </Button>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 bg-white/90 hover:bg-white text-gray-800 !rounded-button cursor-pointer"
                                  >
                                    <i className="fas fa-heart text-sm"></i>
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 bg-white/90 hover:bg-white text-gray-800 !rounded-button cursor-pointer"
                                  >
                                    <i className="fas fa-bookmark text-sm"></i>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-5">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-900 line-clamp-1">
                              {project.title}
                            </h3>
                            <div className="flex items-center text-yellow-500 text-sm">
                              <i className="fas fa-heart mr-1"></i>
                              <span className="text-gray-600">
                                {project.likes}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <i className="fas fa-user mr-1"></i>
                            <span>by {project.designer}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                              {project.roomType === "livingRoom"
                                ? "Living Room"
                                : project.roomType === "kitchen"
                                ? "Kitchen"
                                : project.roomType === "bedroom"
                                ? "Bedroom"
                                : project.roomType === "bathroom"
                                ? "Bathroom"
                                : "Office"}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {project.style}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              ${project.budget}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {/* Pagination */}
                  {filteredProjects.length > projectsPerPage && (
                    <div className="mt-8 flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm">
                      <div className="flex flex-1 justify-between sm:hidden">
                        <Button
                          onClick={() =>
                            setCurrentPage(
                              currentPage > 1 ? currentPage - 1 : 1
                            )
                          }
                          disabled={currentPage === 1}
                          variant="outline"
                          className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                          Previous
                        </Button>
                        <Button
                          onClick={() =>
                            setCurrentPage(
                              currentPage < totalPages
                                ? currentPage + 1
                                : totalPages
                            )
                          }
                          disabled={currentPage === totalPages}
                          variant="outline"
                          className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                          Next
                        </Button>
                      </div>
                      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-700">
                            Showing{" "}
                            <span className="font-medium">
                              {indexOfFirstProject + 1}
                            </span>{" "}
                            to{" "}
                            <span className="font-medium">
                              {indexOfLastProject > filteredProjects.length
                                ? filteredProjects.length
                                : indexOfLastProject}
                            </span>{" "}
                            of{" "}
                            <span className="font-medium">
                              {filteredProjects.length}
                            </span>{" "}
                            results
                          </p>
                        </div>
                        <div>
                          <nav
                            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                            aria-label="Pagination"
                          >
                            <Button
                              onClick={() =>
                                setCurrentPage(
                                  currentPage > 1 ? currentPage - 1 : 1
                                )
                              }
                              disabled={currentPage === 1}
                              variant="outline"
                              className="rounded-l-md !rounded-button whitespace-nowrap cursor-pointer"
                            >
                              <i className="fas fa-chevron-left text-xs"></i>
                            </Button>
                            {Array.from(
                              { length: totalPages },
                              (_, i) => i + 1
                            ).map((page) => (
                              <Button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                variant={
                                  currentPage === page ? "default" : "outline"
                                }
                                className={`!rounded-none ${
                                  currentPage === page
                                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                    : "text-gray-500 hover:bg-gray-50"
                                } !rounded-button whitespace-nowrap cursor-pointer`}
                              >
                                {page}
                              </Button>
                            ))}
                            <Button
                              onClick={() =>
                                setCurrentPage(
                                  currentPage < totalPages
                                    ? currentPage + 1
                                    : totalPages
                                )
                              }
                              disabled={currentPage === totalPages}
                              variant="outline"
                              className="rounded-r-md !rounded-button whitespace-nowrap cursor-pointer"
                            >
                              <i className="fas fa-chevron-right text-xs"></i>
                            </Button>
                          </nav>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Project Detail Modal */}
      <Dialog
        open={selectedProject !== null}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedProject && (
            <div className="flex flex-col md:flex-row h-[80vh]">
              <div className="md:w-3/5 h-full bg-gray-100 relative">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-white/90 hover:bg-white text-gray-800 !rounded-button cursor-pointer"
                  >
                    <i className="fas fa-heart text-sm"></i>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-white/90 hover:bg-white text-gray-800 !rounded-button cursor-pointer"
                  >
                    <i className="fas fa-share-alt text-sm"></i>
                  </Button>
                </div>
              </div>
              <div className="md:w-2/5 h-full">
                <ScrollArea className="h-full">
                  <div className="p-6">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-gray-900">
                        {selectedProject.title}
                      </DialogTitle>
                      <DialogDescription className="text-gray-500">
                        Designed by {selectedProject.designer}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Project Details
                      </h4>
                      <p className="text-gray-600 mb-4">
                        {selectedProject.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-xs text-gray-500">Room Type</div>
                          <div className="font-medium text-gray-900">
                            {selectedProject.roomType === "livingRoom"
                              ? "Living Room"
                              : selectedProject.roomType === "kitchen"
                              ? "Kitchen"
                              : selectedProject.roomType === "bedroom"
                              ? "Bedroom"
                              : selectedProject.roomType === "bathroom"
                              ? "Bathroom"
                              : "Office"}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-xs text-gray-500">Style</div>
                          <div className="font-medium text-gray-900">
                            {selectedProject.style}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-xs text-gray-500">Budget</div>
                          <div className="font-medium text-gray-900">
                            ${selectedProject.budget}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-xs text-gray-500">Likes</div>
                          <div className="font-medium text-gray-900">
                            {selectedProject.likes}
                          </div>
                        </div>
                      </div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Designer
                      </h4>
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-3">
                          <i className="fas fa-user"></i>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {selectedProject.designer}
                          </div>
                          <div className="text-sm text-gray-500">
                            Professional Interior Designer
                          </div>
                        </div>
                      </div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Similar Projects
                      </h4>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {projects
                          .filter(
                            (p) =>
                              p.id !== selectedProject.id &&
                              p.roomType === selectedProject.roomType
                          )
                          .slice(0, 4)
                          .map((project) => (
                            <div
                              key={project.id}
                              className="relative h-24 rounded overflow-hidden cursor-pointer"
                              onClick={() => setSelectedProject(project)}
                            >
                              <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover object-top"
                              />
                              <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-colors flex items-center justify-center">
                                <div className="text-white text-xs font-medium text-center px-2">
                                  {project.title}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="flex flex-col space-y-3">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
                          View Full Project
                        </Button>
                        <Button
                          variant="outline"
                          className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                          Contact Designer
                        </Button>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">DesignVerse</h3>
              <p className="text-gray-400 mb-4">
                Transforming how designers create and visualize spaces with
                cutting-edge technology.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white text-md font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Case Studies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Reviews
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Updates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-md font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Tutorials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Webinars
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-md font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Partners
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} DesignVerse. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white cursor-pointer"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white cursor-pointer"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white cursor-pointer"
              >
                Cookie Policy
              </a>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <span className="text-sm text-gray-400">Payment Methods:</span>
              <i className="fab fa-cc-visa text-gray-400"></i>
              <i className="fab fa-cc-mastercard text-gray-400"></i>
              <i className="fab fa-cc-amex text-gray-400"></i>
              <i className="fab fa-cc-paypal text-gray-400"></i>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Ideas;
