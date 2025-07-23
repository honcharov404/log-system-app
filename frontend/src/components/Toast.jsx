const Toast = ({ message, type, onClose }) => (
  <div
    role="alert"
    className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg text-white ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
  >
    {message}
    <button
      onClick={onClose}
      aria-label="Close Toast"
      className="ml-4 text-white font-bold cursor-pointer"
    >
      x
    </button>
  </div>
);

export default Toast;
