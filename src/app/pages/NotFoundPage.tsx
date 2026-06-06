import { Link } from "react-router";
import { Home } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-light text-neutral-200 mb-4">404</h1>
        <h2 className="text-2xl font-light text-neutral-900 mb-4">Страница не найдена</h2>
        <p className="text-neutral-600 mb-8">
          Извините, страница которую вы ищете не существует
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">На главную</span>
        </Link>
      </div>
    </div>
  );
}
