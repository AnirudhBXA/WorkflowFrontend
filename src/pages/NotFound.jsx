import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-center px-6">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
