import { useState } from 'react';
import axios from 'axios';

const Quiz = ({ docId }) => {
  const [quiz, setQuiz] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateQuiz = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/documents/${docId}/quiz`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setQuiz(res.data.quiz);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate quiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 transition-all">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
          Practice Quiz
        </h3>
        <div className="flex items-center gap-2">
          {quiz && (
            <button 
              onClick={() => setQuiz('')} 
              className="px-4 py-2 rounded-md font-medium text-sm transition-colors border border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
            >
              Dismiss
            </button>
          )}
          <button 
            onClick={handleGenerateQuiz} 
            disabled={loading}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${loading ? 'bg-amber-300 cursor-wait text-white' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}
          >
            {loading ? 'Thinking...' : (quiz ? 'Regenerate' : 'Generate Quiz')}
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      {quiz ? (
        <div className="bg-white p-5 rounded border border-gray-100 shadow-inner mt-2">
          <pre className="font-sans text-sm text-gray-700 whitespace-pre-wrap">{quiz}</pre>
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic mt-2">Generate a quick practice quiz to test your understanding.</p>
      )}
    </div>
  );
};

export default Quiz;