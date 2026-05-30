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

interface TopNavLayoutProps {
  children: React.ReactNode;
}

const TopNavLayout = ({ children }: TopNavLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Top navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          {/* Left nav links (desktop) */}
          <div className="hidden md:flex items-center gap-8 flex-1">
            {navItems.slice(0, 3).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`editorial-link font-sans text-[11px] tracking-[0.2em] uppercase transition-opacity duration-300 ${
                  location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path))
                    ? "opacity-100 text-foreground"
                    : "opacity-40 text-foreground hover:opacity-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Centered logo */}
          <Link to="/" className="flex items-center justify-center md:flex-1">
            <img src={logo} alt="Anthony Hanna Photography" className="h-14 md:h-16 w-auto" />
          </Link>

          {/* Right nav links (desktop) */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-end">
            {navItems.slice(3).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`editorial-link font-sans text-[11px] tracking-[0.2em] uppercase transition-opacity duration-300 ${
                  location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path))
                    ? "opacity-100 text-foreground"
                    : "opacity-40 text-foreground hover:opacity-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 right-6 text-foreground"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className="font-serif text-2xl text-foreground tracking-wider"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* Main content */}
      <main className="pt-24 md:pt-28 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default TopNavLayout;
