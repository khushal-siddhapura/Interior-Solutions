export default function Button({ children, onClick, variant = "primary" }) {
  const base =
    "inline-block px-6 py-3 rounded-xl tracking-wide font-semibold transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 hover:shadow-lg transform hover:-translate-y-0.5",
    secondary:
      "cursor-pointer bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400 hover:shadow-md transform hover:-translate-y-0.5",
    gradientGreen: `
  cursor-pointer bg-gradient-to-r from-emerald-100 to-neutral-300
  transition duration-300 ease-in-out
  hover:from-emerald-200 hover:to-slate-300
  hover:shadow-md transform hover:-translate-y-0.5
  text-gray-800 py-2 px-4 rounded
`,
    ViewProduct: `cursor-pointer bg-gradient-to-r from-neutral-300 to-slate-200
  transition duration-200 ease-in-out
  hover:from-neutral-400 hover:to-slate-300
  hover:shadow-md transform hover:-translate-y-0.5
  text-gray-800 py-2 px-4 rounded`,
    ContactBtn: `
  cursor-pointer bg-gradient-to-r from-emerald-100 to-teal-200
  transition duration-300 ease-in-out
  hover:from-emerald-200 hover:to-teal-200
  hover:shadow-md transform hover:-translate-y-0.5
  text-gray-800 py-2 px-4 rounded
`,
  };
  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}
