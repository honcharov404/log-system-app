import axios from 'axios';
import { useEffect, useState } from 'react'
// components
import Toast from './components/Toast';
import LogRow from './components/LogRow';
import Spinner from './components/Spinner';

const LogsArray = [
  {
    id: 1,
    owner: 'Peter Parker',
    createdAt: '2023-11-02T12:00:00Z',
    updatedAt: '2023-11-02T12:30:00Z',
    text: 'Spiderman saves the day again!',
  },
  {
    id: 2,
    owner: 'Iron Man',
    createdAt: '2023-10-01T12:00:00Z',
    updatedAt: '2023-10-01T12:30:00Z',
    text: 'Iron Man flies high with new suit technology.',
  },
];

const App = () => {
  const [logs, setLogs] = useState(LogsArray);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const logsPerPage = 1;

  const currentLogs = logs?.length > 0 ? logs?.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage) : [];
  const totalPages = Math.ceil(logs.length / logsPerPage);

  const fetchLogs = async () => {
    setLoading(true);

    try {
      const res = await axios.get('/api/logs');

      setLogs(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setToast(error.message ? {message: error.message, type: 'error'} : { message: 'Error loading logs', type: 'error' });
    }
  };

  const handleSave = async (log) => {
    try {
      await axios.put(`/api/logs/${log.id}`, log);

      setToast({ message: 'Log updated', type: 'success' });
      fetchLogs();
    } catch {
      setToast({ message: 'Failed to update log', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/logs/${id}`);

      setToast({ message: 'Log deleted', type: 'success' });
      fetchLogs();
    } catch {
      setToast({ message: 'Failed to delete log', type: 'error' });
    }
  };

  useEffect(() => {
    // fetchLogs();
  }, []);

  return (
        <div className="p-4 max-w-5xl mx-auto min-h-screen">
          <h1 className="text-2xl font-bold mb-4 text-center">Logs List</h1>
          <button
          className="block mx-auto mb-4 bg-green-600 hover:bg-green-800 text-white px-2 py-1 rounded"
          // onClick={() => setShowModal(true)}
          >Add Log</button>
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
                                className={`px-3 py-1 rounded ${currentPage === num ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
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
          {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
  )
}

export default App
