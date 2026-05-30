import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Portfolio", path: "/portfolio" },
  { label: "Projects", path: "/projects" },
  { label: "Videos", path: "/videos" },
  { label: "Connect", path: "/connect" },
  ,
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4 md:px-12 md:py-5">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Anthony Hanna Photography" className="h-10 md:h-12 w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`editorial-link font-sans text-[11px] tracking-[0.2em] uppercase text-foreground transition-opacity duration-300 ${
                location.pathname === item.path ? "opacity-100" : "opacity-50 hover:opacity-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-background flex flex-col items-center justify-center gap-8">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-6 text-foreground"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="font-serif text-2xl text-foreground tracking-wider"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
