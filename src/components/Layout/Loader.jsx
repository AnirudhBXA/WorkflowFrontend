export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600" />
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
