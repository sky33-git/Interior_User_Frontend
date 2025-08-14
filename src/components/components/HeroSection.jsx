import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

function HeroSection() {
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

  return (
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
  );
}

export default HeroSection;
