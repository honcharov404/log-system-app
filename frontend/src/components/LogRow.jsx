import { useState } from "react";
import Modal from "./Modal";

const LogRow = ({ log, onSave, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState({ owner: log.owner, text: log.text });

  return (
    <tr>
      <td className="px-2 py-1">
        <input
          type="text"
          value={editing.owner}
          onChange={e => setEditing({ ...editing, owner: e.target.value })}
          className="w-full px-1 py-0.5 border rounded"
          aria-label="Edit Owner"
        />
      </td>
      <td className="px-2 py-1 text-sm">{new Date(log.createdAt).toLocaleString()}</td>
      <td className="px-2 py-1 text-sm">{new Date(log.updatedAt).toLocaleString()}</td>
      <td className="px-2 py-1">
        <textarea
          value={editing.text}
          onChange={e => setEditing({ ...editing, text: e.target.value })}
          className="w-full px-1 py-0.5 border rounded"
          rows={2}
          aria-label="Edit Log Text"
        />
      </td>
      <td className="px-2 py-1 text-center">
        <button
          className="bg-blue-600 hover:bg-blue-800 text-white px-2 py-1 rounded mr-1"
          onClick={() => onSave({ ...log, ...editing })}
        >Save</button>
        <button
          className="bg-red-600 hover:bg-red-800 text-white px-2 py-1 rounded"
          onClick={() => setShowModal(true)}
        >Delete</button>
        {showModal && (
          <Modal
            message="Are you sure you want to delete this log?"
            onConfirm={() => {
              onDelete(log.id);
              setShowModal(false);
            }}
            onCancel={() => setShowModal(false)}
          />
        )}
      </td>
    </tr>
  );
};

export default LogRow