export default function AuthButtons({ type = "submit", children, className }) {
  return (
    <button
      type={type}
      className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}
