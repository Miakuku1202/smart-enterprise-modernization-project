import { useState } from 'react';
import { Mail, Phone, MapPin, Printer, Home } from 'lucide-react'; // Import Home icon
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Link } from 'react-router-dom';
import React from 'react';
export function ContactsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", { name, email, message });
    alert("Message sent! (Demo)");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-16 pb-20 relative">
      <Link to="/" className="absolute top-6 left-6 flex items-center text-slate-400 hover:text-white transition-colors">
        <Home className="w-5 h-5 mr-2" />
        Home
      </Link>
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Info Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700 shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:border-teal-500 hover:shadow-teal-500/20 hover:scale-105">
            <MapPin className="w-10 h-10 text-teal-400 mb-4" />
            <h3 className="text-lg font-bold mb-2">OUR MAIN OFFICE</h3>
            <p className="text-sm text-slate-300">SoHo 94 Broadway St New</p>
            <p className="text-sm text-slate-300">York, NY 1001</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700 shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:border-teal-500 hover:shadow-teal-500/20 hover:scale-105">
            <Phone className="w-10 h-10 text-teal-400 mb-4" />
            <h3 className="text-lg font-bold mb-2">PHONE NUMBER</h3>
            <p className="text-sm text-slate-300"><a href="tel:234-9876-5400" className="hover:text-teal-400 transition-colors">234-9876-5400</a></p>
            <p className="text-sm text-slate-300"><a href="tel:888-0123-4567" className="hover:text-teal-400 transition-colors">888-0123-4567 (Toll Free)</a></p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700 shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:border-teal-500 hover:shadow-teal-500/20 hover:scale-105">
            <Printer className="w-10 h-10 text-teal-400 mb-4" />
            <h3 className="text-lg font-bold mb-2">FAX</h3>
            <p className="text-sm text-slate-300">1-234-567-8900</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700 shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:border-teal-500 hover:shadow-teal-500/20 hover:scale-105">
            <Mail className="w-10 h-10 text-teal-400 mb-4" />
            <h3 className="text-lg font-bold mb-2">EMAIL</h3>
            <p className="text-sm"><a href="mailto:hello@theme.com" className="text-teal-400 hover:text-teal-300 transition-colors">hello@theme.com</a></p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-10 rounded-lg border border-slate-700 shadow-2xl text-center">
          <h1 className="text-4xl font-bold text-white mb-8">Contact Us</h1>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your Name"
                className="w-full px-5 py-3 bg-slate-900 border-slate-700 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-base text-white placeholder:text-slate-500 transition-colors duration-300 hover:border-teal-500"
                required
              />
            </div>
            <div>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter a valid email address"
                className="w-full px-5 py-3 bg-slate-900 border-slate-700 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-base text-white placeholder:text-slate-500 transition-colors duration-300 hover:border-teal-500"
                required
              />
            </div>
            <div>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your Message"
                className="w-full px-5 py-3 bg-slate-900 border-slate-700 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-base text-white placeholder:text-slate-500 h-32 transition-colors duration-300 hover:border-teal-500"
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold py-3 px-10 rounded-md shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              SUBMIT
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
