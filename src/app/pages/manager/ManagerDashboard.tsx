import { Link } from "react-router";
import { useState } from "react";
import { Search, Phone, MapPin, ChevronRight } from "lucide-react";

const mockOrders = [
  { id: 1, customerName: "Айгуль Асанова", phone: "+996 555 123 456", product: "Chanel No. 5", amount: 12500, address: "Бишкек, мкр. Асанбай, д. 12, кв. 45", status: "new", createdAt: "2026-05-05 14:30" },
  { id: 2, customerName: "Бекжан Токтогулов", phone: "+996 777 987 654", product: "Dior Sauvage", amount: 11800, address: "Бишкек, ул. Ибраимова, д. 23, кв. 8", status: "in_progress", createdAt: "2026-05-05 13:15" },
  { id: 3, customerName: "Назира Жумабекова", phone: "+996 701 456 789", product: "Tom Ford Oud Wood", amount: 15200, address: "Ош, ул. Курманжан Датка, д. 45", status: "delivery_sent", createdAt: "2026-05-04 16:45" },
  { id: 4, customerName: "Эрлан Мамытов", phone: "+996 550 321 654", product: "Versace Eros", amount: 9500, address: "Бишкек, мкр. Джал, д. 78, кв. 102", status: "no_answer", createdAt: "2026-05-05 11:20" },
  { id: 5, customerName: "Гульнара Исакова", phone: "+996 778 654 321", product: "YSL Black Opium", amount: 10200, address: "Бишкек, ул. Токтогула, д. 156, кв. 24", status: "completed", createdAt: "2026-05-03 09:30" },
];

const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
  new:            { label: "Новый",              bg: "#EBF5FF", color: "#2563EB" },
  in_progress:    { label: "В обработке",        bg: "#FFFBEB", color: "#D97706" },
  no_answer:      { label: "Не отвечает",        bg: "#F5F5F5", color: "#6E6E6E" },
  not_reached:    { label: "Не дозвонились",     bg: "#FEF0F0", color: "#C0392B" },
  delivery_sent:  { label: "Доставка отправлена",bg: "#F0F4FF", color: "#4F46E5" },
  completed:      { label: "Успешно закрыт",     bg: "#ECFDF5", color: "#059669" },
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #EBEBEA",
  borderRadius: 10,
  padding: 20,
};

export function ManagerDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  let filteredOrders = mockOrders;
  if (searchQuery) {
    filteredOrders = filteredOrders.filter(
      o => o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           o.phone.includes(searchQuery) ||
           o.product.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  if (statusFilter) filteredOrders = filteredOrders.filter(o => o.status === statusFilter);

  const statusCounts = mockOrders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }} className="grid-cols-1 md:grid-cols-3">
        {[
          { label: "Новые заказы", value: statusCounts.new || 0, note: "Требуют обработки" },
          { label: "В обработке", value: statusCounts.in_progress || 0, note: "Активные заказы" },
          { label: "Всего заказов", value: mockOrders.length, note: "За сегодня" },
        ].map((card, i) => (
          <div key={i} style={cardStyle}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8A8A8A", margin: 0 }}>{card.label}</p>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 28, color: "#1C1C1C", margin: "6px 0 4px", lineHeight: 1.1 }}>
              {card.value}
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#ABABAB", margin: 0 }}>{card.note}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div style={{ ...cardStyle, marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {/* Search */}
          <div style={{ flex: 1, minWidth: 240, position: "relative" }}>
            <Search style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#ABABAB" }} />
            <input
              type="text"
              placeholder="Поиск по имени, телефону или товару..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                paddingLeft: 40,
                paddingRight: 16,
                paddingTop: 10,
                paddingBottom: 10,
                border: "1px solid #E2E0DC",
                borderRadius: 8,
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "#1C1C1C",
                backgroundColor: "#FFFFFF",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 150ms ease",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "#B8924A")}
              onBlur={e => (e.currentTarget.style.borderColor = "#E2E0DC")}
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter || ""}
            onChange={e => setStatusFilter(e.target.value || null)}
            style={{
              padding: "10px 16px",
              border: "1px solid #E2E0DC",
              borderRadius: 8,
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              color: "#6E6E6E",
              backgroundColor: "#FFFFFF",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="">Все статусы</option>
            {Object.entries(statusConfig).map(([key, cfg]) => (
              <option key={key} value={key}>{cfg.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filteredOrders.map(order => {
          const cfg = statusConfig[order.status] ?? statusConfig.new;
          return (
            <Link
              key={order.id}
              to={`/manager/order/${order.id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #EBEBEA",
                  borderRadius: 10,
                  padding: "18px 20px",
                  transition: "border-color 150ms ease",
                  cursor: "pointer",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#C4B99A")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#EBEBEA")}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 15, color: "#1C1C1C", margin: 0 }}>
                        {order.customerName}
                      </p>
                      <span
                        style={{
                          padding: "3px 10px",
                          borderRadius: 4,
                          backgroundColor: cfg.bg,
                          color: cfg.color,
                          fontFamily: "Inter, sans-serif",
                          fontSize: 12,
                          fontWeight: 400,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {cfg.label}
                      </span>
                    </div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#8A8A8A", margin: 0 }}>{order.product}</p>
                  </div>
                  <ChevronRight style={{ width: 16, height: 16, color: "#ABABAB", flexShrink: 0 }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="grid-cols-1 md:grid-cols-3">
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Phone style={{ width: 14, height: 14, color: "#ABABAB" }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6E6E6E" }}>{order.phone}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <MapPin style={{ width: 14, height: 14, color: "#ABABAB" }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6E6E6E", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{order.address}</span>
                  </div>
                  <div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, color: "#1C1C1C" }}>
                      {order.amount.toLocaleString("ru-RU")} сом
                    </span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#ABABAB", marginLeft: 8 }}>{order.createdAt}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div style={{ ...cardStyle, textAlign: "center", padding: 48 }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#8A8A8A" }}>Заказы не найдены</p>
        </div>
      )}
    </div>
  );
}
