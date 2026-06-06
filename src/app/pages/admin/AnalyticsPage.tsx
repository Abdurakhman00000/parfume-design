import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Download, Calendar } from "lucide-react";

// Mock data
const monthlyData = [
  { month: "Янв", revenue: 450000, orders: 38, customers: 32 },
  { month: "Фев", revenue: 520000, orders: 45, customers: 39 },
  { month: "Мар", revenue: 680000, orders: 56, customers: 48 },
  { month: "Апр", revenue: 750000, orders: 62, customers: 55 },
  { month: "Май", revenue: 820000, orders: 68, customers: 61 },
  { month: "Июн", revenue: 0, orders: 0, customers: 0 },
];

const categoryData = [
  { name: "Женские", value: 45, color: "#f472b6" },
  { name: "Мужские", value: 35, color: "#60a5fa" },
  { name: "Унисекс", value: 20, color: "#a78bfa" },
];

const conversionData = [
  { status: "Новый", count: 245, percentage: 100 },
  { status: "В обработке", count: 198, percentage: 81 },
  { status: "Доставка", count: 156, percentage: 64 },
  { status: "Закрыто", count: 142, percentage: 58 },
];

export function AnalyticsPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-light tracking-tight text-neutral-900">Аналитика</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Май 2026</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Экспорт</span>
          </button>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
        <h3 className="text-lg font-medium text-neutral-900 mb-6">Выручка по месяцам</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip />
            <Bar dataKey="revenue" fill="#171717" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category & Conversion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Category Distribution */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-lg font-medium text-neutral-900 mb-6">Распределение по категориям</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-lg font-medium text-neutral-900 mb-6">Воронка конверсии</h3>
          <div className="space-y-4">
            {conversionData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-900">{item.status}</span>
                  <span className="text-sm text-neutral-600">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neutral-900 transition-all"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <div className="p-6 border-b border-neutral-200">
          <h3 className="text-lg font-medium text-neutral-900">Сводка по месяцам</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-neutral-900">Месяц</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-neutral-900">Выручка</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-neutral-900">Заказы</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-neutral-900">Клиенты</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-neutral-900">Средний чек</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.filter((d) => d.revenue > 0).map((data, index) => (
                <tr key={index} className="border-b border-neutral-100 last:border-0">
                  <td className="px-6 py-4 text-sm text-neutral-900 font-medium">{data.month}</td>
                  <td className="px-6 py-4 text-sm text-neutral-900 text-right">
                    {data.revenue.toLocaleString()} сом
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600 text-right">{data.orders}</td>
                  <td className="px-6 py-4 text-sm text-neutral-600 text-right">{data.customers}</td>
                  <td className="px-6 py-4 text-sm text-neutral-900 text-right">
                    {Math.round(data.revenue / data.orders).toLocaleString()} сом
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
