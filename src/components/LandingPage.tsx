import React, { useState, useEffect } from "react";
import { ArrowRight, Zap, Cloud, Brain, Leaf, Shield, Code, ChevronRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../public/Logo.png";
export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const features = [
    {
      icon: Zap,
      title: "Zero Downtime Modernization",
      description: "Seamlessly transform your legacy systems without disrupting operations"
    },
    {
      icon: Cloud,
      title: "Cloud-Ready Architecture",
      description: "Built for scale with containerized microservices and API-first design"
    },
    {
      icon: Brain,
      title: "AI-Powered Automation",
      description: "Intelligent predictive analytics and automated decision-making"
    },
    {
      icon: Leaf,
      title: "Sustainable by Design",
      description: "Track and optimize energy consumption with GreenOps metrics"
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "Role-based access control and comprehensive audit trails"
    },
    {
      icon: Code,
      title: "Unified Tech Stack",
      description: "Modern React + TypeScript + Cloud infrastructure"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Integrate Legacy Systems",
      description: "Connect your existing automotive systems through our API gateway"
    },
    {
      number: "02",
      title: "API-First Transformation",
      description: "Modernize with RESTful and GraphQL APIs for seamless integration"
    },
    {
      number: "03",
      title: "Cloud Migration",
      description: "Deploy on AWS, Azure, or GCP with containerized architecture"
    },
    {
      number: "04",
      title: "AI-Driven Automation",
      description: "Leverage machine learning for predictive maintenance and optimization"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Smart Enterprise Logo" className="h-12 w-12" />
            <div>
              <h1 className="text-white font-semibold">Smart Enterprise</h1>
              <p className="text-xs text-slate-400">Automotive Digital Transformation</p>
            </div>
          </div>

          {/* Desktop Nav (visible on ≥768px) */}
          <nav className="hidden md:flex items-center gap-4">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">
              How It Works
            </a>
            <Link to="/contacts" className="text-slate-300 hover:text-white transition-colors">
              Contacts
            </Link>
            <span className="text-slate-600">|</span>
            <Link to="/login">
              <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white">
                Sign Up
              </Button>
            </Link>
          </nav>

          {/* Mobile Toggle Button (visible only on <768px) */}
          <button
            className="md:hidden text-slate-300 hover:text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu (visible only when menuOpen is true) */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-slate-900 border-t border-slate-800 px-6 py-4 flex flex-col gap-3"
            >
              <a
                href="#features"
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-white"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-white"
              >
                How It Works
              </a>
              <Link
                to="/contacts"
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-white"
              >
                Contacts
              </Link>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button className="w-full mt-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <Button className="w-full mt-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                  Sign Up
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-transparent to-blue-500/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full mb-6">
              <span className="text-teal-400 text-sm">Next-Gen Enterprise Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl text-white mb-6 bg-gradient-to-r from-white via-teal-200 to-blue-200 bg-clip-text text-transparent">
              Smart Enterprise Modernization
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
              Transforming Automotive Digitally
            </p>

            <p className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto">
              Modernize your legacy automotive systems through API-first, cloud-ready, AI-powered,
              and sustainable digital transformation. Zero downtime. Maximum efficiency.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-8">
                  Explore Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                  Get Started
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24"
          >
            {[
              { value: "99.9%", label: "Uptime" },
              { value: "50+", label: "Enterprises" },
              { value: "15%", label: "Cost Reduction" },
              { value: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl text-teal-400 mb-2">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-white mb-4">Key Features</h2>
            <p className="text-lg text-slate-400">Everything you need for digital transformation</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 hover:border-teal-500/50 transition-all hover:shadow-lg hover:shadow-teal-500/10"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-teal-400" />
                  </div>
                  <h3 className="text-xl text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-white mb-4">How It Works</h2>
            <p className="text-lg text-slate-400">Four simple steps to digital transformation</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 hover:border-teal-500/50 transition-all">
                  <div className="text-5xl text-teal-400/20 mb-4">{step.number}</div>
                  <h3 className="text-xl text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl text-white mb-6">Ready to Transform Your Enterprise?</h2>
          <p className="text-lg text-slate-300 mb-12">
            Join leading automotive companies in their digital transformation journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-12">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={Logo} alt="Smart Enterprise Logo" className="h-12 w-12" />
                <span className="text-white">Smart Enterprise</span>
              </div>
              <p className="text-slate-400 text-sm">
                Transforming automotive enterprises through intelligent digital solutions
              </p>
            </div>
            <div>
              <h4 className="text-white mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400 text-sm">
            © 2025 Smart Enterprise. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
