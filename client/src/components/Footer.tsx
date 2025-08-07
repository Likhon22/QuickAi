import { Link } from "react-router-dom";
import { assets, AiToolsData } from "../assets/assets";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Github,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="px-4 sm:px-20 xl:px-32 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src={assets.logo}
                alt="QuickAI Logo"
                className="w-32 sm:w-44"
              />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Transform your ideas into stunning content with our AI-powered
              tools. Create articles, generate images, and enhance your
              creativity with cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors duration-300"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors duration-300"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* AI Tools */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">AI Tools</h4>
            <ul className="space-y-2">
              {AiToolsData.slice(0, 4).map((tool) => (
                <li key={tool.title}>
                  <Link
                    to={tool.path}
                    className="text-gray-600 hover:text-primary transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={12}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-primary transition-colors duration-300 text-sm flex items-center gap-2 group"
                >
                  <ArrowRight
                    size={12}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/ai"
                  className="text-gray-600 hover:text-primary transition-colors duration-300 text-sm flex items-center gap-2 group"
                >
                  <ArrowRight
                    size={12}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                  AI Tools
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="text-gray-600 hover:text-primary transition-colors duration-300 text-sm flex items-center gap-2 group"
                >
                  <ArrowRight
                    size={12}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                  Community
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-primary transition-colors duration-300 text-sm flex items-center gap-2 group"
                >
                  <ArrowRight
                    size={12}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-primary transition-colors duration-300 text-sm flex items-center gap-2 group"
                >
                  <ArrowRight
                    size={12}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <Mail size={16} className="text-primary" />
                <span>hello@quickai.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <Phone size={16} className="text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <MapPin size={16} className="text-primary" />
                <span>San Francisco, CA 94105</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-gray-900 mb-2">
                Stay Updated
              </h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:border-primary transition-colors duration-300"
                />
                <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-300 text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200">
        <div className="px-4 sm:px-20 xl:px-32 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © 2025 QuickAI. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link
                to="/privacy"
                className="hover:text-primary transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-primary transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="hover:text-primary transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
