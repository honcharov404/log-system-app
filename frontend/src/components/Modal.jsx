const Modal = ({ btnName, children, message, onConfirm, onCancel }) => (
  <div
    role="dialog"
    aria-modal="true"
    onClick={onCancel}
    className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50"
  >
    <div
      onClick={e => e.stopPropagation()}
      className="bg-white p-4 rounded shadow-lg max-w-sm w-full"
    >
      <p className="mb-4">{message}</p>
      {children}
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className={`text-white px-3 py-1 rounded ${btnName === "Delete" ? "bg-red-600 hover:bg-red-800" : "bg-green-600 hover:bg-green-800"}`}
        >
          {btnName}
        </button>
      </div>
    </div>
  </div>
);

export default Modal;
