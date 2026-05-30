import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Portfolio", path: "/portfolio" },
  { label: "Projects", path: "/projects" },
  { label: "Videos", path: "/videos" },
  { label: "Connect", path: "/connect" },
];


interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-36 flex-col justify-between site-bg z-50 px-5 py-10">
        <div className="space-y-12">
          <Link to="/">
            <img src={logo} alt="Anthony Hanna Photography" className="h-24 w-auto" />
          </Link>

          <nav className="flex flex-col gap-5">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-sans text-[11px] tracking-[0.2em] uppercase transition-opacity duration-300 ${
                  location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path))
                    ? "opacity-100 text-foreground"
                    : "opacity-40 text-foreground hover:opacity-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-3">
          <a
            href="mailto:anthonyhphotos@gmail.com"
            className="block font-sans text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            anthonyhphotos@<br />gmail.com
          </a>
          <a
            href="https://instagram.com/anthonyhphotos"
            target="_blank"
            rel="noopener noreferrer"
            className="block font-sans text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Instagram
          </a>
          <p className="font-sans text-[10px] tracking-wider text-muted-foreground/50 pt-4">
            © {new Date().getFullYear()}
          </p>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border flex items-center justify-between px-5 py-4">
        <Link to="/">
          <img src={logo} alt="Anthony Hanna Photography" className="h-8 w-auto" />
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" className="text-foreground">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-5 text-foreground"
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
      <main className="flex-1 md:ml-36 min-h-screen">
        <div className="pt-16 md:pt-0">
          {children}
        </div>

        {/* Mobile footer */}
        <footer className="md:hidden border-t border-border px-5 py-8 flex items-center justify-between">
          <a
            href="mailto:anthonyhphotos@gmail.com"
            className="font-sans text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            anthonyhphotos@gmail.com
          </a>
          <a
            href="https://instagram.com/anthonyhphotos"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Instagram
          </a>
        </footer>
      </main>
    </div>
  );
};

export default SidebarLayout;
