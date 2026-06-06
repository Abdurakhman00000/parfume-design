import { Link } from "react-router";
import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

// Avatar URLs for social proof
const avatarUrls = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&auto=format&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&auto=format&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&auto=format&fit=crop&crop=face",
];

const categories = [
  {
    tag: "ЦВЕТОЧНЫЕ",
    name: "Нежность и свежесть",
    count: "47 ароматов",
    slug: "women",
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=900&auto=format&fit=crop",
  },
  {
    tag: "ВОСТОЧНЫЕ",
    name: "Глубина и тайна",
    count: "38 ароматов",
    slug: "unisex",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=900&auto=format&fit=crop",
  },
  {
    tag: "СВЕЖИЕ",
    name: "Лёгкость каждого дня",
    count: "52 аромата",
    slug: "men",
    image: "https://images.unsplash.com/photo-1617943539287-d6fe110ac7ad?w=900&auto=format&fit=crop",
  },
];

const trustItems = [
  { Icon: Truck,        title: "Быстрая доставка",    sub: "1–2 дня по Бишкеку" },
  { Icon: ShieldCheck,  title: "100% оригинал",        sub: "Только сертифицированные бренды" },
  { Icon: RotateCcw,    title: "Возврат 14 дней",      sub: "Без вопросов" },
  { Icon: Headphones,   title: "Поддержка",            sub: "Ежедневно 9:00–21:00" },
];

