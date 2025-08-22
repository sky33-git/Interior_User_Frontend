import React, { useState } from 'react';

const InteriorDesignHomepage = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqItems = [
    {
      question: "How long does a typical interior design project take?",
      answer: "The timeline varies based on project scope, but most residential projects take between 3-6 months from concept to completion."
    },
    {
      question: "Do you work within specific budgets?",
      answer: "Yes, we tailor our designs to work with your budget, ensuring we maximize value while creating beautiful spaces."
    },
    {
      question: "Can you work with my existing furniture?",
      answer: "Absolutely! We incorporate your existing pieces whenever possible and supplement with new items to create a cohesive look."
    },
    {
      question: "What's your design process?",
      answer: "Our process includes consultation, concept development, design presentation, implementation, and final styling to bring your vision to life."
    }
  ];

  const features = [
    {
      title: "Personalized Designs",
      description: "Every space is unique, just like you. We create custom designs that reflect your personality and lifestyle.",
      icon: "🎨"
    },
    {
      title: "Quality Furniture",
      description: "Access to premium furniture and decor from top brands around the world at exclusive trade prices.",
      icon: "🛋️"
    },
    {
      title: "Project Management",
      description: "We handle everything from concept to installation, making the process seamless and stress-free for you.",
      icon: "📋"
    },
    {
      title: "Sustainable Choices",
      description: "Eco-friendly design options that are beautiful, functional, and kind to our planet.",
      icon: "🌿"
    }
  ];

  const projects = [
    { name: "Modern Apartment", type: "Residential", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3" },
    { name: "Cozy Cafe", type: "Commercial", image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3" },
    { name: "Luxury Villa", type: "Residential", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3" }
  ];

  return (
    <div className="font-sans text-gray-800">
      {/* Navigation */}
      {/* <nav className="fixed w-full bg-white bg-opacity-90 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-serif font-bold text-indigo-700">Elegance Interior</div>
          <div className="hidden md:flex space-x-10">
            <a href="#home" className="hover:text-indigo-600 transition">Home</a>
            <a href="#about" className="hover:text-indigo-600 transition">About</a>
            <a href="#services" className="hover:text-indigo-600 transition">Services</a>
            <a href="#projects" className="hover:text-indigo-600 transition">Projects</a>
            <a href="#why-us" className="hover:text-indigo-600 transition">Why Choose Us</a>
            <a href="#faq" className="hover:text-indigo-600 transition">FAQ</a>
          </div>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition">
            Contact Us
          </button>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Transform Your Space Into <span className="text-indigo-600">Art</span></h1>
            <p className="text-xl text-gray-600 mb-8">We create beautiful, functional spaces that reflect your personality and enhance your lifestyle.</p>
            <div className="flex space-x-4">
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition">
                Explore Our Work
              </button>
              <button className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition">
                Free Consultation
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="w-full h-96 bg-cover bg-center rounded-2xl shadow-xl" style={{backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3')"}}></div>
              <div className="absolute -bottom-6 -left-6 w-2/5 h-48 bg-cover bg-center rounded-xl shadow-lg" style={{backgroundImage: "url('https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3')"}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">About Our Design Philosophy</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-cover bg-center h-64 rounded-lg" style={{backgroundImage: "url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3')"}}></div>
                <div className="bg-cover bg-center h-64 rounded-lg mt-10" style={{backgroundImage: "url('https://images.unsplash.com/photo-1493663284031-b7e3aaa4c4b1?ixlib=rb-4.0.3')"}}></div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-16">
              <h3 className="text-3xl font-serif font-bold mb-6">Creating Spaces That Tell Your Story</h3>
              <p className="text-gray-600 mb-6">At Elegance Interior, we believe that your space should be a reflection of who you are. Our approach combines aesthetic beauty with functional design to create environments that enhance your daily life.</p>
              <p className="text-gray-600 mb-8">With over a decade of experience, our team of talented designers brings creativity, expertise, and attention to detail to every project, whether residential or commercial.</p>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Award-Winning Designs</h4>
                  <p className="text-gray-600">Recognized for excellence in interior design innovation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive design solutions for every space</p>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Residential Design</h3>
              <p className="text-gray-600">Transform your home into a sanctuary that reflects your personality and meets your functional needs.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🏢</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Commercial Design</h3>
              <p className="text-gray-600">Create workspaces that inspire productivity, reflect your brand, and impress clients.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🔄</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Space Planning</h3>
              <p className="text-gray-600">Optimize your layout for better flow, functionality, and aesthetic appeal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600">What sets our interior design services apart</p>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Our Projects</h2>
            <p className="text-xl text-gray-600">See our latest interior design transformations</p>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
                <div className="h-60 bg-cover bg-center" style={{backgroundImage: `url(${project.image})`}}></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <p className="text-gray-600">{project.type}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition">
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Client Testimonials</h2>
            <p className="text-xl text-gray-600">What our clients say about us</p>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
              <p className="text-gray-600 mb-6">"Elegance Interior transformed our apartment into a dream home. Their attention to detail and creative solutions exceeded our expectations."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="ml-4">
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-gray-600">New York</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
              <p className="text-gray-600 mb-6">"The team understood our vision for our restaurant and executed it perfectly. Our customers constantly compliment the atmosphere."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="ml-4">
                  <h4 className="font-bold">Michael Torres</h4>
                  <p className="text-gray-600">Restaurant Owner</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
              <p className="text-gray-600 mb-6">"Working with Elegance Interior was a pleasure from start to finish. They stayed on budget and delivered ahead of schedule."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="ml-4">
                  <h4 className="font-bold">James & Lisa Wilson</h4>
                  <p className="text-gray-600">Homeowners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Find answers to common questions about our services</p>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4"></div>
          </div>
          <div className="max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <div key={index} className="mb-6 bg-white rounded-xl shadow-md overflow-hidden">
                <button 
                  className="flex justify-between items-center w-full p-6 text-left font-bold text-lg"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{item.question}</span>
                  <span>{activeFaq === index ? '−' : '+'}</span>
                </button>
                {activeFaq === index && (
                  <div className="p-6 border-t border-gray-100">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-indigo-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">Schedule a free consultation with our design team and take the first step toward your dream interior.</p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition">
            Book a Free Consultation
          </button>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6">Elegance Interior</h3>
            <p className="text-gray-400">Creating beautiful spaces that inspire and delight.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-white transition">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition">About</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition">Services</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-white transition">Projects</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li>123 Design Street, New York, NY</li>
              <li>info@eleganceinterior.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to get design tips and special offers</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="bg-gray-800 px-4 py-2 rounded-l-lg w-full" />
              <button className="bg-indigo-600 px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="container mx-auto border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Elegance Interior. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
};

export default InteriorDesignHomepage;