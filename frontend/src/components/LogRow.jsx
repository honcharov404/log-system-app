import { useState } from "react";
// components
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
          aria-label="Edit Owner"
          className="w-full px-1 py-0.5 border rounded"
          onChange={e => setEditing({ ...editing, owner: e.target.value })}
        />
      </td>
      <td className="px-2 py-1 text-sm">{new Date(log.createdAt).toLocaleString()}</td>
      <td className="px-2 py-1 text-sm">{new Date(log.updatedAt).toLocaleString()}</td>
      <td className="px-2 py-1">
        <textarea
          rows={2}
          value={editing.text}
          aria-label="Edit Log Text"
          className="w-full px-1 py-0.5 border rounded"
          onChange={e => setEditing({ ...editing, text: e.target.value })}
        />
      </td>
      <td className="px-2 py-1 text-center">
        <button
          onClick={() => onSave({ ...log, ...editing })}
          className="bg-blue-600 hover:bg-blue-800 text-white px-2 py-1 rounded cursor-pointer mr-1"
        >
          Save
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-600 hover:bg-red-800 text-white px-2 py-1 rounded cursor-pointer"
        >
          Delete
        </button>
        {
          showModal && (
            <Modal
              btnName="Delete"
              onCancel={() => setShowModal(false)}
              message="Are you sure you want to delete this log?"
              onConfirm={() => {
                onDelete(log.id);
                setShowModal(false);
              }}
            />
          )
        }
      </td>
    </tr>
  );
};

export default LogRow