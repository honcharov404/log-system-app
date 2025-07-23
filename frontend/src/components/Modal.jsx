const Modal = ({ message, onConfirm, onCancel }) => (
  <div
    role="dialog"
    aria-modal="true"
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
      <p className="mb-4">{message}</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
        >Cancel</button>
        <button
          onClick={onConfirm}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
        >Delete</button>
      </div>
    </div>
  </div>
);

export default Modal;
