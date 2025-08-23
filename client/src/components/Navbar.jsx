import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();

  // Effect to handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect to close the mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Products", to: "/products" },
    { name: "Solutions", to: "/solutions" },
    { name: "Gallery", to: "/gallery" },
    { name: "Contact", to: "/contact" },
  ];

  const NavItem = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        // Increased font size from text-sm to text-base for better readability on desktop
        `relative px-3 py-2 text-base font-medium transition-colors duration-300 ${
          isActive ? "text-indigo-600" : "text-slate-700 hover:text-indigo-600"
        }`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
          hasScrolled ? "bg-white shadow-md" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 ">
            {/* Brand Logo/Name */}
            <Link 
              to="/" 
              className="flex-shrink-0"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              {/* Made font size responsive to prevent overlap on small screens */}
              {/* <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Interior Solutions
              </h1> */}
              <img
                src="/images/Logo-Interior-Design.jpeg"
                alt="Interior Solutions Logo"
                className="h-14 sm:h-14 md:h-16 lg:h-18"
                loading="lazy"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => (
                <NavItem key={link.name} to={link.to}>
                  {link.name}
                </NavItem>
              ))}
              <Link
                to="/quote"
                // Increased font size for consistency
                className="ml-4 px-5 py-2.5 text-base font-medium text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-indigo-600 hover:bg-slate-100 focus:outline-none "
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-transparent bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 z-40 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b">
            <h2 className="font-bold text-lg text-slate-800">Menu</h2>
          </div>
          <nav className="flex-grow p-5 space-y-2">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
                  }`
                }
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div className="p-5 border-t">
            <Link
              to="/quote"
              className="w-full block text-center px-4 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
