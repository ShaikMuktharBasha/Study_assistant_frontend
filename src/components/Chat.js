import { useState } from 'react';
import axios from 'axios';

const Chat = ({ docId }) => {
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChat = async (e) => {
    e?.preventDefault();
    if (!question.trim()) return;

    const currentQuestion = question;
    setQuestion('');
    setLoading(true);
    setError('');

    // Optimistically add user message
    setHistory([...history, { type: 'user', text: currentQuestion }]);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/documents/${docId}/chat`, 
        { question: currentQuestion }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setHistory(prev => [...prev, { type: 'ai', text: res.data.answer }]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get answer');
      setHistory(prev => [...prev, { type: 'error', text: 'Error fetching response' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg flex flex-col h-[500px] transition-all overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
          Chat with Document
        </h3>
        {history.length > 0 && (
          <button 
            onClick={() => setHistory([])}
            className="text-xs font-semibold text-purple-600 hover:bg-purple-50 px-3 py-1.5 rounded-full transition-colors"
          >
            Clear Chat
          </button>
        )}
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gray-50/50">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gradient-to-tr from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
            </div>
            <p className="text-gray-500 font-medium">Ask any question about your document to begin.</p>
            <p className="text-xs text-gray-400 mt-2 max-w-sm">The AI has read the document and can answer questions naturally.</p>
          </div>
        ) : (
          history.map((msg, index) => (
            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} gap-3 animate-fade-in-up`}>
              {msg.type !== 'user' && (
                <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm self-end">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
              )}
              <div className={`max-w-[75%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                msg.type === 'user' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-sm shadow-md' 
                  : msg.type === 'error'
                  ? 'bg-rose-50 text-rose-700 rounded-bl-sm border border-rose-100'
                  : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm shadow-[0_2px_10px_rgb(0,0,0,0.03)]'
              }`}>
                {msg.text}
              </div>
              {msg.type === 'user' && (
                <div className="w-8 h-8 shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 self-end overflow-hidden">
                  <svg className="w-5 h-5 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>
              )}
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start gap-3">
             <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm self-end">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
             </div>
            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-sm shadow-[0_2px_10px_rgb(0,0,0,0.03)] flex items-center space-x-1.5 self-end">
              <div className="w-2.5 h-2.5 bg-indigo-300 rounded-full animate-bounce"></div>
              <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
              <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        {error && !history.length && <p className="text-red-500 text-xs mb-2">{error}</p>}
        <form onSubmit={handleChat} className="relative flex items-center">
          <input 
            type="text" 
            placeholder="Ask a question..." 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)} 
            disabled={loading}
            className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all disabled:bg-gray-100"
          />
          <button 
            type="submit" 
            disabled={loading || !question.trim()}
            className="absolute right-2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;