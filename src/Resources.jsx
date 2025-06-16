// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// interface Resource {
//   id: number;
//   title: string;
//   description: string;
//   type: "article" | "video" | "template" | "forum";
//   category: string;
//   author: string;
//   date: string;
//   imageUrl: string;
//   views: number;
//   downloads?: number;
//   difficulty: "beginner" | "intermediate" | "advanced";
//   tags: string[];
//   content?: string;
//   videoUrl?: string;
//   downloadUrl?: string;
//   forumUrl?: string;
// }
const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedResource, setSelectedResource] = useState(null > null);
  const [selectedFilters, setSelectedFilters] = useState({
    types: [],
    categories: [],
    difficulties: [],
  });
  const [sortOption, setSortOption] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const resources = [
    {
      id: 1,
      title: "Color Theory for Interior Design",
      description:
        "Learn how color psychology affects interior spaces and how to create harmonious color schemes for different rooms.",
      type: "article",
      category: "Design Fundamentals",
      author: "Emma Wilson",
      date: "June 10, 2025",
      imageUrl:
        "https://readdy.ai/api/search-image?query=interior%20design%20color%20theory%20article%20with%20color%20wheel%20and%20room%20examples%20showing%20different%20color%20schemes%20in%20modern%20interiors%20with%20clean%20layout%20professional%20photography%20of%20interior%20design%20color%20palettes&width=600&height=400&seq=article1&orientation=landscape",
      views: 3452,
      difficulty: "beginner",
      tags: ["color theory", "psychology", "palettes"],
      content:
        "Color theory is the foundation of creating harmonious interior spaces...",
    },
    {
      id: 2,
      title: "Furniture Arrangement Principles",
      description:
        "Master the art of furniture placement with these essential principles for balance, flow, and functionality.",
      type: "article",
      category: "Space Planning",
      author: "Michael Chen",
      date: "June 5, 2025",
      imageUrl:
        "https://readdy.ai/api/search-image?query=interior%20design%20article%20about%20furniture%20arrangement%20showing%20before%20and%20after%20layouts%20of%20living%20room%20with%20proper%20spacing%20and%20flow%20diagrams%20professional%20photography%20of%20interior%20design%20space%20planning%20with%20furniture%20placement&width=600&height=400&seq=article2&orientation=landscape",
      views: 2187,
      difficulty: "intermediate",
      tags: ["furniture", "layout", "space planning"],
      content:
        "The arrangement of furniture can make or break an interior space...",
    },
    {
      id: 3,
      title: "Lighting Design Masterclass",
      description:
        "Comprehensive video tutorial on creating layered lighting designs for residential spaces.",
      type: "video",
      category: "Lighting",
      author: "Sarah Johnson",
      date: "May 28, 2025",
      imageUrl:
        "https://readdy.ai/api/search-image?query=interior%20design%20video%20tutorial%20thumbnail%20showing%20different%20lighting%20techniques%20in%20a%20modern%20living%20room%20with%20ambient%20accent%20and%20task%20lighting%20demonstrated%20professional%20photography%20of%20interior%20lighting%20design%20techniques&width=600&height=400&seq=video1&orientation=landscape",
      views: 5621,
      difficulty: "intermediate",
      tags: ["lighting", "ambience", "fixtures"],
      videoUrl: "https://example.com/videos/lighting-masterclass",
    },
    {
      id: 4,
      title: "Small Space Solutions",
      description:
        "Video guide to maximizing functionality and style in compact living spaces.",
      type: "video",
      category: "Space Planning",
      author: "David Park",
      date: "May 22, 2025",
      imageUrl:
        "https://readdy.ai/api/search-image?query=interior%20design%20video%20tutorial%20thumbnail%20showing%20small%20apartment%20with%20clever%20storage%20solutions%20and%20multifunctional%20furniture%20professional%20photography%20of%20small%20space%20interior%20design%20with%20smart%20solutions&width=600&height=400&seq=video2&orientation=landscape",
      views: 4873,
      difficulty: "beginner",
      tags: ["small spaces", "storage", "multifunctional"],
      videoUrl: "https://example.com/videos/small-space-solutions",
    },
    {
      id: 5,
      title: "Modern Living Room Template",
      description:
        "Ready-to-use template for creating sophisticated modern living room designs.",
      type: "template",
      category: "Room Templates",
      author: "DesignVerse Team",
      date: "June 12, 2025",
      imageUrl:
        "https://readdy.ai/api/search-image?query=interior%20design%20template%20for%20modern%20living%20room%20with%20furniture%20layout%20floor%20plan%20material%20board%20and%203D%20visualization%20professional%20template%20for%20interior%20design%20project%20with%20clean%20modern%20aesthetic&width=600&height=400&seq=template1&orientation=landscape",
      views: 3289,
      downloads: 876,
      difficulty: "intermediate",
      tags: ["living room", "modern", "template"],
      downloadUrl: "https://example.com/templates/modern-living-room",
    },
    {
      id: 6,
      title: "Kitchen Design Specification Sheet",
      description:
        "Comprehensive template for kitchen design projects including measurements and material specifications.",
      type: "template",
      category: "Technical Documents",
      author: "DesignVerse Team",
      date: "June 2, 2025",
      imageUrl:
        "https://readdy.ai/api/search-image?query=interior%20design%20kitchen%20specification%20template%20with%20detailed%20measurements%20cabinet%20layouts%20material%20specifications%20and%20technical%20drawings%20professional%20template%20for%20kitchen%20design%20projects%20with%20technical%20details&width=600&height=400&seq=template2&orientation=landscape",
      views: 2754,
      downloads: 612,
      difficulty: "advanced",
      tags: ["kitchen", "specifications", "technical"],
      downloadUrl: "https://example.com/templates/kitchen-spec-sheet",
    },
    {
      id: 7,
      title: "Sustainable Materials Discussion",
      description:
        "Join the conversation about eco-friendly and sustainable materials for modern interior design.",
      type: "forum",
      category: "Sustainability",
      author: "Community",
      date: "June 15, 2025",
      imageUrl:
        "https://readdy.ai/api/search-image?query=interior%20design%20forum%20discussion%20about%20sustainable%20materials%20showing%20eco%20friendly%20material%20samples%20and%20green%20design%20elements%20professional%20photography%20of%20sustainable%20interior%20design%20materials%20and%20discussion&width=600&height=400&seq=forum1&orientation=landscape",
      views: 1876,
      difficulty: "intermediate",
      tags: ["sustainability", "eco-friendly", "materials"],
      forumUrl: "https://example.com/forum/sustainable-materials",
    },
    {
      id: 8,
      title: "Client Communication Strategies",
      description:
        "Community discussion on effective communication techniques with interior design clients.",
      type: "forum",
      category: "Business",
      author: "Community",
      date: "June 8, 2025",
      imageUrl:
        "https://readdy.ai/api/search-image?query=interior%20design%20forum%20about%20client%20communication%20showing%20designer%20meeting%20with%20clients%20presenting%20design%20boards%20and%20discussing%20project%20details%20professional%20photography%20of%20interior%20designer%20client%20meeting%20with%20communication%20focus&width=600&height=400&seq=forum2&orientation=landscape",
      views: 1543,
      difficulty: "intermediate",
      tags: ["client relations", "communication", "business"],
      forumUrl: "https://example.com/forum/client-communication",
    },
    {
      id: 9,
      title: "Biophilic Design Principles",
      description:
        "Learn how to incorporate nature-inspired elements into your interior designs for healthier spaces.",
      type: "article",
      category: "Design Trends",
      author: "Olivia Green",
      date: "May 25, 2025",
      imageUrl:
        "https://readdy.ai/api/search-image?query=interior%20design%20article%20about%20biophilic%20design%20showing%20interior%20spaces%20with%20abundant%20plants%20natural%20materials%20natural%20light%20and%20organic%20shapes%20professional%20photography%20of%20biophilic%20interior%20design%20with%20nature%20elements&width=600&height=400&seq=article3&orientation=landscape",
      views: 2865,
      difficulty: "intermediate",
      tags: ["biophilic", "nature", "wellness"],
      content: "Biophilic design connects occupants more closely to nature...",
    },
    {
      id: 10,
      title: "Bathroom Renovation Guide",
      description:
        "Step-by-step video tutorial on planning and executing a successful bathroom renovation.",
      type: "video",
      category: "Renovations",
      author: "Robert Taylor",
      date: "May 18, 2025",
      imageUrl:
        "https://readdy.ai/api/search-image?query=interior%20design%20video%20tutorial%20thumbnail%20showing%20bathroom%20renovation%20process%20with%20before%20and%20after%20shots%20and%20construction%20steps%20professional%20photography%20of%20bathroom%20renovation%20interior%20design%20tutorial&width=600&height=400&seq=video3&orientation=landscape",
      views: 6234,
      difficulty: "advanced",
      tags: ["bathroom", "renovation", "plumbing"],
      videoUrl: "https://example.com/videos/bathroom-renovation",
    },
    {
      id: 11,
      title: "Residential Project Proposal Template",
      description:
        "Professional template for creating comprehensive interior design project proposals for clients.",
      type: "template",
      category: "Business Documents",
      author: "DesignVerse Team",
      date: "June 7, 2025",
      imageUrl:
        "https://readdy.ai/api/search-image?query=interior%20design%20business%20proposal%20template%20with%20project%20timeline%20budget%20breakdown%20material%20selections%20and%20professional%20layout%20professional%20template%20for%20interior%20design%20project%20proposals%20with%20business%20documents&width=600&height=400&seq=template3&orientation=landscape",
      views: 3012,
      downloads: 745,
      difficulty: "intermediate",
      tags: ["business", "proposal", "client"],
      downloadUrl: "https://example.com/templates/project-proposal",
    },
    {
      id: 12,
      title: "Trending Materials for 2025",
      description:
        "Community discussion on the hottest material trends in interior design for the current year.",
      type: "forum",
      category: "Design Trends",
      author: "Community",
      date: "June 3, 2025",
      imageUrl:
        "https://readdy.ai/api/search-image?query=interior%20design%20forum%20about%20trending%20materials%20for%202025%20showing%20innovative%20surface%20materials%20fabric%20samples%20and%20new%20finishes%20professional%20photography%20of%20interior%20design%20material%20trends%20with%20samples%20and%20swatches&width=600&height=400&seq=forum3&orientation=landscape",
      views: 2187,
      difficulty: "beginner",
      tags: ["trends", "materials", "2025"],
      forumUrl: "https://example.com/forum/trending-materials-2025",
    },
  ];
  // Filter resources based on active tab, search query, and filters
  const filteredResources = resources.filter((resource) => {
    // Filter by tab
    if (activeTab !== "all" && resource.type !== activeTab) {
      return false;
    }
    // Filter by search query
    if (
      searchQuery &&
      !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !resource.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !resource.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    // Filter by resource types
    if (
      selectedFilters.types.length > 0 &&
      !selectedFilters.types.includes(resource.type)
    ) {
      return false;
    }
    // Filter by categories
    if (
      selectedFilters.categories.length > 0 &&
      !selectedFilters.categories.includes(resource.category)
    ) {
      return false;
    }
    // Filter by difficulty
    if (
      selectedFilters.difficulties.length > 0 &&
      !selectedFilters.difficulties.includes(resource.difficulty)
    ) {
      return false;
    }
    return true;
  });
  // Sort resources
  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "popular":
        return b.views - a.views;
      case "az":
        return a.title.localeCompare(b.title);
      case "za":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });
  const handleTypeFilter = (type) => {
    if (selectedFilters.types.includes(type)) {
      setSelectedFilters({
        ...selectedFilters,
        types: selectedFilters.types.filter((t) => t !== type),
      });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        types: [...selectedFilters.types, type],
      });
    }
  };
  const handleCategoryFilter = (category) => {
    if (selectedFilters.categories.includes(category)) {
      setSelectedFilters({
        ...selectedFilters,
        categories: selectedFilters.categories.filter((c) => c !== category),
      });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        categories: [...selectedFilters.categories, category],
      });
    }
  };
  const handleDifficultyFilter = (difficulty) => {
    if (selectedFilters.difficulties.includes(difficulty)) {
      setSelectedFilters({
        ...selectedFilters,
        difficulties: selectedFilters.difficulties.filter(
          (d) => d !== difficulty
        ),
      });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        difficulties: [...selectedFilters.difficulties, difficulty],
      });
    }
  };
  const clearFilters = () => {
    setSelectedFilters({
      types: [],
      categories: [],
      difficulties: [],
    });
    setSearchQuery("");
    setSortOption("newest");
  };
  // Get unique categories for filter
  const categories = Array.from(
    new Set(resources.map((resource) => resource.category))
  );
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-700/70 z-10"></div>
          <img
            src="https://readdy.ai/api/search-image?query=interior%20design%20resources%20library%20with%20design%20books%20materials%20samples%20digital%20tools%20and%20educational%20content%20in%20a%20modern%20studio%20environment%20with%20soft%20lighting%20and%20professional%20organization%20professional%20photography%20of%20interior%20design%20educational%20resources&width=1440&height=500&seq=resources-hero&orientation=landscape"
            alt="Design Resources"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-20 md:py-28 lg:py-32 max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Design Resources
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Explore our curated collection of guides, tutorials, templates,
              and community discussions to elevate your interior design skills
              and projects.
            </p>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for resources, topics, or categories..."
                  className="pl-10 pr-4 py-3 bg-white/90 border-none text-gray-800 placeholder-gray-500 w-full text-sm"
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
            onValueChange={setActiveTab}
          >
            <div className="overflow-x-auto">
              <TabsList className="h-16 bg-transparent border-b-0 justify-start">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-6 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  All Resources
                </TabsTrigger>
                <TabsTrigger
                  value="article"
                  className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-6 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fas fa-book-open mr-2"></i> Articles & Guides
                </TabsTrigger>
                <TabsTrigger
                  value="video"
                  className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-6 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fas fa-video mr-2"></i> Video Tutorials
                </TabsTrigger>
                <TabsTrigger
                  value="template"
                  className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-6 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fas fa-file-alt mr-2"></i> Templates & Downloads
                </TabsTrigger>
                <TabsTrigger
                  value="forum"
                  className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-6 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fas fa-comments mr-2"></i> Community Forum
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
                {/* Resource Type Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Resource Type
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="article"
                        checked={selectedFilters.types.includes("article")}
                        onCheckedChange={() => handleTypeFilter("article")}
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor="article"
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        Articles & Guides
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="video"
                        checked={selectedFilters.types.includes("video")}
                        onCheckedChange={() => handleTypeFilter("video")}
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor="video"
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        Video Tutorials
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="template"
                        checked={selectedFilters.types.includes("template")}
                        onCheckedChange={() => handleTypeFilter("template")}
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor="template"
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        Templates & Downloads
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="forum"
                        checked={selectedFilters.types.includes("forum")}
                        onCheckedChange={() => handleTypeFilter("forum")}
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor="forum"
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        Community Forum
                      </label>
                    </div>
                  </div>
                </div>
                {/* Categories Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Categories
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center">
                        <Checkbox
                          id={`category-${index}`}
                          checked={selectedFilters.categories.includes(
                            category
                          )}
                          onCheckedChange={() => handleCategoryFilter(category)}
                          className="cursor-pointer"
                        />
                        <label
                          htmlFor={`category-${index}`}
                          className="ml-2 text-sm text-gray-600 cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Difficulty Level Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Difficulty Level
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="beginner"
                        checked={selectedFilters.difficulties.includes(
                          "beginner"
                        )}
                        onCheckedChange={() =>
                          handleDifficultyFilter("beginner")
                        }
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor="beginner"
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        Beginner
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="intermediate"
                        checked={selectedFilters.difficulties.includes(
                          "intermediate"
                        )}
                        onCheckedChange={() =>
                          handleDifficultyFilter("intermediate")
                        }
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor="intermediate"
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        Intermediate
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="advanced"
                        checked={selectedFilters.difficulties.includes(
                          "advanced"
                        )}
                        onCheckedChange={() =>
                          handleDifficultyFilter("advanced")
                        }
                        className="cursor-pointer"
                      />
                      <label
                        htmlFor="advanced"
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        Advanced
                      </label>
                    </div>
                  </div>
                </div>
                {/* Popular Tags */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Popular Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "color theory",
                      "space planning",
                      "lighting",
                      "materials",
                      "sustainability",
                      "business",
                      "trends",
                      "renovation",
                    ].map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Resources Grid */}
            <div className="lg:w-3/4">
              {/* Sort and View Options */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-center">
                <div className="flex items-center mb-4 sm:mb-0">
                  <span className="text-sm text-gray-500 mr-2">Sort by:</span>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-[180px] h-9 text-sm !rounded-button">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="az">A-Z</SelectItem>
                      <SelectItem value="za">Z-A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">View:</span>
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    className="h-9 w-9 !rounded-button cursor-pointer"
                    onClick={() => setViewMode("grid")}
                  >
                    <i className="fas fa-th-large"></i>
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    className="h-9 w-9 !rounded-button cursor-pointer"
                    onClick={() => setViewMode("list")}
                  >
                    <i className="fas fa-list"></i>
                  </Button>
                </div>
              </div>
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-medium">{sortedResources.length}</span>{" "}
                  resources
                  {activeTab !== "all" && ` in ${activeTab}s`}
                  {selectedFilters.categories.length > 0 &&
                    ` for ${selectedFilters.categories.join(", ")}`}
                </p>
              </div>
              {sortedResources.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    No resources found
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
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sortedResources.map((resource) => (
                        <Card
                          key={resource.id}
                          className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col"
                        >
                          <div className="relative h-48 overflow-hidden group">
                            <img
                              src={resource.imageUrl}
                              alt={resource.title}
                              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-0 left-0 m-3">
                              <Badge
                                className={`
${
  resource.type === "article"
    ? "bg-blue-500"
    : resource.type === "video"
    ? "bg-red-500"
    : resource.type === "template"
    ? "bg-green-500"
    : "bg-purple-500"
}
text-white
`}
                              >
                                {resource.type === "article" ? (
                                  <i className="fas fa-book-open mr-1"></i>
                                ) : resource.type === "video" ? (
                                  <i className="fas fa-video mr-1"></i>
                                ) : resource.type === "template" ? (
                                  <i className="fas fa-file-alt mr-1"></i>
                                ) : (
                                  <i className="fas fa-comments mr-1"></i>
                                )}
                                {resource.type.charAt(0).toUpperCase() +
                                  resource.type.slice(1)}
                              </Badge>
                            </div>
                            <div className="absolute bottom-0 right-0 m-3">
                              <Badge className="bg-gray-800/70 text-white">
                                {resource.difficulty === "beginner"
                                  ? "Beginner"
                                  : resource.difficulty === "intermediate"
                                  ? "Intermediate"
                                  : "Advanced"}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-5 flex-grow">
                            <div className="mb-2">
                              <h3 className="font-bold text-gray-900 line-clamp-2 text-lg">
                                {resource.title}
                              </h3>
                            </div>
                            <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                              {resource.description}
                            </p>
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <i className="fas fa-user-circle mr-1"></i>
                              <span>{resource.author}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <i className="far fa-calendar-alt mr-1"></i>
                              <span>{resource.date}</span>
                            </div>
                          </CardContent>
                          <CardFooter className="p-5 pt-0 border-t border-gray-100 mt-auto">
                            <div className="flex justify-between items-center w-full">
                              <div className="flex items-center space-x-3 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <i className="far fa-eye mr-1"></i>{" "}
                                  {resource.views}
                                </span>
                                {resource.downloads && (
                                  <span className="flex items-center">
                                    <i className="fas fa-download mr-1"></i>{" "}
                                    {resource.downloads}
                                  </span>
                                )}
                              </div>
                              <Button
                                size="sm"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white !rounded-button whitespace-nowrap cursor-pointer"
                                onClick={() => setSelectedResource(resource)}
                              >
                                View Resource
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {sortedResources.map((resource) => (
                        <Card
                          key={resource.id}
                          className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 relative">
                              <img
                                src={resource.imageUrl}
                                alt={resource.title}
                                className="w-full h-48 md:h-full object-cover object-top"
                              />
                              <div className="absolute top-0 left-0 m-3">
                                <Badge
                                  className={`
${
  resource.type === "article"
    ? "bg-blue-500"
    : resource.type === "video"
    ? "bg-red-500"
    : resource.type === "template"
    ? "bg-green-500"
    : "bg-purple-500"
}
text-white
`}
                                >
                                  {resource.type === "article" ? (
                                    <i className="fas fa-book-open mr-1"></i>
                                  ) : resource.type === "video" ? (
                                    <i className="fas fa-video mr-1"></i>
                                  ) : resource.type === "template" ? (
                                    <i className="fas fa-file-alt mr-1"></i>
                                  ) : (
                                    <i className="fas fa-comments mr-1"></i>
                                  )}
                                  {resource.type.charAt(0).toUpperCase() +
                                    resource.type.slice(1)}
                                </Badge>
                              </div>
                            </div>
                            <div className="md:w-3/4 p-5">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-bold text-gray-900 text-lg">
                                    {resource.title}
                                  </h3>
                                  <div className="flex items-center text-sm text-gray-500 mt-1 mb-2">
                                    <span className="flex items-center mr-4">
                                      <i className="fas fa-user-circle mr-1"></i>{" "}
                                      {resource.author}
                                    </span>
                                    <span className="flex items-center mr-4">
                                      <i className="far fa-calendar-alt mr-1"></i>{" "}
                                      {resource.date}
                                    </span>
                                    <span className="flex items-center mr-4">
                                      <i className="far fa-eye mr-1"></i>{" "}
                                      {resource.views}
                                    </span>
                                    {resource.downloads && (
                                      <span className="flex items-center">
                                        <i className="fas fa-download mr-1"></i>{" "}
                                        {resource.downloads}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <Badge className="bg-gray-800/70 text-white">
                                  {resource.difficulty === "beginner"
                                    ? "Beginner"
                                    : resource.difficulty === "intermediate"
                                    ? "Intermediate"
                                    : "Advanced"}
                                </Badge>
                              </div>
                              <p className="text-gray-600 mb-4">
                                {resource.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                <Badge
                                  variant="outline"
                                  className="bg-gray-100 text-gray-800"
                                >
                                  {resource.category}
                                </Badge>
                                {resource.tags.map((tag, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="bg-gray-100 text-gray-800"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex justify-end">
                                <Button
                                  className="bg-indigo-600 hover:bg-indigo-700 text-white !rounded-button whitespace-nowrap cursor-pointer"
                                  onClick={() => setSelectedResource(resource)}
                                >
                                  View Resource
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Resource Detail Modal */}
      <Dialog
        open={selectedResource !== null}
        onOpenChange={(open) => !open && setSelectedResource(null)}
      >
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedResource && (
            <div className="flex flex-col md:flex-row h-[80vh]">
              <div className="md:w-1/2 h-full bg-gray-100 relative">
                <img
                  src={selectedResource.imageUrl}
                  alt={selectedResource.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-white/90 hover:bg-white text-gray-800 !rounded-button cursor-pointer"
                  >
                    <i className="fas fa-bookmark text-sm"></i>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-white/90 hover:bg-white text-gray-800 !rounded-button cursor-pointer"
                  >
                    <i className="fas fa-share-alt text-sm"></i>
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge
                    className={`
${
  selectedResource.type === "article"
    ? "bg-blue-500"
    : selectedResource.type === "video"
    ? "bg-red-500"
    : selectedResource.type === "template"
    ? "bg-green-500"
    : "bg-purple-500"
}
text-white text-sm px-3 py-1
`}
                  >
                    {selectedResource.type === "article" ? (
                      <i className="fas fa-book-open mr-1"></i>
                    ) : selectedResource.type === "video" ? (
                      <i className="fas fa-video mr-1"></i>
                    ) : selectedResource.type === "template" ? (
                      <i className="fas fa-file-alt mr-1"></i>
                    ) : (
                      <i className="fas fa-comments mr-1"></i>
                    )}
                    {selectedResource.type.charAt(0).toUpperCase() +
                      selectedResource.type.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="md:w-1/2 h-full">
                <ScrollArea className="h-full">
                  <div className="p-6">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-gray-900">
                        {selectedResource.title}
                      </DialogTitle>
                      <DialogDescription className="text-gray-500 flex items-center">
                        <span className="mr-2">
                          By {selectedResource.author}
                        </span>{" "}
                        • <span className="ml-2">{selectedResource.date}</span>
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-6">
                      <div className="flex items-center space-x-3 text-sm text-gray-500 mb-4">
                        <Badge className="bg-gray-800/70 text-white">
                          {selectedResource.difficulty === "beginner"
                            ? "Beginner"
                            : selectedResource.difficulty === "intermediate"
                            ? "Intermediate"
                            : "Advanced"}
                        </Badge>
                        <span className="flex items-center">
                          <i className="far fa-eye mr-1"></i>{" "}
                          {selectedResource.views} views
                        </span>
                        {selectedResource.downloads && (
                          <span className="flex items-center">
                            <i className="fas fa-download mr-1"></i>{" "}
                            {selectedResource.downloads} downloads
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Description
                      </h4>
                      <p className="text-gray-600 mb-6">
                        {selectedResource.description}
                      </p>
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Category
                        </h4>
                        <Badge
                          variant="outline"
                          className="bg-gray-100 text-gray-800"
                        >
                          {selectedResource.category}
                        </Badge>
                      </div>
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Tags
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedResource.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-gray-100 text-gray-800"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {selectedResource.type === "video" && (
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">
                            Video Preview
                          </h4>
                          <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
                            <div className="text-center">
                              <i className="fas fa-play-circle text-4xl text-indigo-600 mb-2"></i>
                              <p className="text-sm text-gray-600">
                                Click to play video tutorial
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {selectedResource.type === "template" && (
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">
                            Template Preview
                          </h4>
                          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600">
                                Template format: PDF, DOCX
                              </span>
                              <span className="text-sm text-gray-600">
                                Size: 2.4 MB
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">
                                Last updated: {selectedResource.date}
                              </span>
                              <span className="text-sm text-gray-600">
                                Version: 2.1
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      {selectedResource.type === "forum" && (
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">
                            Discussion Activity
                          </h4>
                          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600">
                                Participants: 42
                              </span>
                              <span className="text-sm text-gray-600">
                                Replies: 87
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">
                                Started: {selectedResource.date}
                              </span>
                              <span className="text-sm text-gray-600">
                                Last activity: Today
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Related Resources
                      </h4>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {resources
                          .filter(
                            (r) =>
                              r.id !== selectedResource.id &&
                              (r.category === selectedResource.category ||
                                r.type === selectedResource.type)
                          )
                          .slice(0, 4)
                          .map((resource) => (
                            <div
                              key={resource.id}
                              className="relative h-24 rounded overflow-hidden cursor-pointer"
                              onClick={() => setSelectedResource(resource)}
                            >
                              <img
                                src={resource.imageUrl}
                                alt={resource.title}
                                className="w-full h-full object-cover object-top"
                              />
                              <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-colors flex items-center justify-center">
                                <div className="text-white text-xs font-medium text-center px-2">
                                  {resource.title}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      <Separator className="my-6" />
                      <div className="flex flex-col space-y-3">
                        {selectedResource.type === "article" && (
                          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
                            Read Full Article
                          </Button>
                        )}
                        {selectedResource.type === "video" && (
                          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
                            Watch Tutorial
                          </Button>
                        )}
                        {selectedResource.type === "template" && (
                          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
                            <i className="fas fa-download mr-2"></i> Download
                            Template
                          </Button>
                        )}
                        {selectedResource.type === "forum" && (
                          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
                            Join Discussion
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          className="!rounded-button whitespace-nowrap cursor-pointer"
                        >
                          <i className="fas fa-bookmark mr-2"></i> Save for
                          Later
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
      {/* Newsletter Section */}
      <section className="bg-indigo-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">
                Stay Updated with Design Resources
              </h2>
              <p className="text-indigo-200 mb-6">
                Subscribe to our newsletter to receive the latest design
                resources, tutorials, and industry insights directly to your
                inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-indigo-700 text-white placeholder-indigo-300 text-sm"
                />
                <Button className="bg-white text-indigo-900 hover:bg-indigo-100 !rounded-button whitespace-nowrap cursor-pointer">
                  Subscribe
                </Button>
              </div>
            </div>
            <div className="md:w-2/5">
              <div className="bg-indigo-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Resource of the Week
                </h3>
                <div className="flex items-center">
                  <div className="w-20 h-20 rounded overflow-hidden mr-4 flex-shrink-0">
                    <img
                      src="https://readdy.ai/api/search-image?query=interior%20design%20color%20theory%20article%20with%20color%20wheel%20and%20room%20examples%20showing%20different%20color%20schemes%20in%20modern%20interiors%20with%20clean%20layout%20professional%20photography%20of%20interior%20design%20color%20palettes&width=80&height=80&seq=featured&orientation=squarish"
                      alt="Featured Resource"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">
                      Color Theory for Interior Design
                    </h4>
                    <p className="text-indigo-200 text-sm mb-2">
                      Learn how color psychology affects interior spaces.
                    </p>
                    <Badge className="bg-blue-500 text-white">
                      <i className="fas fa-book-open mr-1"></i> Article
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
              <h4 className="text-white text-md font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Articles & Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Video Tutorials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Templates & Downloads
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Community Forum
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    Design Webinars
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
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-md font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://readdy.ai/home/c8b8a774-b463-401e-a3c1-7a887584c80a/de7a79dc-583e-4fd3-a9ab-a31b6b960639"
                    data-readdy="true"
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
              © 2025 DesignVerse. All rights reserved.
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
export default Resources;
