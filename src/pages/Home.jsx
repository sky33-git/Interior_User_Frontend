// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

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
import HeroSection from "@/HeroSection";
import Features from "@/Features";
import Demo from "@/Demo";
import HowItWorks from "@/HowItWorks";
import ProductFeature from "@/ProductFeature";

const Home = () => {
  // For parallax effect on hero section

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
      {/* Hero Section */}
      <HeroSection />

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
      <Features />

      {/* Demo Section */}
      <Demo />

      {/* How It Works */}
      <HowItWorks />

      <ProductFeature />

      {/* Testimonials */}

      {/* Pricing */}
      {/* <section id="pricing" className="py-20">
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
      </section> */}

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
                className="bg-white text-indigo-700   hover:text-white   hover:border border-white hover:bg-indigo-700 px-8 !rounded-button whitespace-nowrap cursor-pointer"
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                className="bg-white text-indigo-700   hover:text-white   hover:border border-white hover:bg-indigo-700 px-8 !rounded-button whitespace-nowrap cursor-pointer"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default Home;
