import axios from 'axios';
import { useEffect, useState } from 'react'
// components
import Modal from './components/Modal';
import Toast from './components/Toast';
import LogRow from './components/LogRow';
import Spinner from './components/Spinner';

const App = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [logs, setLogs] = useState([]);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLog, setNewLog] = useState({
    text: '',
    owner: '',
  });

  const logsPerPage = 10;

  const currentLogs = logs?.length > 0 ? logs?.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage) : [];
  const totalPages = Math.ceil(logs.length / logsPerPage);

  const fetchLogs = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${BASE_URL}/api/logs`);

      setLogs(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setToast(error.message ? {message: error.message, type: 'error'} : { message: 'Error loading logs', type: 'error' });
    }
  };

  const handleAdd = async (log) => {
    setLoading(true);

    try {
      await axios.post(`${BASE_URL}/api/logs`, log);

      setToast({ message: 'Log added successfully', type: 'success' });
      setNewLog({ text: '', owner: '' });
      fetchLogs();
    } catch {
      setLoading(false);
      setToast({ message: 'Failed to add log', type: 'error' });
    }
  };

  const handleSave = async (log) => {
    setLoading(true);

    try {
      await axios.put(`${BASE_URL}/api/logs/${log.id}`, log);

      setToast({ message: 'Log updated', type: 'success' });
      fetchLogs();
    } catch {
      setLoading(false);
      setToast({ message: 'Failed to update log', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);

    try {
      await axios.delete(`${BASE_URL}/api/logs/${id}`);

      setToast({ message: 'Log deleted', type: 'success' });
      fetchLogs();
    } catch {
      setLoading(false);
      setToast({ message: 'Failed to delete log', type: 'error' });
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
        <div className="p-4 max-w-5xl mx-auto min-h-screen">
          <h1 className="text-2xl font-bold mb-4 text-center">Logs List</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="block mx-auto mb-4 bg-green-600 hover:bg-green-800 text-white px-2 py-1 rounded cursor-pointer"
          >
            Add Log
          </button>
          {
            loading
              ? <Spinner />
              : (
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr>
                        <th className="px-2 py-1">Owner</th>
                        <th className="px-2 py-1">Created At</th>
                        <th className="px-2 py-1">Updated At</th>
                        <th className="px-2 py-1">Log Text</th>
                        <th className="px-2 py-1">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        currentLogs?.map(log => (
                          <LogRow key={log.id} log={log} onSave={handleSave} onDelete={handleDelete} />
                        ))
                      }
                    </tbody>
                  </table>
                  {
                    totalPages > 1 && (
                        <div className="mt-2 flex justify-center gap-2">
                          {
                            Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                              <button
                                key={num}
                                onClick={() => setCurrentPage(num)}
                                className={`px-3 py-1 rounded cursor-pointer ${currentPage === num ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                              >
                                {num}
                              </button>
                            ))
                          }
                        </div>
                    )
                  }
                </div>
              )
          }
          {
            showAddModal && (
              <Modal
                btnName="Add"
                onCancel={() => setShowAddModal(false)}
                message="Are you sure you want to add this log?"
                onConfirm={() => {
                  handleAdd(newLog);
                  setShowAddModal(false);
                }}
              >
                <div className="mb-4">
                  <label className="block mb-2">Owner</label>
                  <input
                    type="text"
                    value={newLog.owner}
                    aria-label="New Log Owner"
                    className="w-full px-2 py-1 border rounded"
                    onChange={e => setNewLog({ ...newLog, owner: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Log Text</label>
                  <textarea
                    rows={3}
                    value={newLog.text}
                    aria-label="New Log Text"
                    className="w-full px-2 py-1 border rounded"
                    onChange={e => setNewLog({ ...newLog, text: e.target.value })}
                  />
                </div>
              </Modal>
            )
          }
          {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
  )
}

export default App
