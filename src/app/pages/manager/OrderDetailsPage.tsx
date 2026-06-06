import { useParams, Link } from "react-router";
import { useState } from "react";
import { ArrowLeft, Phone, MapPin, Package, Calendar } from "lucide-react";

const mockOrder = {
  id: 1,
  customerName: "Айгуль Асанова",
  phone: "+996 555 123 456",
  product: {
    name: "Chanel No. 5",
    brand: "CHANEL",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&auto=format&fit=crop",
  },
  amount: 12500,
  address: "Бишкек, мкр. Асанбай, д. 12, кв. 45",
  status: "new",
  createdAt: "2026-05-05 14:30",
  notes: "",
};

const statusOptions = [
  { value: "new",           label: "Новый" },
  { value: "in_progress",   label: "В обработке" },
  { value: "no_answer",     label: "Не отвечает" },
  { value: "not_reached",   label: "Не дозвонились" },
  { value: "delivery_sent", label: "Доставка отправлена" },
  { value: "completed",     label: "Успешно закрыт" },
];

const cardStyle: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #EBEBEA",
  borderRadius: 12,
  padding: 24,
};

export function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(mockOrder);
  const [notes, setNotes] = useState(order.notes);
  const [saving, setSaving] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 400));
    setOrder({ ...order, status: newStatus });
    setSaving(false);
  };

  const handleSaveNotes = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 400));
    setOrder({ ...order, notes });
    setSaving(false);
  };

  return (
    <div>
      <Link
        to="/manager"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "Inter, sans-serif",
          fontSize: 13,
          color: "#8A8A8A",
          textDecoration: "none",
          marginBottom: 24,
          transition: "color 150ms ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "#1C1C1C")}
        onMouseLeave={e => (e.currentTarget.style.color = "#8A8A8A")}
      >
        <ArrowLeft style={{ width: 15, height: 15 }} />
        Назад к списку
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, alignItems: "start" }} className="grid-cols-1 lg:grid-cols-[1fr_320px]">

        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Customer Info */}
          <div style={cardStyle}>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 16, color: "#1C1C1C", margin: "0 0 20px" }}>
              Информация о клиенте
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8A8A8A", margin: "0 0 4px" }}>Имя</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 15, color: "#1C1C1C", margin: 0 }}>
                  {order.customerName}
                </p>
              </div>
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8A8A8A", margin: "0 0 6px" }}>Телефон</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 15, color: "#1C1C1C", margin: 0 }}>
                    {order.phone}
                  </p>
                  <button
                    onClick={() => (window.location.href = `tel:${order.phone}`)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "7px 14px",
                      border: "1px solid #1C1C1C",
                      borderRadius: 6,
                      backgroundColor: "#FFFFFF",
                      color: "#1C1C1C",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13,
                      cursor: "pointer",
                      transition: "all 150ms ease",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = "#1C1C1C";
                      e.currentTarget.style.color = "#FFFFFF";
                      (e.currentTarget.querySelector("svg") as SVGElement | null)?.setAttribute("stroke", "#FFFFFF");
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = "#FFFFFF";
                      e.currentTarget.style.color = "#1C1C1C";
                      (e.currentTarget.querySelector("svg") as SVGElement | null)?.setAttribute("stroke", "#1C1C1C");
                    }}
                  >
                    <Phone style={{ width: 14, height: 14 }} />
                    Позвонить
                  </button>
                </div>
              </div>
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8A8A8A", margin: "0 0 6px" }}>Адрес доставки</p>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                  <MapPin style={{ width: 15, height: 15, color: "#ABABAB", marginTop: 2, flexShrink: 0 }} />
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#1C1C1C", margin: 0, lineHeight: 1.5 }}>
                    {order.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div style={cardStyle}>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 16, color: "#1C1C1C", margin: "0 0 20px" }}>
              Информация о товаре
            </h2>
            <div style={{ display: "flex", gap: 16 }}>
              <img
                src={order.product.image}
                alt={order.product.name}
                style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, backgroundColor: "#F5F3EF" }}
              />
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#ABABAB", margin: 0, letterSpacing: "0.04em" }}>
                  {order.product.brand}
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 15, color: "#1C1C1C", margin: "4px 0 8px" }}>
                  {order.product.name}
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 20, color: "#1C1C1C", margin: 0 }}>
                  {order.amount.toLocaleString("ru-RU")} сом
                </p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div style={cardStyle}>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 16, color: "#1C1C1C", margin: "0 0 14px" }}>
              Примечания
            </h2>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={4}
              placeholder="Добавьте примечания к заказу..."
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1px solid #E2E0DC",
                borderRadius: 8,
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "#1C1C1C",
                resize: "vertical",
                outline: "none",
                boxSizing: "border-box",
                marginBottom: 12,
                transition: "border-color 150ms ease",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "#B8924A")}
              onBlur={e => (e.currentTarget.style.borderColor = "#E2E0DC")}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={handleSaveNotes}
                disabled={saving}
                style={{
                  padding: "9px 20px",
                  backgroundColor: "#1C1C1C",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: 6,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  cursor: saving ? "not-allowed" : "pointer",
                  opacity: saving ? 0.6 : 1,
                  transition: "opacity 150ms ease",
                }}
              >
                {saving ? "Сохранение..." : "Сохранить"}
              </button>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Status selector */}
          <div style={cardStyle}>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 16, color: "#1C1C1C", margin: "0 0 14px" }}>
              Статус заказа
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {statusOptions.map(opt => {
                const isActive = order.status === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleStatusChange(opt.value)}
                    disabled={saving}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: 6,
                      border: "none",
                      textAlign: "left",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13,
                      fontWeight: isActive ? 500 : 400,
                      backgroundColor: isActive ? "#1C1C1C" : "transparent",
                      color: isActive ? "#FFFFFF" : "#6E6E6E",
                      cursor: saving ? "not-allowed" : "pointer",
                      transition: "background 120ms ease",
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = "#F5F3EF"; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Order meta */}
          <div style={cardStyle}>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 16, color: "#1C1C1C", margin: "0 0 14px" }}>
              Информация о заказе
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <Calendar style={{ width: 15, height: 15, color: "#ABABAB", marginTop: 2 }} />
                <div>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8A8A8A", margin: 0 }}>Дата создания</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13, color: "#1C1C1C", margin: "2px 0 0" }}>
                    {order.createdAt}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <Package style={{ width: 15, height: 15, color: "#ABABAB", marginTop: 2 }} />
                <div>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8A8A8A", margin: 0 }}>ID заказа</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 13, color: "#1C1C1C", margin: "2px 0 0" }}>
                    #{order.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
