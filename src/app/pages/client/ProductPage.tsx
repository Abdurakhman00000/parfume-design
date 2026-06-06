import { useParams, Link } from "react-router";
import { useState } from "react";
import { Star, ChevronRight, X, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";

const product = {
  id: 1,
  name: "Chanel No. 5",
  brand: "Chanel",
  category: "Цветочные",
  volumes: [
    { ml: "30 мл", price: 8500 },
    { ml: "50 мл", price: 12500 },
    { ml: "100 мл", price: 17800 },
  ],
  rating: 4.9,
  reviews: 234,
  description:
    "Легендарный аромат Chanel No. 5 — символ элегантности и женственности. Созданный в 1921 году Эрнестом Бо, он остается одним из самых узнаваемых парфюмов в мире. Обволакивающий, сложный и одновременно чистый.",
  notes: {
    top: ["Альдегиды", "Нероли", "Лимон"],
    heart: ["Жасмин", "Роза", "Ландыш"],
    base: ["Ваниль", "Сандал", "Ветивер"],
  },
  inStock: true,
  images: [
    "https://images.unsplash.com/photo-1598634222670-87c5f558119c?w=900&auto=format&fit=crop&q=85",
    "https://images.unsplash.com/photo-1774682060922-c395859148c9?w=900&auto=format&fit=crop&q=85",
    "https://images.unsplash.com/photo-1595425959632-34f2822322ce?w=900&auto=format&fit=crop&q=85",
  ],
};

const relatedProducts = [
  { id: 2, name: "Sauvage", brand: "DIOR", price: 9800, image: "https://images.unsplash.com/photo-1759794108525-94ff060da692?w=400&auto=format&fit=crop" },
  { id: 3, name: "Oud Wood", brand: "TOM FORD", price: 15200, image: "https://images.unsplash.com/photo-1774682060959-efe13b7a12b9?w=400&auto=format&fit=crop" },
  { id: 4, name: "Black Opium", brand: "YSL", price: 8500, image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&auto=format&fit=crop" },
  { id: 5, name: "Aventus", brand: "CREED", price: 18500, image: "https://images.unsplash.com/photo-1765572354938-b88b9d7244cb?w=400&auto=format&fit=crop" },
];

export function ProductPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVolume, setSelectedVolume] = useState(1);
  const [orderFormOpen, setOrderFormOpen] = useState(false);

  const currentPrice = product.volumes[selectedVolume].price;

  const prevImage = () => setSelectedImage(i => (i === 0 ? product.images.length - 1 : i - 1));
  const nextImage = () => setSelectedImage(i => (i === product.images.length - 1 ? 0 : i + 1));

  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh" }}>

      {/* Breadcrumbs */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 32px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {[
            { to: "/", label: "Главная" },
            { to: "/catalog", label: "Каталог" },
          ].map(({ to, label }) => (
            <span key={to} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Link
                to={to}
                style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8A8A8A", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#1C1C1C")}
                onMouseLeave={e => (e.currentTarget.style.color = "#8A8A8A")}
              >
                {label}
              </Link>
              <ChevronRight style={{ width: 14, height: 14, color: "#CBCBCB" }} />
            </span>
          ))}
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#1C1C1C" }}>
            {product.name}
          </span>
        </div>
      </div>

      {/* Main product section */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 32px 80px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 64 }}>

          {/* ── Left: Image Gallery ── */}
          <div>
            {/* Main image */}
            <div
              style={{
                position: "relative",
                backgroundColor: "#F5F3EF",
                borderRadius: 16,
                overflow: "hidden",
                aspectRatio: "1 / 1",
              }}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />

              {/* Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    style={{
                      position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
                      width: 40, height: 40, borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    }}
                  >
                    <ChevronLeft style={{ width: 18, height: 18, color: "#1C1C1C" }} />
                  </button>
                  <button
                    onClick={nextImage}
                    style={{
                      position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
                      width: 40, height: 40, borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    }}
                  >
                    <ChevronRightIcon style={{ width: 18, height: 18, color: "#1C1C1C" }} />
                  </button>
                </>
              )}

              {/* Dot indicators */}
              <div
                style={{
                  position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
                  display: "flex", gap: 6,
                }}
              >
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    style={{
                      width: i === selectedImage ? 20 : 6,
                      height: 6, borderRadius: 3,
                      backgroundColor: i === selectedImage ? "#1C1C1C" : "rgba(28,28,28,0.3)",
                      border: "none", cursor: "pointer",
                      transition: "all 200ms ease", padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  style={{
                    flex: 1, aspectRatio: "1 / 1", borderRadius: 10, overflow: "hidden",
                    border: `2px solid ${selectedImage === i ? "#1C1C1C" : "transparent"}`,
                    padding: 0, cursor: "pointer",
                    opacity: selectedImage === i ? 1 : 0.55,
                    transition: "all 200ms ease",
                  }}
                >
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Product Info ── */}
          <div style={{ display: "flex", flexDirection: "column" }}>

            {/* Brand + name */}
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8A8A8A", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px" }}>
              {product.brand}
            </p>
            <h1 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 42px)", color: "#1C1C1C", lineHeight: 1.1, margin: "0 0 16px" }}>
              {product.name}
            </h1>

            {/* Rating row */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {[1,2,3,4,5].map(s => (
                  <Star
                    key={s}
                    style={{
                      width: 14, height: 14,
                      color: "#C9A96E",
                      fill: s <= Math.round(product.rating) ? "#C9A96E" : "none",
                    }}
                  />
                ))}
              </div>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#1C1C1C" }}>
                {product.rating}
              </span>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8A8A8A" }}>
                {product.reviews} отзывов
              </span>
              {product.inStock && (
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#3D7A52", backgroundColor: "#EDF4ED", padding: "2px 10px", borderRadius: 20 }}>
                  В наличии
                </span>
              )}
            </div>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: "#EBEBEA", marginBottom: 28 }} />

            {/* Volume selector */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: "#1C1C1C", marginBottom: 12 }}>
                Объём
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {product.volumes.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedVolume(i)}
                    style={{
                      padding: "10px 18px",
                      borderRadius: 8,
                      border: selectedVolume === i ? "2px solid #1C1C1C" : "1px solid #E2E0DC",
                      backgroundColor: selectedVolume === i ? "#1C1C1C" : "#FFFFFF",
                      color: selectedVolume === i ? "#FFFFFF" : "#4A4A4A",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13,
                      fontWeight: selectedVolume === i ? 500 : 400,
                      cursor: "pointer",
                      transition: "all 150ms ease",
                    }}
                  >
                    {v.ml}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 36, color: "#1C1C1C", margin: 0, lineHeight: 1 }}>
                {currentPrice.toLocaleString("ru-RU")} сом
              </p>
            </div>

            {/* CTA buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              <button
                onClick={() => setOrderFormOpen(true)}
                style={{
                  width: "100%", padding: "16px 0",
                  backgroundColor: "#1C1C1C", color: "#FFFFFF",
                  borderRadius: 10, border: "none", cursor: "pointer",
                  fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 500,
                  letterSpacing: "0.02em", transition: "background-color 150ms ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#333")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1C1C1C")}
              >
                Заказать
              </button>
              <a
                href="https://wa.me/996"
                style={{
                  width: "100%", padding: "15px 0",
                  backgroundColor: "transparent", color: "#1C1C1C",
                  borderRadius: 10, border: "1px solid #1C1C1C", cursor: "pointer",
                  fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 400,
                  textDecoration: "none", textAlign: "center",
                  display: "block", transition: "background-color 150ms ease",
                  boxSizing: "border-box",
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#F5F3EF"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                Написать в WhatsApp
              </a>
            </div>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: "#EBEBEA", marginBottom: 28 }} />

            {/* Description */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, color: "#1C1C1C", marginBottom: 10 }}>
                Описание
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#5A5A5A", lineHeight: 1.7, margin: 0 }}>
                {product.description}
              </p>
            </div>

            {/* Fragrance notes */}
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, color: "#1C1C1C", marginBottom: 16 }}>
                Ноты аромата
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid #EBEBEA", borderRadius: 10, overflow: "hidden" }}>
                {[
                  { label: "Верхние", sublabel: "Первое впечатление", notes: product.notes.top, color: "#EDF4ED", dot: "#5CA870" },
                  { label: "Сердце", sublabel: "Характер аромата", notes: product.notes.heart, color: "#F5F0E8", dot: "#C9A96E" },
                  { label: "База", sublabel: "Послевкусие", notes: product.notes.base, color: "#F0EBF5", dot: "#8B6BAF" },
                ].map((tier, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: 16,
                      padding: "14px 18px",
                      borderBottom: i < 2 ? "1px solid #EBEBEA" : "none",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <div style={{ minWidth: 80 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: tier.dot, flexShrink: 0 }} />
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: "#1C1C1C" }}>
                          {tier.label}
                        </span>
                      </div>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#ABABAB", margin: 0, paddingLeft: 14 }}>
                        {tier.sublabel}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, flex: 1 }}>
                      {tier.notes.map(note => (
                        <span
                          key={note}
                          style={{
                            padding: "4px 10px", borderRadius: 20,
                            backgroundColor: tier.color,
                            fontFamily: "Inter, sans-serif", fontSize: 12, color: "#4A4A4A",
                          }}
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      <div style={{ backgroundColor: "#F5F3EF", width: "100%" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 24, color: "#1C1C1C", margin: 0 }}>
              Вам может понравиться
            </h2>
            <Link
              to="/catalog"
              style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8A8A8A", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#1C1C1C")}
              onMouseLeave={e => (e.currentTarget.style.color = "#8A8A8A")}
            >
              Смотреть все →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: 16 }}>
            {relatedProducts.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    backgroundColor: "#FFFFFF", borderRadius: 12,
                    border: "1px solid #EBEBEA", overflow: "hidden",
                    transition: "border-color 200ms ease",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "#C4B99A")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "#EBEBEA")}
                >
                  <div style={{ aspectRatio: "3/4", backgroundColor: "#F5F3EF", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain", filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.08))" }}
                    />
                  </div>
                  <div style={{ padding: "12px 14px 14px" }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#ABABAB", margin: 0, letterSpacing: "0.04em" }}>{p.brand}</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, color: "#1C1C1C", margin: "3px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, color: "#1C1C1C", margin: "8px 0 0" }}>
                      {p.price.toLocaleString("ru-RU")} сом
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Order Form Modal */}
      {orderFormOpen && (
        <OrderFormModal
          product={{ ...product, price: currentPrice }}
          onClose={() => setOrderFormOpen(false)}
        />
      )}
    </div>
  );
}

