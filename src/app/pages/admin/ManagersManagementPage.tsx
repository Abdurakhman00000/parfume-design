import { useState } from "react";
import { Plus, Search, Edit2, Trash2, X, Mail, Phone } from "lucide-react";

// Mock data
const mockManagers = [
  { id: 1, name: "Айгуль Токтогулова", email: "aygul@aroma.kg", phone: "+996 555 111 222", orders: 156, active: true },
  { id: 2, name: "Бекжан Мамытов", email: "bekzhan@aroma.kg", phone: "+996 777 333 444", orders: 134, active: true },
  { id: 3, name: "Назира Асанова", email: "nazira@aroma.kg", phone: "+996 701 555 666", orders: 128, active: true },
];

export function ManagersManagementPage() {
  const [managers, setManagers] = useState(mockManagers);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingManager, setEditingManager] = useState<any>(null);

  const filteredManagers = managers.filter(
    (manager) =>
      manager.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manager.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (manager: any) => {
    setEditingManager(manager);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить этого менеджера?")) {
      setManagers(managers.filter((m) => m.id !== id));
    }
  };

  const handleAddNew = () => {
    setEditingManager(null);
    setModalOpen(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-light tracking-tight text-neutral-900">Управление менеджерами</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Добавить менеджера</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Поиск менеджеров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>
      </div>

      {/* Managers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredManagers.map((manager) => (
          <div key={manager.id} className="bg-white rounded-2xl border border-neutral-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
                <span className="text-lg font-medium text-neutral-900">
                  {manager.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(manager)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-neutral-600" />
                </button>
                <button
                  onClick={() => handleDelete(manager.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-medium text-neutral-900 mb-4">{manager.name}</h3>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Mail className="w-4 h-4" />
                <span>{manager.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Phone className="w-4 h-4" />
                <span>{manager.phone}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Обработано заказов</span>
                <span className="text-lg font-medium text-neutral-900">{manager.orders}</span>
              </div>
            </div>

            <div className="mt-3">
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                  manager.active
                    ? "bg-green-100 text-green-700"
                    : "bg-neutral-100 text-neutral-600"
                }`}
              >
                {manager.active ? "Активен" : "Неактивен"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Manager Modal */}
      {modalOpen && (
        <ManagerModal
          manager={editingManager}
          onClose={() => setModalOpen(false)}
          onSave={(manager) => {
            if (editingManager) {
              setManagers(managers.map((m) => (m.id === manager.id ? manager : m)));
            } else {
              setManagers([...managers, { ...manager, id: Date.now(), orders: 0 }]);
            }
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

function ManagerModal({ manager, onClose, onSave }: any) {
  const [formData, setFormData] = useState(
    manager || {
      name: "",
      email: "",
      phone: "",
      active: true,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl max-w-md w-full">
        {/* Header */}
        <div className="border-b border-neutral-200 p-6 flex items-center justify-between">
          <h2 className="text-xl font-medium text-neutral-900">
            {manager ? "Редактировать менеджера" : "Добавить менеджера"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">Имя Фамилия</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">Телефон</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">Статус</label>
            <select
              value={formData.active ? "active" : "inactive"}
              onChange={(e) => setFormData({ ...formData, active: e.target.value === "active" })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
            >
              <option value="active">Активен</option>
              <option value="inactive">Неактивен</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
