import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";

function Features() {
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
  return (
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
          {features?.map((feature, index) => (
            <Card
              key={index}
              className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 ${feature?.color}`}
                >
                  <i className={`${feature?.icon} text-xl`}></i>
                </div>
                <CardTitle>{feature?.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature?.description}
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
  );
}

export default Features;