function OrderFormModal({ product, onClose }: { product: any; onClose: () => void }) {
  const [step, setStep] = useState<"form" | "payment" | "success">("form");
  const [formData, setFormData] = useState({ fullName: "", phone: "", address: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentComplete = () => {
    setStep("success");
    setTimeout(onClose, 3000);
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: 20, width: "100%", maxWidth: 440, maxHeight: "92vh", overflowY: "auto" }}>
        {/* Header */}
        <div style={{ position: "sticky", top: 0, backgroundColor: "#FFFFFF", borderBottom: "1px solid #F0EDE7", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: "20px 20px 0 0" }}>
          <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 17, color: "#1C1C1C", margin: 0 }}>
            {step === "form" && "Оформление заказа"}
            {step === "payment" && "Оплата"}
            {step === "success" && "Заказ принят"}
          </h2>
          <button
            onClick={onClose}
            style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F3EF", border: "none", borderRadius: "50%", cursor: "pointer" }}
          >
            <X style={{ width: 16, height: 16, color: "#1C1C1C" }} />
          </button>
        </div>

        <div style={{ padding: 24 }}>
          {step === "form" && (
            <form onSubmit={handleSubmit}>
              {/* Product preview */}
              <div style={{ display: "flex", gap: 14, padding: 14, backgroundColor: "#F5F3EF", borderRadius: 12, marginBottom: 24 }}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8, flexShrink: 0 }}
                />
                <div>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8A8A8A", margin: "0 0 4px" }}>{product.brand}</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, color: "#1C1C1C", margin: "0 0 6px" }}>{product.name}</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 18, color: "#1C1C1C", margin: 0 }}>
                    {product.price.toLocaleString("ru-RU")} сом
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Имя и Фамилия", key: "fullName", type: "text", placeholder: "Иван Иванов" },
                  { label: "Номер телефона", key: "phone", type: "tel", placeholder: "+996 XXX XXX XXX" },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ display: "block", fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: "#1C1C1C", marginBottom: 8 }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required
                      value={formData[field.key as keyof typeof formData]}
                      onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      style={{
                        width: "100%", padding: "12px 14px",
                        border: "1px solid #E2E0DC", borderRadius: 10,
                        fontFamily: "Inter, sans-serif", fontSize: 14, color: "#1C1C1C",
                        outline: "none", boxSizing: "border-box",
                      }}
                      onFocus={e => (e.target.style.borderColor = "#1C1C1C")}
                      onBlur={e => (e.target.style.borderColor = "#E2E0DC")}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ display: "block", fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: "#1C1C1C", marginBottom: 8 }}>
                    Адрес доставки
                  </label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    placeholder="Город, улица, дом, квартира"
                    style={{
                      width: "100%", padding: "12px 14px",
                      border: "1px solid #E2E0DC", borderRadius: 10,
                      fontFamily: "Inter, sans-serif", fontSize: 14, color: "#1C1C1C",
                      outline: "none", resize: "none", boxSizing: "border-box",
                    }}
                    onFocus={e => (e.target.style.borderColor = "#1C1C1C")}
                    onBlur={e => (e.target.style.borderColor = "#E2E0DC")}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%", padding: "15px 0",
                    backgroundColor: "#1C1C1C", color: "#FFFFFF",
                    borderRadius: 10, border: "none", cursor: "pointer",
                    fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 500,
                    marginTop: 4,
                  }}
                >
                  Перейти к оплате →
                </button>
              </div>
            </form>
          )}

          {step === "payment" && (
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8A8A8A", marginBottom: 24 }}>
                Отсканируйте QR-код через приложение банка
              </p>
              <div
                style={{
                  width: 220, height: 220, margin: "0 auto 24px",
                  backgroundColor: "#F5F3EF", borderRadius: 16,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                <div style={{ fontSize: 48 }}>📱</div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8A8A8A", margin: 0 }}>QR-код Mbank / Optima</p>
              </div>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 28, color: "#1C1C1C", margin: "0 0 8px" }}>
                {product.price.toLocaleString("ru-RU")} сом
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8A8A8A", marginBottom: 28 }}>
                После оплаты нажмите кнопку ниже
              </p>
              <button
                onClick={handlePaymentComplete}
                style={{
                  width: "100%", padding: "15px 0",
                  backgroundColor: "#3D7A52", color: "#FFFFFF",
                  borderRadius: 10, border: "none", cursor: "pointer",
                  fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 500,
                }}
              >
                ✓ Я оплатил
              </button>
            </div>
          )}

          {step === "success" && (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ width: 72, height: 72, backgroundColor: "#EDF4ED", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 32 }}>
                ✓
              </div>
              <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 20, color: "#1C1C1C", margin: "0 0 10px" }}>
                Спасибо за заказ!
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#5A5A5A", lineHeight: 1.6, margin: 0 }}>
                Менеджер свяжется с вами<br />в течение 15–30 минут
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
