import { Link } from "react-router";
import { useState } from "react";
import { Heart } from "lucide-react";

const allProducts = [
  {
    id: 1, name: "No. 5", brand: "CHANEL", category: "Цветочные",
    price: 12500, oldPrice: null,
    image: "https://images.unsplash.com/photo-1598634222670-87c5f558119c?w=600&auto=format&fit=crop",
    rating: 4.9, reviews: 127, volumes: ["30мл", "50мл", "100мл"], activeVolume: "50мл", badge: null, sale: false,
  },
  {
    id: 2, name: "Sauvage", brand: "DIOR", category: "Свежие",
    price: 9800, oldPrice: 11800,
    image: "https://images.unsplash.com/photo-1759794108525-94ff060da692?w=600&auto=format&fit=crop",
    rating: 4.8, reviews: 214, volumes: ["60мл", "100мл", "200мл"], activeVolume: "100мл", badge: "−17%", sale: true,
  },
  {
    id: 3, name: "Oud Wood", brand: "TOM FORD", category: "Древесные",
    price: 15200, oldPrice: null,
    image: "https://images.unsplash.com/photo-1774682060959-efe13b7a12b9?w=600&auto=format&fit=crop",
    rating: 5.0, reviews: 89, volumes: ["50мл", "100мл"], activeVolume: "50мл", badge: null, sale: false,
  },
  {
    id: 4, name: "Black Opium", brand: "YSL", category: "Восточные",
    price: 8500, oldPrice: 10200,
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&auto=format&fit=crop",
    rating: 4.9, reviews: 176, volumes: ["30мл", "50мл", "90мл"], activeVolume: "50мл", badge: "−17%", sale: true,
  },
  {
    id: 5, name: "Aventus", brand: "CREED", category: "Древесные",
    price: 18500, oldPrice: null,
    image: "https://images.unsplash.com/photo-1765572354938-b88b9d7244cb?w=600&auto=format&fit=crop",
    rating: 5.0, reviews: 63, volumes: ["50мл", "100мл", "250мл"], activeVolume: "100мл", badge: "НОВИНКА", sale: false,
  },
  {
    id: 6, name: "Bloom", brand: "GUCCI", category: "Цветочные",
    price: 9900, oldPrice: 11500,
    image: "https://images.unsplash.com/photo-1595425959632-34f2822322ce?w=600&auto=format&fit=crop",
    rating: 4.8, reviews: 142, volumes: ["30мл", "50мл", "100мл"], activeVolume: "50мл", badge: "−14%", sale: true,
  },
  {
    id: 7, name: "1 Million", brand: "PACO RABANNE", category: "Восточные",
    price: 8900, oldPrice: null,
    image: "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=600&auto=format&fit=crop",
    rating: 4.6, reviews: 98, volumes: ["50мл", "100мл"], activeVolume: "50мл", badge: null, sale: false,
  },
  {
    id: 8, name: "Eros", brand: "VERSACE", category: "Свежие",
    price: 7600, oldPrice: 9500,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&auto=format&fit=crop",
    rating: 4.7, reviews: 203, volumes: ["30мл", "50мл", "100мл"], activeVolume: "50мл", badge: "−20%", sale: true,
  },
];

const categoryPills = ["Все", "Цветочные", "Древесные", "Восточные", "Свежие", "Новинки", "SALE"];

const sortOptions = [
  { value: "popular",    label: "По популярности" },
  { value: "price-asc",  label: "По цене ↑" },
  { value: "price-desc", label: "По цене ↓" },
];

