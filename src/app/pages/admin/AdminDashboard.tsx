import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line,
} from "recharts";

const salesData = [
  { month: "Янв", sales: 450000, orders: 38 },
  { month: "Фев", sales: 520000, orders: 45 },
  { month: "Мар", sales: 680000, orders: 56 },
  { month: "Апр", sales: 750000, orders: 62 },
  { month: "Май", sales: 820000, orders: 68 },
];

const topProducts = [
  { name: "Chanel No. 5", sales: 45, revenue: 562500 },
  { name: "Dior Sauvage", sales: 38, revenue: 448400 },
  { name: "Tom Ford Oud Wood", sales: 32, revenue: 486400 },
  { name: "Creed Aventus", sales: 28, revenue: 518000 },
];

const managerStats = [
  { name: "Айгуль Токтогулова", orders: 156, completed: 142, efficiency: 91 },
  { name: "Бекжан Мамытов", orders: 134, completed: 125, efficiency: 93 },
  { name: "Назира Асанова", orders: 128, completed: 115, efficiency: 90 },
];

const statCards = [
  { label: "Продажи за месяц", value: "820 000 сом", delta: "↑ +12.5% к прошлому месяцу", up: true },
  { label: "Заказов", value: "68", delta: "↑ +9.7% к прошлому месяцу", up: true },
  { label: "Клиентов", value: "245", delta: "↑ +18.2% к прошлому месяцу", up: true },
  { label: "Средний чек", value: "12 059 сом", delta: "↑ +2.5% к прошлому месяцу", up: true },
];

const s = {
  card: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #EBEBEA",
    borderRadius: 10,
    padding: 20,
  } as React.CSSProperties,
};

export function AdminDashboard() {
  return (
    <div>
      <h1 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 24, color: "#1C1C1C", marginBottom: 28 }}>
        Дашборд
      </h1>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }} className="grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, i) => (
          <div key={i} style={s.card}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8A8A8A", margin: 0 }}>{card.label}</p>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 28, color: "#1C1C1C", margin: "6px 0 4px", lineHeight: 1.1 }}>
              {card.value}
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#3D7A52", margin: 0 }}>{card.delta}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }} className="grid-cols-1 lg:grid-cols-2">
        {/* Bar chart */}
        <div style={s.card}>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 15, color: "#1C1C1C", margin: "0 0 20px" }}>
            Продажи по месяцам
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={salesData} barSize={32}>
              <CartesianGrid vertical={false} stroke="#F0EDE7" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontFamily: "Inter", fontSize: 11, fill: "#ABABAB" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontFamily: "Inter", fontSize: 11, fill: "#ABABAB" }}
                tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{ fontFamily: "Inter", fontSize: 12, border: "1px solid #E2E0DC", borderRadius: 8 }}
                formatter={(v: number) => [`${v.toLocaleString("ru-RU")} сом`, "Продажи"]}
              />
              <Bar
                dataKey="sales"
                fill="#C4B99A"
                radius={[6, 6, 0, 0]}
                onMouseEnter={() => {}}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line chart */}
        <div style={s.card}>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 15, color: "#1C1C1C", margin: "0 0 20px" }}>
            Количество заказов
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={salesData}>
              <CartesianGrid vertical={false} stroke="#F0EDE7" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontFamily: "Inter", fontSize: 11, fill: "#ABABAB" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontFamily: "Inter", fontSize: 11, fill: "#ABABAB" }}
              />
              <Tooltip
                contentStyle={{ fontFamily: "Inter", fontSize: 12, border: "1px solid #E2E0DC", borderRadius: 8 }}
                formatter={(v: number) => [v, "Заказов"]}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#B8924A"
                strokeWidth={2}
                dot={{ fill: "#B8924A", r: 4, strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid-cols-1 lg:grid-cols-2">
        {/* Top Products */}
        <div style={s.card}>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 15, color: "#1C1C1C", margin: "0 0 16px" }}>
            Популярные товары
          </p>
          <div>
            {topProducts.map((product, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: i < topProducts.length - 1 ? "1px solid #F0EDE7" : "none",
                  cursor: "default",
                  transition: "background 100ms ease",
                  borderRadius: 6,
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#FAFAF8")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, color: "#1C1C1C", margin: 0 }}>
                    {product.name}
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8A8A8A", margin: "2px 0 0" }}>
                    {product.sales} продаж
                  </p>
                </div>
                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, color: "#1C1C1C", margin: 0 }}>
                  {product.revenue.toLocaleString("ru-RU")} сом
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Manager Stats */}
        <div style={s.card}>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 15, color: "#1C1C1C", margin: "0 0 16px" }}>
            Эффективность менеджеров
          </p>
          <div>
            {managerStats.map((m, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 0",
                  borderBottom: i < managerStats.length - 1 ? "1px solid #F0EDE7" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14, color: "#1C1C1C", margin: 0 }}>
                    {m.name}
                  </p>
                  <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, color: "#3D7A52" }}>
                    {m.efficiency}%
                  </span>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8A8A8A" }}>{m.orders} заказов</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#ABABAB" }}>·</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8A8A8A" }}>{m.completed} закрыто</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
