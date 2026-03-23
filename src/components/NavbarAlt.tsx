import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "figma:asset/775b8c572767ea025e0e8192b1b8c7be5684bea4.png";

export function NavbarAlt({ onLoginClick }: { onLoginClick: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // FIX A+B+C: cierra el menú mobile PRIMERO, luego espera a que el DOM
    // se estabilice (50ms es suficiente sin animaciones CSS) y calcula el
    // offset dinámico del navbar para que el elemento no quede tapado.
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      const navbar = document.querySelector("nav") as HTMLElement | null;
      if (!el) return;
      const navHeight = navbar?.offsetHeight ?? 80;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }, 50);
  };

  const navItems = [
    { label: "Inicio", id: "hero" },
    { label: "Sobre Nosotros", id: "nosotros" },
    { label: "Terry", id: "angelo" },
    { label: "Investigación", id: "investigacion" },
    { label: "Proyectos", id: "proyectos" },
    { label: "Equipo", id: "equipo" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <img src={logo} alt="GEOTIG Logo" className="h-14 w-auto" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 hover:text-emerald-600 transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full" />
              </button>
            ))}
            {/* Botón primario — inscripción */}
            <button
              onClick={() => scrollToSection("unete")}
              style={{
                background: "linear-gradient(135deg, #1a8a6e, #0f5c78)",
                boxShadow: "0 2px 10px rgba(15,110,86,0.30)",
              }}
              className="flex items-center gap-2 text-white px-5 py-2 rounded-[10px] font-semibold transition-all duration-200 hover:-translate-y-px hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
              Unirme al semillero
            </button>
            {/* Botón secundario — login */}
            <button
              onClick={onLoginClick}
              style={{ borderColor: "rgba(13,110,86,0.35)" }}
              className="flex items-center gap-2 bg-transparent border-[1.5px] text-[#0d6e56] px-5 py-2 rounded-[10px] font-medium transition-all duration-200 hover:bg-[rgba(13,110,86,0.06)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Iniciar sesión
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-gray-700 hover:text-emerald-600 transition-colors py-2"
              >
                {item.label}
              </button>
            ))}
            {/* Botón primario mobile — inscripción */}
            <button
              onClick={() => {
                scrollToSection("unete");
              }}
              style={{
                background: "linear-gradient(135deg, #1a8a6e, #0f5c78)",
                boxShadow: "0 2px 10px rgba(15,110,86,0.30)",
              }}
              className="flex items-center justify-center gap-2 text-white px-5 py-2.5 rounded-[10px] font-semibold w-full transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
              Unirme al semillero
            </button>
            {/* Botón secundario mobile — login */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onLoginClick();
              }}
              style={{ borderColor: "rgba(13,110,86,0.35)" }}
              className="flex items-center justify-center gap-2 bg-transparent border-[1.5px] text-[#0d6e56] px-5 py-2.5 rounded-[10px] font-medium w-full transition-all duration-200 hover:bg-[rgba(13,110,86,0.06)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Iniciar sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
