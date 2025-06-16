// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Home = () => {
  const [activeTab, setActiveTab] = useState("2d-3d");

  // For parallax effect on hero section
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const features = [
    {
      title: "2D/3D Floor Planning",
      description:
        "Create detailed floor plans and visualize them in stunning 3D with our intuitive tools.",
      icon: "fas fa-cube",
      color: "bg-gradient-to-br from-blue-500 to-indigo-600",
    },
    {
      title: "AI Design Suggestions",
      description:
        "Get intelligent design recommendations based on your space, preferences, and the latest trends.",
      icon: "fas fa-lightbulb",
      color: "bg-gradient-to-br from-amber-500 to-orange-600",
    },
    {
      title: "AR Visualization",
      description:
        "See how furniture and décor will look in your actual space with augmented reality support.",
      icon: "fas fa-vr-cardboard",
      color: "bg-gradient-to-br from-emerald-500 to-teal-600",
    },
    {
      title: "8,000+ Item Catalog",
      description:
        "Access our extensive library of furniture, fixtures, materials, and décor items for any style.",
      icon: "fas fa-box-open",
      color: "bg-gradient-to-br from-purple-500 to-pink-600",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Interior Designer",
      quote:
        "DesignVerse has revolutionized my workflow. The AI suggestions save me hours of research, and clients love the immersive 3D presentations.",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20female%20interior%20designer%20with%20short%20brown%20hair%2C%20warm%20smile%2C%20creative%20professional%20appearance%2C%20neutral%20background%2C%20photorealistic%2C%20high%20quality%2C%20studio%20lighting&width=100&height=100&seq=1&orientation=squarish",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Homeowner",
      quote:
        "As someone with zero design experience, DesignVerse made renovating my home actually enjoyable. The AR feature helped me avoid costly mistakes.",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20an%20Asian%20man%20in%20his%2030s%20with%20glasses%2C%20friendly%20smile%2C%20casual%20smart%20attire%2C%20neutral%20background%2C%20photorealistic%2C%20high%20quality%2C%20studio%20lighting&width=100&height=100&seq=2&orientation=squarish",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Architect",
      quote:
        "The seamless transition between 2D planning and 3D visualization has improved our client presentations dramatically. It's now an essential part of our toolkit.",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20latina%20woman%20architect%20with%20long%20dark%20hair%2C%20confident%20expression%2C%20professional%20attire%2C%20neutral%20background%2C%20photorealistic%2C%20high%20quality%2C%20studio%20lighting&width=100&height=100&seq=3&orientation=squarish",
      rating: 5,
    },
    {
      name: "David Thompson",
      role: "Real Estate Developer",
      quote:
        "DesignVerse helps us sell properties before they're even built. The photorealistic renders and virtual tours give buyers confidence in their purchase.",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20an%20African%20American%20man%20in%20business%20attire%2C%20confident%20smile%2C%20professional%20appearance%2C%20neutral%20background%2C%20photorealistic%2C%20high%20quality%2C%20studio%20lighting&width=100&height=100&seq=4&orientation=squarish",
      rating: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      {/* <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fas fa-cube text-indigo-600 text-2xl"></i>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              DesignVerse
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium cursor-pointer"
            >
              Features
            </a>
            <a
              href="#demo"
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium cursor-pointer"
            >
              Demo
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium cursor-pointer"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium cursor-pointer"
            >
              Pricing
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="!rounded-button whitespace-nowrap cursor-pointer"
            >
              Log In
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
              Sign Up
            </Button>
            <button className="md:hidden text-gray-700 cursor-pointer">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20luxurious%20interior%20design%20with%20large%20windows%2C%20natural%20light%2C%20minimalist%20furniture%2C%20open%20space%20concept%2C%203D%20visualization%20with%20perfect%20lighting%2C%20photorealistic%20rendering%2C%20high-end%20architectural%20visualization%2C%20soft%20gradient%20background%20on%20the%20left%20side%20for%20text%20overlay&width=1440&height=800&seq=5&orientation=landscape')`,
            transform: `translateY(${offset * 0.2}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-indigo-900/70 to-transparent"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-start">
          <div className="max-w-2xl">
            <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm cursor-pointer">
              AI-Powered Design Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Design Your Dream Space in 3D
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
              Transform your ideas into stunning interiors with our AI-powered
              design platform. Create, visualize, and bring your space to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 !rounded-button whitespace-nowrap cursor-pointer"
              >
                Start Designing <i className="fas fa-arrow-right ml-2"></i>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 !rounded-button whitespace-nowrap cursor-pointer"
              >
                <i className="fas fa-play mr-2"></i> Watch Demo
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <p className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                8,000+
              </p>
              <p className="text-gray-600">Design Items</p>
            </div>
            <div className="p-6">
              <p className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                250K+
              </p>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="p-6">
              <p className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                1M+
              </p>
              <p className="text-gray-600">Projects Created</p>
            </div>
            <div className="p-6">
              <p className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                98%
              </p>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge className="mb-3 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 cursor-pointer">
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Tools for Your Design Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive suite of design tools empowers you to create
              stunning spaces with ease and precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 ${feature.color}`}
                  >
                    <i className={`${feature.icon} text-xl`}></i>
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="text-indigo-600 hover:text-indigo-800 p-0 !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    Learn more <i className="fas fa-arrow-right ml-2"></i>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
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
              See how DesignVerse transforms your ideas into beautiful,
              functional spaces with our powerful design tools.
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
                        Seamlessly switch between 2D floor plans and immersive
                        3D visualizations. Drag and drop elements, adjust
                        dimensions, and see your changes in real-time.
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
                        designs to suggest the perfect elements for your
                        project.
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
                        See how furniture and décor will look in your actual
                        space with our augmented reality feature. Point your
                        device and place virtual items in your real environment.
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
                        materials, and décor items. Filter by style, color,
                        price, and dimensions to find the perfect pieces for
                        your design.
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

      {/* How It Works */}
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
              From concept to completion, our streamlined process makes
              designing your space simple and enjoyable.
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

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge className="mb-3 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 cursor-pointer">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover how DesignVerse has transformed the design process for
              professionals and homeowners alike.
            </p>
          </div>

          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <Card className="h-full border border-gray-200 shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">
                          {testimonial.name}
                        </CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">"{testimonial.quote}"</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${
                            i < testimonial.rating
                              ? "text-amber-400"
                              : "text-gray-300"
                          }`}
                        ></i>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge className="mb-3 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 cursor-pointer">
              Pricing
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Plan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Flexible options to suit your design needs, from hobbyists to
              professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-400"></div>
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$9.99</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>2D floor planning</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Basic 3D visualization</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Access to 1,000+ items</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>3 projects</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white !rounded-button whitespace-nowrap cursor-pointer">
                  Get Started
                </Button>
              </CardFooter>
            </Card>

            <Card className="border border-indigo-200 shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600"></div>
              <Badge className="absolute top-5 right-5 bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
                Popular
              </Badge>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$19.99</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Advanced 2D & 3D planning</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>AI design suggestions</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>AR visualization</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Access to 5,000+ items</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>10 projects</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
                  Get Started
                </Button>
              </CardFooter>
            </Card>

            <Card className="border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-violet-600"></div>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$49.99</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>All Pro features</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Advanced AI customization</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Full catalog access (8,000+ items)</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Unlimited projects</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span>Priority support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join thousands of designers and homeowners who are creating
              stunning spaces with DesignVerse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-indigo-700 hover:bg-gray-100 px-8 !rounded-button whitespace-nowrap cursor-pointer"
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 !rounded-button whitespace-nowrap cursor-pointer"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <i className="fas fa-cube text-indigo-400 text-2xl"></i>
                <span className="text-xl font-bold text-white">
                  DesignVerse
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Transform your ideas into stunning spaces with our AI-powered
                design platform.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Case Studies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Reviews
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Updates
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Partners
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Tutorials
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © 2025 DesignVerse. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="#"
                  className="text-gray-500 hover:text-white text-sm transition-colors cursor-pointer"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-white text-sm transition-colors cursor-pointer"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-white text-sm transition-colors cursor-pointer"
                >
                  Cookies
                </a>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <i className="fab fa-cc-visa text-2xl text-gray-500"></i>
                <i className="fab fa-cc-mastercard text-2xl text-gray-500"></i>
                <i className="fab fa-cc-paypal text-2xl text-gray-500"></i>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
