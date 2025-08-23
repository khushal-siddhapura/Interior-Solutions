import React from "react";
import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiMapPin,
  FiPhone,
  FiMail,
} from "react-icons/fi";

export default function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { icon: <FiFacebook size={20} />, href: "#" },
    { icon: <FiInstagram size={20} />, href: "#" },
    { icon: <FiLinkedin size={20} />, href: "#" },
  ];

  return (
    // --- CHANGE: Added relative and overflow-hidden for the gradient effect ---
    <footer className="relative bg-slate-900 text-slate-300 font-sans overflow-hidden">
      {/* --- NEW: Decorative gradient element --- */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-gradient-to-br from-indigo-500/10 via-slate-900 to-slate-900 rounded-full blur-3xl opacity-50"></div>
      </div>

      {/* --- CHANGE: Added relative and z-10 to ensure content is above the gradient --- */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* --- CHANGE: Added text-center for mobile and md:text-left for larger screens --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-left">
            {/* Column 1: Brand Information */}
            <div className="space-y-4 flex flex-col items-center md:items-start">
              <h2 className="text-2xl font-bold text-white tracking-wider">
                Interior Solutions
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Crafting beautiful and functional spaces that reflect your
                personality and lifestyle. Your vision, our expertise.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              {/* --- CHANGE: Centered list items on mobile --- */}
              <ul className="space-y-2 flex flex-col items-center md:items-start">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-slate-400 hover:text-indigo-400 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Contact Us</h3>
              {/* --- CHANGE: Centered list items on mobile --- */}
              <ul className="space-y-3 text-slate-400 flex flex-col items-center md:items-start">
                <li className="flex items-start">
                  <FiMapPin className="mr-3 mt-1 flex-shrink-0 text-indigo-400" />
                  <span>Ghuma, Ahmedabad, 380058 Gujarat, India </span>
                </li>
                <li className="flex items-center">
                  <FiPhone className="mr-3 flex-shrink-0 text-indigo-400" />
                  <a
                    href="tel:+911234567890"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    +91-99786 41486
                  </a>
                </li>
                <li className="flex items-center">
                  <FiMail className="mr-3 flex-shrink-0 text-indigo-400" />
                  <a
                    href="mailto:contact@interiorsolutions.com"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    kirangajjar2611@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Social Media */}
            <div className="space-y-4 flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold text-white">Follow Us</h3>
              <p className="text-slate-400 text-sm">
                Get inspired by our latest projects and design tips on social
                media.
              </p>
              {/* --- CHANGE: Centered social icons on mobile --- */}
              <div className="flex space-x-4 justify-center md:justify-start">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-800 rounded-full text-slate-400 hover:bg-indigo-600 hover:text-white transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-slate-950/50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500">
            <p className="text-center sm:text-left mb-2 sm:mb-0">
              © {new Date().getFullYear()} Interior Solutions. All Rights
              Reserved.
            </p>
            <Link
              to="/login"
              className="hover:text-indigo-400 transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
