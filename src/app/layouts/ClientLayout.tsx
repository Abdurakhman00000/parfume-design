import { Outlet, Link, useLocation } from "react-router";
import { ShoppingBag, Search, User, Menu, X, Instagram } from "lucide-react";
import { useState, useEffect } from "react";

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

  // transparent = home page + not scrolled
  const transparent = isHome && !scrolled;

  const textColor = transparent ? "rgba(250,250,248,0.85)" : "#1C1C1C";
  const textHoverColor = transparent ? "#FAFAF8" : "#000000";
  const logoColor = transparent ? "#FAFAF8" : "#1C1C1C";
  const iconColor = transparent ? "#FAFAF8" : "#1C1C1C";
  const bgColor = transparent ? "transparent" : "#FFFFFF";
  const borderColor = transparent ? "transparent" : "#EBEBEA";

  const navLinkStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: 13,
    fontWeight: 400,
    color: textColor,
    textDecoration: "none",
    letterSpacing: "0.02em",
    transition: "color 200ms ease",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAFAF8" }}>
      {/* Fixed header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: bgColor,
          borderBottom: `1px solid ${borderColor}`,
          transition: "background-color 300ms ease, border-color 300ms ease",
          backdropFilter: transparent ? "none" : "blur(8px)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 32px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 18,
              color: logoColor,
              textDecoration: "none",
              letterSpacing: "0.12em",
              transition: "color 300ms ease",
            }}
          >
            AROMA
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex"
            style={{ display: "flex", alignItems: "center", gap: 36 }}
          >
            {[
              { to: "/catalog", label: "Каталог" },
              { to: "/catalog/новинки", label: "Новинки" },
              { to: "/catalog/SALE", label: "Акции" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={navLinkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = textHoverColor)}
                onMouseLeave={e => (e.currentTarget.style.color = textColor)}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {[Search, User].map((Icon, i) => (
              <button
                key={i}
                style={{
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 4,
                  color: iconColor,
                  transition: "color 300ms ease",
                }}
              >
                <Icon style={{ width: 18, height: 18 }} />
              </button>
            ))}

            <button
              style={{
                position: "relative",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
                borderRadius: 4,
                color: iconColor,
                transition: "color 300ms ease",
              }}
            >
              <ShoppingBag style={{ width: 18, height: 18 }} />
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: transparent ? "#FAFAF8" : "#1C1C1C",
                  transition: "background-color 300ms ease",
                }}
              />
            </button>

            {/* "Заказать" outlined button */}
            <button
              style={{
                display: "none",
                /* shown via media query workaround — desktop only */
                padding: "7px 16px",
                border: `1px solid ${transparent ? "rgba(250,250,248,0.4)" : "#1C1C1C"}`,
                borderRadius: 4,
                backgroundColor: "transparent",
                color: transparent ? "#FAFAF8" : "#1C1C1C",
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                cursor: "pointer",
                transition: "all 200ms ease",
                marginLeft: 4,
              }}
              className="hidden md:block"
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = transparent ? "#FAFAF8" : "#1C1C1C";
                e.currentTarget.style.color = transparent ? "#1A1714" : "#FFFFFF";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = transparent ? "#FAFAF8" : "#1C1C1C";
              }}
            >
              Заказать
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(o => !o)}
              style={{
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: iconColor,
                transition: "color 300ms ease",
              }}
            >
              {mobileOpen
                ? <X style={{ width: 18, height: 18 }} />
                : <Menu style={{ width: 18, height: 18 }} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderTop: "1px solid #EBEBEA",
              padding: "16px 32px 20px",
            }}
          >
            {[
              { to: "/catalog", label: "Каталог" },
              { to: "/catalog/новинки", label: "Новинки" },
              { to: "/catalog/SALE", label: "Акции" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 15,
                  color: "#1C1C1C",
                  textDecoration: "none",
                  padding: "10px 0",
                  borderBottom: "1px solid #F0EDE7",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Page content — no top padding on home (hero is full bleed), padding on other pages */}
      <main style={{ paddingTop: isHome ? 0 : 64 }}>
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: "#1A1714" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "64px 32px 32px",
          }}
        >
          {/* 3 columns */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr 1fr",
              gap: 48,
              paddingBottom: 48,
            }}
            className="grid-cols-1 md:grid-cols-3"
          >
            {/* Left: brand */}
            <div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 20,
                  color: "#FAFAF8",
                  letterSpacing: "0.1em",
                  margin: "0 0 10px",
                }}
              >
                AROMA
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  color: "#8A8A7A",
                  margin: "0 0 24px",
                  lineHeight: 1.6,
                }}
              >
                Парфюмерия для тех, кто знает
              </p>
              {/* Social */}
              <div style={{ display: "flex", gap: 12 }}>
                {[Instagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 4,
                      border: "1px solid rgba(250,250,248,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#8A8A7A",
                      transition: "all 150ms ease",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "rgba(250,250,248,0.4)";
                      e.currentTarget.style.color = "#FAFAF8";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "rgba(250,250,248,0.15)";
                      e.currentTarget.style.color = "#8A8A7A";
                    }}
                  >
                    <Icon style={{ width: 16, height: 16 }} />
                  </a>
                ))}
                {/* WhatsApp icon (SVG inline) */}
                <a
                  href="#"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 4,
                    border: "1px solid rgba(250,250,248,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#8A8A7A",
                    transition: "all 150ms ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(250,250,248,0.4)";
                    e.currentTarget.style.color = "#FAFAF8";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(250,250,248,0.15)";
                    e.currentTarget.style.color = "#8A8A7A";
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Center: catalog links */}
            <div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  color: "#FAFAF8",
                  letterSpacing: "0.08em",
                  margin: "0 0 16px",
                  textTransform: "uppercase",
                }}
              >
                Каталог
              </p>
              {["Цветочные", "Восточные", "Свежие", "Новинки"].map(item => (
                <a
                  key={item}
                  href="#"
                  style={{
                    display: "block",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    color: "#8A8A7A",
                    textDecoration: "none",
                    marginBottom: 10,
                    transition: "color 150ms ease",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#FAFAF8")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#8A8A7A")}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Right: contacts */}
            <div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  color: "#FAFAF8",
                  letterSpacing: "0.08em",
                  margin: "0 0 16px",
                  textTransform: "uppercase",
                }}
              >
                Контакты
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8A8A7A", margin: "0 0 8px" }}>+996 XXX XXX XXX</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8A8A7A", margin: "0 0 20px" }}>г. Бишкек, Кыргызстан</p>
              <a
                href="https://wa.me/996"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 18px",
                  border: "1px solid rgba(250,250,248,0.3)",
                  borderRadius: 4,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  color: "#FAFAF8",
                  textDecoration: "none",
                  transition: "border-color 150ms ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(250,250,248,0.7)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(250,250,248,0.3)")}
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: "1px solid rgba(250,250,248,0.08)",
              paddingTop: 24,
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                color: "#4A4A42",
                margin: 0,
              }}
            >
              © 2026 AROMA. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
