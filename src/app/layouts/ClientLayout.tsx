import { Outlet, Link, useLocation } from "react-router";
import { ShoppingBag, Search, User, Menu, X, Instagram } from "lucide-react";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { to: "/catalog", label: "Каталог" },
  { to: "/catalog/новинки", label: "Новинки" },
  { to: "/catalog/SALE", label: "Акции" },
];

export function ClientLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const transparent = isHome && !scrolled;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAFAF8" }}>

      {/* ── Fixed header ── */}
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          backgroundColor: transparent ? "transparent" : "rgba(255,255,255,0.97)",
          borderBottom: `1px solid ${transparent ? "transparent" : "#EBEBEA"}`,
          transition: "background-color 300ms ease, border-color 300ms ease",
          backdropFilter: transparent ? "none" : "blur(10px)",
        }}
      >
        <div
          style={{
            maxWidth: 1280, margin: "0 auto",
            padding: "0 24px",
            height: 64,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 18,
              color: transparent ? "#FAFAF8" : "#1C1C1C",
              textDecoration: "none", letterSpacing: "0.12em",
              transition: "color 300ms ease",
            }}
          >
            AROMA
          </Link>

          {/* Desktop nav — hidden on mobile via CSS class */}
          <style>{`
            @media (max-width: 767px) { .header-nav { display: none !important; } }
            @media (min-width: 768px) { .mobile-toggle { display: none !important; } }
          `}</style>
          <nav
            className="header-nav"
            style={{ display: "flex", alignItems: "center", gap: 36 }}
          >
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 400,
                  color: transparent ? "rgba(250,250,248,0.85)" : "#4A4A4A",
                  textDecoration: "none", letterSpacing: "0.02em",
                  transition: "color 200ms ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = transparent ? "#FAFAF8" : "#1C1C1C")}
                onMouseLeave={e => (e.currentTarget.style.color = transparent ? "rgba(250,250,248,0.85)" : "#4A4A4A")}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {[Search, User].map((Icon, i) => (
              <button
                key={i}
                className="header-nav"
                style={{
                  width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                  background: "none", border: "none", cursor: "pointer", borderRadius: 6,
                  color: transparent ? "#FAFAF8" : "#1C1C1C", transition: "color 300ms ease, background-color 200ms ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = transparent ? "rgba(255,255,255,0.1)" : "#F5F3EF")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <Icon style={{ width: 18, height: 18 }} />
              </button>
            ))}

            {/* Cart */}
            <button
              style={{
                position: "relative", width: 36, height: 36,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "none", border: "none", cursor: "pointer", borderRadius: 6,
                color: transparent ? "#FAFAF8" : "#1C1C1C", transition: "color 300ms ease, background-color 200ms ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = transparent ? "rgba(255,255,255,0.1)" : "#F5F3EF")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <ShoppingBag style={{ width: 18, height: 18 }} />
              <span
                style={{
                  position: "absolute", top: 7, right: 7, width: 6, height: 6,
                  borderRadius: "50%", backgroundColor: transparent ? "#C9A96E" : "#1C1C1C",
                  transition: "background-color 300ms ease",
                }}
              />
            </button>

            {/* Mobile menu toggle */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileOpen(o => !o)}
              style={{
                width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                background: "none", border: "none", cursor: "pointer",
                color: transparent ? "#FAFAF8" : "#1C1C1C", transition: "color 300ms ease",
              }}
            >
              {mobileOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen drawer ── */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 200,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "absolute", inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            opacity: mobileOpen ? 1 : 0,
            transition: "opacity 300ms ease",
          }}
        />

        {/* Drawer panel */}
        <div
          style={{
            position: "absolute", top: 0, left: 0, bottom: 0,
            width: "min(320px, 85vw)",
            backgroundColor: "#FFFFFF",
            transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 350ms cubic-bezier(0.4, 0, 0.2, 1)",
            display: "flex", flexDirection: "column",
            boxShadow: "4px 0 24px rgba(0,0,0,0.12)",
          }}
        >
          {/* Drawer header */}
          <div
            style={{
              height: 64, display: "flex", alignItems: "center",
              justifyContent: "space-between", padding: "0 24px",
              borderBottom: "1px solid #F0EDE7",
            }}
          >
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 18, color: "#1C1C1C", letterSpacing: "0.1em" }}>
              AROMA
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer" }}
            >
              <X style={{ width: 18, height: 18, color: "#1C1C1C" }} />
            </button>
          </div>

          {/* Drawer nav links */}
          <nav style={{ flex: 1, padding: "12px 0" }}>
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  display: "flex", alignItems: "center",
                  padding: "14px 24px",
                  fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 500, color: "#1C1C1C",
                  textDecoration: "none", letterSpacing: "0.01em",
                  transition: "background-color 150ms ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F5F3EF")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Drawer footer */}
          <div style={{ padding: "20px 24px", borderTop: "1px solid #F0EDE7" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8A8A8A", margin: "0 0 4px" }}>
              г. Бишкек, Кыргызстан
            </p>
            <a
              href="https://wa.me/996"
              style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#1C1C1C", textDecoration: "none" }}
            >
              +996 XXX XXX XXX
            </a>
          </div>
        </div>
      </div>

      {/* ── Page content ── */}
      <main style={{ paddingTop: isHome ? 0 : 64 }}>
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: "#1A1714" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px 32px" }}>

          {/* Grid — 3 cols desktop, 1 col mobile */}
          <style>{`
            .footer-grid {
              display: grid;
              grid-template-columns: 1.4fr 1fr 1fr;
              gap: 48px;
              padding-bottom: 48px;
            }
            @media (max-width: 767px) {
              .footer-grid {
                grid-template-columns: 1fr;
                gap: 36px;
              }
            }
          `}</style>

          <div className="footer-grid">
            {/* Brand col */}
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 20, color: "#FAFAF8", letterSpacing: "0.1em", margin: "0 0 10px" }}>
                AROMA
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#6A6A5A", margin: "0 0 24px", lineHeight: 1.6 }}>
                Оригинальная парфюмерия.<br />Доставка по всему Кыргызстану.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {/* Instagram */}
                <a
                  href="#"
                  style={{ width: 36, height: 36, borderRadius: 6, border: "1px solid rgba(250,250,248,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6A6A5A", transition: "all 150ms ease" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(250,250,248,0.35)"; e.currentTarget.style.color = "#FAFAF8"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(250,250,248,0.12)"; e.currentTarget.style.color = "#6A6A5A"; }}
                >
                  <Instagram style={{ width: 16, height: 16 }} />
                </a>
                {/* WhatsApp */}
                <a
                  href="https://wa.me/996"
                  style={{ width: 36, height: 36, borderRadius: 6, border: "1px solid rgba(250,250,248,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6A6A5A", transition: "all 150ms ease" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(250,250,248,0.35)"; e.currentTarget.style.color = "#FAFAF8"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(250,250,248,0.12)"; e.currentTarget.style.color = "#6A6A5A"; }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Catalog col */}
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 11, color: "#FAFAF8", letterSpacing: "0.1em", margin: "0 0 16px", textTransform: "uppercase" }}>
                Каталог
              </p>
              {["Цветочные", "Восточные", "Свежие", "Древесные", "Новинки", "SALE"].map(item => (
                <Link
                  key={item}
                  to={`/catalog/${item}`}
                  style={{ display: "block", fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6A6A5A", textDecoration: "none", marginBottom: 10, transition: "color 150ms ease" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#FAFAF8")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#6A6A5A")}
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Contacts col */}
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 11, color: "#FAFAF8", letterSpacing: "0.1em", margin: "0 0 16px", textTransform: "uppercase" }}>
                Контакты
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6A6A5A", margin: "0 0 6px" }}>г. Бишкек, Кыргызстан</p>
              <a
                href="tel:+996"
                style={{ display: "block", fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6A6A5A", textDecoration: "none", marginBottom: 20, transition: "color 150ms ease" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#FAFAF8")}
                onMouseLeave={e => (e.currentTarget.style.color = "#6A6A5A")}
              >
                +996 XXX XXX XXX
              </a>
              <a
                href="https://wa.me/996"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "9px 20px",
                  border: "1px solid rgba(250,250,248,0.2)", borderRadius: 6,
                  fontFamily: "Inter, sans-serif", fontSize: 13, color: "#FAFAF8",
                  textDecoration: "none", transition: "border-color 150ms ease, background-color 150ms ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(250,250,248,0.5)"; e.currentTarget.style.backgroundColor = "rgba(250,250,248,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(250,250,248,0.2)"; e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(250,250,248,0.07)", paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#3A3A32", margin: 0 }}>
              © 2026 AROMA. Все права защищены.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#3A3A32", margin: 0 }}>
              Оригинальная парфюмерия в Кыргызстане
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
