import { useState } from 'react';
import axios from 'axios';

const Summary = ({ docId }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/documents/${docId}/summarize`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setSummary(res.data.summary);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 transition-all">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          Document Summary
        </h3>
        <div className="flex items-center gap-2">
          {summary && (
            <button 
              onClick={() => setSummary('')} 
              className="px-4 py-2 rounded-md font-medium text-sm transition-colors border border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
            >
              Dismiss
            </button>
          )}
          <button 
            onClick={handleSummarize} 
            disabled={loading}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${loading ? 'bg-emerald-300 cursor-wait text-white' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'}`}
          >
            {loading ? 'Generating...' : (summary ? 'Regenerate' : 'Generate Summary')}
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      
      {summary ? (
        <div className="prose prose-sm max-w-none text-gray-700 bg-white p-4 rounded border border-gray-100 shadow-inner mt-2">
          {summary.split('\n').map((paragraph, index) => (
            <p key={index} className={paragraph.trim() ? "mb-2" : "hidden"}>{paragraph}</p>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic mt-2">Click generate to let AI summarize this document.</p>
      )}
    </div>
  );
};

export default Summary;