export function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc">("popular");
  const [sortOpen, setSortOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [activeVolumes, setActiveVolumes] = useState<Record<number, string>>({});

  const toggleWishlist = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const setVolume = (e: React.MouseEvent, productId: number, vol: string) => {
    e.preventDefault();
    setActiveVolumes(prev => ({ ...prev, [productId]: vol }));
  };

  let filtered = allProducts;
  if (activeCategory === "SALE")     filtered = filtered.filter(p => p.sale);
  else if (activeCategory === "Новинки") filtered = filtered.filter(p => p.badge === "НОВИНКА");
  else if (activeCategory !== "Все") filtered = filtered.filter(p => p.category === activeCategory);

  if (sortBy === "price-asc")  filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);

  const currentSortLabel = sortOptions.find(o => o.value === sortBy)?.label ?? "По популярности";

  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 32px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 32, color: "#1C1C1C", margin: 0 }}>
            Все ароматы
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 14, color: "#8A8A8A", marginTop: 6 }}>
            200+ ароматов в наличии
          </p>
        </div>

        {/* Filter Row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 12 }}>
          {/* Category Pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {categoryPills.map(pill => {
              const isActive = activeCategory === pill;
              return (
                <button
                  key={pill}
                  onClick={() => setActiveCategory(pill)}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    fontWeight: 400,
                    padding: "8px 16px",
                    borderRadius: 6,
                    border: isActive ? "1px solid transparent" : "1px solid #E2E0DC",
                    backgroundColor: isActive ? "#1C1C1C" : "#FFFFFF",
                    color: isActive ? "#FFFFFF" : "#6E6E6E",
                    cursor: "pointer",
                    transition: "all 150ms ease",
                    lineHeight: 1,
                  }}
                >
                  {pill}
                </button>
              );
            })}
          </div>

          {/* Sort */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setSortOpen(o => !o)}
              style={{
                fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8A8A8A",
                background: "none", border: "none", cursor: "pointer", padding: 0,
              }}
            >
              Сортировка: {currentSortLabel}
            </button>
            {sortOpen && (
              <div
                style={{
                  position: "absolute", right: 0, top: "calc(100% + 8px)",
                  backgroundColor: "#FFFFFF", border: "1px solid #E2E0DC",
                  borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  zIndex: 50, minWidth: 200, overflow: "hidden",
                }}
              >
                {sortOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setSortBy(opt.value as any); setSortOpen(false); }}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "10px 16px", fontFamily: "Inter, sans-serif", fontSize: 13,
                      color: sortBy === opt.value ? "#1C1C1C" : "#6E6E6E",
                      fontWeight: sortBy === opt.value ? 500 : 400,
                      background: sortBy === opt.value ? "#FAFAF8" : "none",
                      border: "none", cursor: "pointer",
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: 16 }}>
          {filtered.map(product => {
            const currentVolume = activeVolumes[product.id] ?? product.activeVolume;
            const inWishlist = wishlist.includes(product.id);

            return (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
              >
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #EBEBEA",
                    borderRadius: 12,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "border-color 200ms ease",
                    height: "100%",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "#C4B99A")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "#EBEBEA")}
                >
                  {/* Image Zone */}
                  <div
                    style={{
                      backgroundColor: "#F5F3EF",
                      aspectRatio: "3/4",
                      position: "relative",
                      padding: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        maxWidth: "80%",
                        maxHeight: "80%",
                        objectFit: "contain",
                        display: "block",
                        filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.08))",
                      }}
                    />

                    {/* Wishlist */}
                    <button
                      onClick={e => toggleWishlist(e, product.id)}
                      style={{
                        position: "absolute", top: 12, right: 12,
                        width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                        background: "none", border: "none", cursor: "pointer", padding: 0,
                      }}
                    >
                      <Heart
                        size={18}
                        style={{
                          color: inWishlist ? "#C0392B" : "#C4C0BA",
                          fill: inWishlist ? "#C0392B" : "none",
                          transition: "all 150ms ease",
                        }}
                      />
                    </button>

                    {/* Badge */}
                    {product.badge && (
                      <div
                        style={{
                          position: "absolute", top: 12, left: 12,
                          padding: "3px 8px", borderRadius: 4,
                          fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 400,
                          ...(product.badge === "НОВИНКА"
                            ? { backgroundColor: "#EDF4ED", color: "#3D7A52" }
                            : { backgroundColor: "#FEF0F0", color: "#C0392B" }),
                        }}
                      >
                        {product.badge}
                      </div>
                    )}
                  </div>

                  {/* Content Zone */}
                  <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 11, color: "#ABABAB", margin: 0, letterSpacing: "0.04em" }}>
                      {product.brand}
                    </p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 15, color: "#1C1C1C", margin: "3px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {product.name}
                    </p>

                    {/* Volume pills */}
                    <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                      {product.volumes.map(vol => {
                        const isActiveVol = currentVolume === vol;
                        return (
                          <button
                            key={vol}
                            onClick={e => setVolume(e, product.id, vol)}
                            style={{
                              padding: "2px 7px", borderRadius: 4,
                              border: isActiveVol ? "1px solid #1C1C1C" : "1px solid #E2E0DC",
                              fontFamily: "Inter, sans-serif", fontSize: 11,
                              color: isActiveVol ? "#1C1C1C" : "#8A8A8A",
                              background: "none", cursor: "pointer", transition: "all 100ms ease",
                            }}
                          >
                            {vol}
                          </button>
                        );
                      })}
                    </div>

                    {/* Rating */}
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
                      <span style={{ color: "#C9A96E", fontSize: 12 }}>★</span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#ABABAB" }}>
                        {product.rating} · {product.reviews} отзывов
                      </span>
                    </div>

                    {/* Price */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 17, color: "#1C1C1C" }}>
                        {product.price.toLocaleString("ru-RU")} сом
                      </span>
                      {product.oldPrice && (
                        <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13, color: "#ABABAB", textDecoration: "line-through" }}>
                          {product.oldPrice.toLocaleString("ru-RU")} сом
                        </span>
                      )}
                    </div>

                    {/* Add to cart */}
                    <button
                      onClick={e => e.preventDefault()}
                      style={{
                        marginTop: 12, width: "100%", height: 38, borderRadius: 6,
                        border: "1px solid #1C1C1C", backgroundColor: "#FFFFFF",
                        color: "#1C1C1C", fontFamily: "Inter, sans-serif", fontSize: 13,
                        fontWeight: 400, cursor: "pointer", transition: "all 150ms ease",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#1C1C1C"; e.currentTarget.style.color = "#FFFFFF"; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#FFFFFF"; e.currentTarget.style.color = "#1C1C1C"; }}
                    >
                      В корзину
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", paddingTop: 80, paddingBottom: 80 }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: "#8A8A8A" }}>Товары не найдены</p>
            <button
              onClick={() => setActiveCategory("Все")}
              style={{ marginTop: 12, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#1C1C1C", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
            >
              Сбросить фильтр
            </button>
          </div>
        )}
      </div>

      {sortOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => setSortOpen(false)} />
      )}
    </div>
  );
}
