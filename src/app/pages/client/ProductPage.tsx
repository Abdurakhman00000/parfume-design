import { useParams, Link } from "react-router";
import { useState } from "react";
import { Star, ArrowLeft, ChevronRight, X } from "lucide-react";

// Mock data
const product = {
  id: 1,
  name: "Chanel No. 5",
  brand: "Chanel",
  category: "Женские",
  price: 12500,
  rating: 4.9,
  reviews: 234,
  description: "Легендарный аромат Chanel No. 5 — символ элегантности и женственности. Созданный в 1921 году, он остается одним из самых узнаваемых парфюмов в мире.",
  notes: {
    top: ["Альдегиды", "Нероли", "Лимон"],
    heart: ["Жасмин", "Роза", "Ландыш"],
    base: ["Ваниль", "Сандал", "Ветивер"]
  },
  volume: "100 мл",
  inStock: true,
  images: [
    "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format",
    "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&auto=format",
  ]
};

export function ProductPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [orderFormOpen, setOrderFormOpen] = useState(false);

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <Link to="/" className="hover:text-neutral-900">Главная</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/catalog" className="hover:text-neutral-900">Каталог</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-neutral-900">{product.name}</span>
        </div>
      </div>

      {/* Product */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-neutral-100">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden ${
                    selectedImage === index ? "ring-2 ring-neutral-900" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-sm text-neutral-500 uppercase tracking-wide mb-2">{product.brand}</p>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-neutral-900 text-neutral-900" />
                <span className="text-lg font-medium text-neutral-900">{product.rating}</span>
              </div>
              <span className="text-sm text-neutral-600">{product.reviews} отзывов</span>
            </div>

            {/* Price */}
            <div className="mb-8">
              <p className="text-3xl font-light text-neutral-900">{product.price.toLocaleString()} сом</p>
              <p className="text-sm text-neutral-600 mt-1">Объём: {product.volume}</p>
            </div>

            {/* Buy Button */}
            <button
              onClick={() => setOrderFormOpen(true)}
              className="w-full py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors mb-6"
            >
              Купить
            </button>

            {/* Stock Status */}
            {product.inStock ? (
              <p className="text-sm text-green-600 mb-8">✓ В наличии</p>
            ) : (
              <p className="text-sm text-red-600 mb-8">Нет в наличии</p>
            )}

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Описание</h3>
              <p className="text-neutral-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Notes */}
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-4">Ноты аромата</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-neutral-700 mb-2">Верхние ноты</p>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.top.map((note) => (
                      <span key={note} className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700 mb-2">Ноты сердца</p>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.heart.map((note) => (
                      <span key={note} className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700 mb-2">Базовые ноты</p>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.base.map((note) => (
                      <span key={note} className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Form Modal */}
      {orderFormOpen && (
        <OrderFormModal
          product={product}
          onClose={() => setOrderFormOpen(false)}
        />
      )}
    </div>
  );
}

function OrderFormModal({ product, onClose }: { product: any; onClose: () => void }) {
  const [step, setStep] = useState<"form" | "payment" | "success">("form");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentComplete = () => {
    setStep("success");
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-200 p-6 flex items-center justify-between">
          <h2 className="text-xl font-medium text-neutral-900">
            {step === "form" && "Оформление заказа"}
            {step === "payment" && "Оплата"}
            {step === "success" && "Заказ оформлен"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === "form" && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Info */}
              <div className="flex gap-4 p-4 bg-neutral-50 rounded-xl">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <p className="text-sm text-neutral-500">{product.brand}</p>
                  <p className="font-medium text-neutral-900">{product.name}</p>
                  <p className="text-lg font-light text-neutral-900 mt-1">
                    {product.price.toLocaleString()} сом
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">
                  Имя Фамилия
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  placeholder="Иван Иванов"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">
                  Номер телефона
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  placeholder="+996 XXX XXX XXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">
                  Адрес доставки
                </label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  placeholder="Город, улица, дом, квартира"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors"
              >
                Перейти к оплате
              </button>
            </form>
          )}

          {step === "payment" && (
            <div className="space-y-6 text-center">
              <div className="w-64 h-64 mx-auto bg-neutral-100 rounded-2xl flex items-center justify-center">
                <p className="text-neutral-500">QR-код Finik</p>
              </div>
              <div>
                <p className="text-neutral-900 font-medium mb-2">
                  Отсканируйте QR-код для оплаты
                </p>
                <p className="text-lg font-light text-neutral-900">
                  {product.price.toLocaleString()} сом
                </p>
              </div>
              <button
                onClick={handlePaymentComplete}
                className="w-full py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors"
              >
                Я оплатил
              </button>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-medium text-neutral-900 mb-2">
                Спасибо за заказ!
              </h3>
              <p className="text-neutral-600">
                Менеджер свяжется с вами в ближайшее время
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