export function HomePage() {
  return (
    <div style={{ backgroundColor: "#FAFAF8" }}>

      {/* ══════════════════════════════════════════
          HERO — dark, cinematic, full-bleed
      ══════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "95vh",
          minHeight: 640,
          backgroundColor: "#1A1714",
          overflow: "hidden",
        }}
      >
        {/* Atmospheric background — dark studio */}
        <img
          src="https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=1800&auto=format&fit=crop&q=80"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "60% center",
            opacity: 0.35,
          }}
        />

        {/* Dark vignette — sides + bottom */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 70% 40%, transparent 30%, rgba(26,23,20,0.7) 80%), " +
              "linear-gradient(to top, rgba(26,23,20,0.9) 0%, transparent 40%)",
          }}
        />

        {/* Perfume bottle — right side, floating */}
        <div
          className="hero-bottle"
          style={{
            position: "absolute",
            right: "4%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "42%",
            maxWidth: 540,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1774682060922-c395859148c9?w=800&auto=format&fit=crop&q=85"
            alt="Парфюм"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.55)) drop-shadow(0 0 80px rgba(200,169,110,0.12))",
              maskImage: "radial-gradient(ellipse 85% 90% at 50% 50%, black 50%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 85% 90% at 50% 50%, black 50%, transparent 100%)",
            }}
          />
        </div>

        {/* Text — lower-left */}
        <div
          className="hero-text"
          style={{
            position: "absolute",
            bottom: "12%",
            left: "clamp(24px, 6vw, 80px)",
            maxWidth: 520,
            zIndex: 10,
          }}
        >
          {/* Small label */}
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 11,
              letterSpacing: "0.2em",
              color: "#8A8A7A",
              margin: "0 0 22px",
              textTransform: "uppercase",
            }}
          >
            НОВАЯ КОЛЛЕКЦИЯ 2024
          </p>

          {/* Headline — vertical rhythm, each phrase its own line */}
          <h1
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(52px, 6.5vw, 80px)",
              color: "#FAFAF8",
              lineHeight: 1.05,
              margin: 0,
              whiteSpace: "pre-line",
            }}
          >
            {"Парфюм,\nкоторый\nговорит\nза вас"}
          </h1>

          {/* Body text */}
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 15,
              color: "#8A8A7A",
              lineHeight: 1.6,
              marginTop: 20,
              marginBottom: 0,
            }}
          >
            Оригинальная парфюмерия.<br />
            Доставка по всему Кыргызстану.
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
            <Link
              to="/catalog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "14px 28px",
                backgroundColor: "#FAFAF8",
                color: "#1A1714",
                borderRadius: 4,
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                border: "none",
                transition: "opacity 150ms ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Смотреть коллекцию
            </Link>
            <Link
              to="/catalog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "14px 28px",
                backgroundColor: "transparent",
                color: "#FAFAF8",
                borderRadius: 4,
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                fontWeight: 400,
                textDecoration: "none",
                border: "1px solid rgba(250,250,248,0.3)",
                transition: "border-color 200ms ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(250,250,248,0.7)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(250,250,248,0.3)")}
            >
              Подобрать аромат
            </Link>
          </div>

          {/* Social proof */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 32 }}>
            <div style={{ display: "flex" }}>
              {avatarUrls.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt=""
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "2px solid #1A1714",
                    objectFit: "cover",
                    marginLeft: i === 0 ? 0 : -10,
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                color: "#8A8A7A",
              }}
            >
              + 2 840 покупателей · ★ 4.9
            </span>
          </div>
        </div>

        {/* Scroll indicator — bottom center */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: 1,
              height: 40,
              background: "rgba(250,250,248,0.3)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                backgroundColor: "rgba(250,250,248,0.7)",
                animation: "scrollLine 1.8s ease-in-out infinite",
              }}
            />
          </div>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 10,
              letterSpacing: "0.15em",
              color: "rgba(250,250,248,0.3)",
              margin: 0,
            }}
          >
            SCROLL
          </p>
        </div>

        {/* Scroll line animation */}
        <style>{`
          @keyframes scrollLine {
            0%   { height: 0%; top: 0%; }
            50%  { height: 100%; top: 0%; }
            100% { height: 0%; top: 100%; }
          }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════
          КАТЕГОРИИ — editorial dark strips
      ══════════════════════════════════════════ */}
      <style>{`
        .cat-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
        .feat-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
        .trust-grid { display: grid; grid-template-columns: repeat(4,1fr); }
        @media (max-width: 1023px) { .feat-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 767px) {
          .cat-grid { grid-template-columns: 1fr; }
          .feat-grid { grid-template-columns: repeat(2,1fr); }
          .trust-grid { grid-template-columns: repeat(2,1fr); }
          .hero-bottle { display: none !important; }
          .hero-text { left: 24px !important; right: 24px !important; max-width: 100% !important; }
        }
      `}</style>
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px 64px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36 }}>
          <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "clamp(28px,4vw,40px)", color: "#1C1C1C", margin: 0 }}>
            Коллекции
          </h2>
          <Link
            to="/catalog"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#8A8A8A", textDecoration: "none", transition: "color 150ms ease" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#1C1C1C")}
            onMouseLeave={e => (e.currentTarget.style.color = "#8A8A8A")}
          >
            Смотреть все →
          </Link>
        </div>

        <div className="cat-grid">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              to={`/catalog/${cat.slug}`}
              style={{
                position: "relative",
                height: 420,
                borderRadius: 10,
                overflow: "hidden",
                textDecoration: "none",
                display: "block",
                transition: "transform 300ms ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                const arrow = (e.currentTarget as HTMLElement).querySelector(".cat-arrow") as HTMLElement | null;
                if (arrow) { arrow.style.opacity = "1"; arrow.style.transform = "translateX(6px)"; }
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                const arrow = (e.currentTarget as HTMLElement).querySelector(".cat-arrow") as HTMLElement | null;
                if (arrow) { arrow.style.opacity = "0"; arrow.style.transform = "translateX(0)"; }
              }}
            >
              {/* Background image */}
              <img
                src={cat.image}
                alt={cat.name}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to bottom, transparent 40%, rgba(20,18,16,0.85) 100%)",
                }}
              />

              {/* Card content */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "24px 28px",
                }}
              >
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.15em",
                    color: "#C9A96E",
                    margin: "0 0 8px",
                    textTransform: "uppercase",
                  }}
                >
                  {cat.tag}
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: 22,
                    color: "#FAFAF8",
                    margin: "0 0 6px",
                  }}
                >
                  {cat.name}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13,
                      color: "rgba(250,250,248,0.6)",
                      margin: 0,
                    }}
                  >
                    {cat.count}
                  </p>
                  <span
                    className="cat-arrow"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13,
                      color: "#C9A96E",
                      opacity: 0,
                      transform: "translateX(0)",
                      transition: "opacity 200ms ease, transform 200ms ease",
                    }}
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CATALOG PREVIEW STRIP (featured)
      ══════════════════════════════════════════ */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "clamp(22px,3vw,28px)", color: "#1C1C1C", margin: 0 }}>
              Избранные ароматы
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#8A8A8A", marginTop: 6 }}>
              Самые популярные позиции
            </p>
          </div>
          <Link
            to="/catalog"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#1C1C1C", textDecoration: "none", borderBottom: "1px solid #1C1C1C", paddingBottom: 1 }}
          >
            Смотреть все
          </Link>
        </div>

        <div className="feat-grid">
          {[
            { id: 1, name: "No. 5", brand: "CHANEL", price: "12 500", image: "https://images.unsplash.com/photo-1598634222670-87c5f558119c?w=600&auto=format&fit=crop", rating: 4.9 },
            { id: 2, name: "Sauvage", brand: "DIOR", price: "11 800", image: "https://images.unsplash.com/photo-1759794108525-94ff060da692?w=600&auto=format&fit=crop", rating: 4.8 },
            { id: 3, name: "Oud Wood", brand: "TOM FORD", price: "15 200", image: "https://images.unsplash.com/photo-1774682060959-efe13b7a12b9?w=600&auto=format&fit=crop", rating: 5.0 },
            { id: 4, name: "Eros", brand: "VERSACE", price: "9 500", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&auto=format&fit=crop", rating: 4.7 },
          ].map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #EBEBEA",
                  borderRadius: 12,
                  overflow: "hidden",
                  transition: "border-color 200ms ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#C4B99A")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#EBEBEA")}
              >
                <div
                  style={{
                    backgroundColor: "#F5F3EF",
                    aspectRatio: "3/4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 16,
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      maxWidth: "80%",
                      maxHeight: "80%",
                      objectFit: "contain",
                      filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.08))",
                    }}
                  />
                </div>
                <div style={{ padding: "12px 14px 14px" }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#ABABAB", margin: 0, letterSpacing: "0.04em" }}>
                    {product.brand}
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, color: "#1C1C1C", margin: "3px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {product.name}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, color: "#1C1C1C", margin: 0 }}>
                      {product.price} сом
                    </p>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#ABABAB" }}>
                      <span style={{ color: "#C9A96E" }}>★</span> {product.rating}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TRUST STRIP
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#F5F3EF", width: "100%" }}>
        <div
          className="trust-grid"
          style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}
        >
          {trustItems.map(({ Icon, title, sub }, i) => (
            <div
              key={i}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
                padding: "20px 16px",
                borderRight: i < trustItems.length - 1 ? "1px solid #E2E0DC" : "none",
              }}
            >
              <Icon style={{ width: 22, height: 22, color: "#1C1C1C", marginBottom: 12, strokeWidth: 1.5 }} />
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, color: "#1C1C1C", margin: "0 0 4px" }}>
                {title}
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8A8A8A", margin: 0, lineHeight: 1.5 }}>
                {sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom spacer */}
      <div style={{ height: 80 }} />
    </div>
  );
}
