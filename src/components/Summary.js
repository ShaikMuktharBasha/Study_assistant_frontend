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
      const res = await axios.get(\/api/documents/\/summarize, {
        headers: { Authorization: \Bearer \\ }
      });
      setSummary(res.data.summary);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate summary');    
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-5 transition-all shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          Document Summary
        </h3>
        <div className="flex w-full sm:w-auto items-center gap-2">
          {summary && (
            <button
              onClick={() => setSummary('')}
              className="flex-1 sm:flex-none px-4 py-2 rounded-md font-medium text-sm transition-colors border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Clear
            </button>
          )}
          <button
            onClick={handleSummarize}
            disabled={loading}
            className={\lex-1 sm:flex-none px-4 py-2 rounded-md font-medium text-sm transition-colors \\}
          >
            {loading ? 'Generating...' : (summary ? 'Regenerate' : 'Generate Summary')}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm border border-red-100">{error}</div>
      )}

      {summary ? (
        <div className="bg-indigo-50/50 dark:bg-gray-900/50 p-4 sm:p-5 rounded-lg border border-indigo-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm leading-relaxed max-h-[60vh] sm:max-h-full overflow-y-auto shadow-inner whitespace-pre-wrap">
          {summary}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 mt-2">No summary generated yet.</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">Tap "Generate Summary" to extract the key points from this document.</p>
        </div>
      )}
    </div>
  );
};

export default Summary;
