// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useEffect, useState } from "react";
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
      title: "Traditional South Indian Home",
      location: "Chennai, Tamil Nadu",
      photoCount: 10,
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
    {
      id: 2,
      title: "Modern Mumbai Apartment with Indian Accents",
      location: "Mumbai, Maharashtra",
      photoCount: 12,
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
    {
      id: 3,
      title: "Jaipur Heritage Haveli",
      location: "Jaipur, Rajasthan",
      photoCount: 20,
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
    {
      id: 4,
      title: "Contemporary Kerala House",
      location: "Kochi, Kerala",
      photoCount: 15,
      imageUrl:
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
    },
  ];

  const sections = [
    { id: "about", label: "About Us" },
    { id: "projects", label: "Projects" },
    { id: "business", label: "Business" },
    { id: "credentials", label: "Credentials" },
    { id: "reviews", label: "Reviews" },
    { id: "ideabooks", label: "Ideabooks" },
  ];

  const [activeSection, setActiveSection] = useState("about");

  // Handle scroll to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // + offset for nav height, adjust as needed

      let currentSection = "about";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollPosition) {
          currentSection = section.id;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section on tab click
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100, // Adjust for fixed header height if any
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw"
          alt="Sundar Interiors"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute top-0 right-0 w-full md:w-1/3 lg:w-1/4 p-6 md:p-8 flex justify-end">
          <Card className="w-full max-w-[350px] bg-white shadow-lg p-6">
            <h3 className="text-lg font-medium mb-4">
              Contact Sundar Interiors
            </h3>
            <Button className="w-full bg-amber-700 hover:bg-amber-800 text-white !rounded-button whitespace-nowrap cursor-pointer">
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
              <Avatar className="h-16 w-16 border border-amber-700">
                <div className="font-serif text-xl font-bold text-amber-700">
                  SI
                </div>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Sundar Interiors</h1>
                <div className="flex items-center mt-1">
                  <span className="text-amber-600 font-medium mr-2">4.9</span>
                  <div className="flex text-amber-600">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                  <span className="ml-2 text-gray-600">120 Reviews</span>
                </div>
                <p className="text-gray-600 mt-1">
                  Indian Traditional & Contemporary Interior Designers
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

        {/* Tabs */}

        {/* Navigation Tabs */}
        <nav className="sticky top-0 bg-white z-50 flex gap-4 border-b border-gray-300 mb-6 overflow-x-auto">
          {sections?.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`whitespace-nowrap px-4 py-2 font-medium cursor-pointer border-b-2 ${
                activeSection === id
                  ? "border-amber-700 text-amber-700"
                  : "border-transparent text-gray-600 hover:text-amber-700"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Sections */}
        <section id="about" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p>
            Sundar Interiors is a Bangalore-based interior design studio
            blending Vastu principles, traditional Indian craftsmanship, and
            contemporary functionality to create harmonious spaces.
          </p>
          <p className="mt-4">
            Founded in 2012, we specialize in residential and commercial
            projects across India, offering design solutions that integrate
            cultural heritage with modern living needs.
          </p>
        </section>

        <section id="projects" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-6">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Traditional South Indian Home",
                location: "Chennai, Tamil Nadu",
                photos: 10,
                imageUrl:
                  "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
              },
              {
                title: "Modern Mumbai Apartment with Indian Accents",
                location: "Mumbai, Maharashtra",
                photos: 12,
                imageUrl:
                  "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
              },
              {
                title: "Jaipur Heritage Haveli",
                location: "Jaipur, Rajasthan",
                photos: 20,
                imageUrl:
                  "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
              },
              {
                title: "Contemporary Kerala House",
                location: "Kochi, Kerala",
                photos: 15,
                imageUrl:
                  "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?_gl=1*1p8fe40*_ga*MTY3NjY1NjY5Mi4xNzUwNTE5NjUw*_ga_8JE65Q40S6*czE3NTE1NDMzNzckbzIkZzEkdDE3NTE1NDM0NDUkajU1JGwwJGgw",
              },
            ].map((project, idx) => (
              <div
                key={idx}
                className="border rounded shadow overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  <p className="text-gray-600 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a4 4 0 005.657-5.657z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {project.location}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {project.photos} Photos
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="business" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-4">Business</h2>
          <div>
            <h3 className="font-semibold mb-2">Contact Information</h3>
            <p>Phone: +91 98765 43210</p>
            <p>Email: info@sundarinteriors.in</p>
            <p>Website: www.sundarinteriors.in</p>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Business Hours</h3>
            <ul>
              <li>Mon-Fri: 9:00 AM - 7:00 PM</li>
              <li>Sat: 10:00 AM - 5:00 PM</li>
              <li>Sun: Closed</li>
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Address</h3>
            <address>
              45 MG Road,
              <br />
              Bangalore, Karnataka 560001
              <br />
              India
            </address>
          </div>
        </section>

        <section id="credentials" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-4">Credentials</h2>
          <div>
            <h3 className="font-semibold mb-2">Certifications & Awards</h3>
            <ul className="list-disc list-inside">
              <li>Best Indian Design Studio 2024 - IIID Awards</li>
              <li>
                Vastu Consultant Certification - Indian Architecture Society
              </li>
              <li>
                Top 10 Design Studios in India - Interior Design Magazine 2023
              </li>
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Professional Memberships</h3>
            <ul className="list-disc list-inside">
              <li>
                Institute of Indian Interior Designers (IIID) - Member since
                2012
              </li>
              <li>Council of Architecture, India - Registered since 2013</li>
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Education & Qualifications</h3>
            <ul className="list-disc list-inside">
              <li>
                Master of Interior Architecture - National Institute of Design,
                2010
              </li>
              <li>
                Bachelor of Architecture - School of Planning and Architecture,
                2008
              </li>
            </ul>
          </div>
        </section>

        <section id="reviews" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-6">Reviews</h2>
          <div className="space-y-6">
            <div className="border p-4 rounded shadow">
              <p className="font-semibold">Ravi Kumar</p>
              <p>★★★★★</p>
              <p>
                Sundar Interiors transformed our Chennai home into a beautiful
                blend of tradition and modern comfort. Very professional and
                detail-oriented.
              </p>
            </div>
            <div className="border p-4 rounded shadow">
              <p className="font-semibold">Anjali Mehta</p>
              <p>★★★★½</p>
              <p>
                Their knowledge of Vastu and Indian design elements is
                exceptional. Loved the pooja room designs they created.
              </p>
            </div>
          </div>
        </section>

        <section id="ideabooks" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-6">Ideabooks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((book, idx) => (
              <div
                key={idx}
                className="border rounded shadow flex gap-4 overflow-hidden"
              >
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-28 h-20 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold">{book.title}</h3>
                  <p className="text-gray-600 text-sm">{book.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default VenderDetail;
