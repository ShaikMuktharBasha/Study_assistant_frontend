import { useState, useEffect } from 'react';
import axios from 'axios';
import Upload from '../components/Upload';
import Summary from '../components/Summary';
import Quiz from '../components/Quiz';
import Chat from '../components/Chat';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');

  useEffect(() => {
    const fetchDocuments = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get('http://localhost:5000/api/documents', { 
            headers: { Authorization: `Bearer ${token}` } 
          });
          setDocuments(res.data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchDocuments();
  }, []);

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 flex flex-col items-center relative overflow-hidden transition-colors duration-300">
      
      {/* Decorative background blobs */}
      <div className="absolute top-0 -left-64 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2 z-0 transition-colors duration-300"></div>
      <div className="absolute top-0 -right-64 w-96 h-96 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2 z-0 transition-colors duration-300"></div>

      <div className="container mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8 max-w-7xl relative z-10">
        
        {/* Sidebar */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          <div className={`glass p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border ${documents.length === 0 ? 'border-indigo-300 ring-2 ring-indigo-100 ring-offset-2' : 'border-white/50'} transition-all duration-300`}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Upload Knowledge</h2>
              </div>
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-sm">1</span>
            </div>
            <Upload onUpload={() => window.location.reload()} />
          </div>

          <div className={`glass p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border ${documents.length > 0 && !selectedDoc ? 'border-purple-300 ring-2 ring-purple-100 ring-offset-2' : 'border-white/50'} flex-1 flex flex-col transition-all duration-300`}>
              <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Your Study Files</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-700 py-1 px-3 rounded-full text-xs font-bold">{documents.length} files</span>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold shadow-sm">2</span>
              </div>
            </div>

            {documents.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-6 text-center">
                <div className="bg-gray-50 rounded-full p-4 mb-3 border border-gray-100">
                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
                <p className="text-sm font-medium text-gray-500">Your library is empty</p>
                <p className="text-xs text-gray-400 mt-1">Upload your first document above</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1 flex-1">
                {!selectedDoc && documents.length > 0 && (
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 mb-1 shadow-sm animate-pulse">
                    <p className="text-sm text-indigo-700 font-semibold flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
                      Please choose a file to continue to next steps
                    </p>
                  </div>
                )}
                {documents.map(doc => (
                  <div 
                    key={doc._id} 
                    className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${selectedDoc?._id === doc._id ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-300 shadow-sm' : 'bg-white/60 border-transparent hover:border-gray-200 hover:bg-white hover:shadow-sm'}`}
                    onClick={() => setSelectedDoc(doc)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 min-w-max p-2 rounded-lg ${selectedDoc?._id === doc._id ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors'}`}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path></svg>
                      </div>
                      <div className="overflow-hidden">
                        <div className={`font-semibold truncate ${selectedDoc?._id === doc._id ? 'text-indigo-900' : 'text-gray-700'}`} title={doc.filename}>{doc.filename}</div>
                        <div className={`text-xs mt-1 transition-opacity ${selectedDoc?._id === doc._id ? 'text-indigo-500 opacity-100' : 'text-gray-400 opacity-0 group-hover:opacity-100'}`}>Click to open workspace</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:w-2/3 flex flex-col gap-6 w-full">
          {selectedDoc ? (
            <div className="glass flex flex-col h-full rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 transition-all duration-500 overflow-hidden">
              {/* Header */}
              <div className="p-6 md:p-8 pb-0 bg-white/40">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-md text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">{selectedDoc.filename}</h2>
                    <p className="text-sm text-indigo-500 font-medium tracking-wide flex items-center gap-1 mt-1">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Ready for AI Analysis
                    </p>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 gap-6">
                  <button
                    onClick={() => setActiveTab('summary')}
                    className={`pb-4 px-2 text-sm font-bold transition-all duration-200 border-b-2 flex items-center gap-2 ${activeTab === 'summary' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-indigo-500'}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    Summary
                  </button>
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className={`pb-4 px-2 text-sm font-bold transition-all duration-200 border-b-2 flex items-center gap-2 ${activeTab === 'quiz' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-indigo-500'}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    Practice Quiz
                  </button>
                  <button
                    onClick={() => setActiveTab('chat')}
                    className={`pb-4 px-2 text-sm font-bold transition-all duration-200 border-b-2 flex items-center gap-2 ${activeTab === 'chat' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-indigo-500'}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                    Chat with AI
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6 md:p-8 flex-1 bg-white/20">
                <div className={activeTab === 'summary' ? 'block animate-fade-in-up' : 'hidden'}>
                  <Summary docId={selectedDoc._id} />
                </div>
                <div className={activeTab === 'quiz' ? 'block animate-fade-in-up' : 'hidden'}>
                  <Quiz docId={selectedDoc._id} />
                </div>
                <div className={`${activeTab === 'chat' ? 'block animate-fade-in-up' : 'hidden'} h-[500px]`}>
                  <div className="h-full border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                    <Chat docId={selectedDoc._id} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={`glass p-12 rounded-2xl shadow-sm border ${!selectedDoc && documents.length > 0 ? 'border-indigo-200 shadow-indigo-100 ring-2 ring-indigo-50 ring-offset-4' : 'border-white/50'} flex flex-col items-center justify-center h-full text-center min-h-[500px] transition-all duration-300 relative overflow-hidden`}>
              {/* Pulse animation ring if waiting for selection */}
              {!selectedDoc && documents.length > 0 && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse"></div>
              )}

              <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-500 rounded-full flex items-center justify-center mb-6 shadow-inner ring-8 ring-white animate-pulse relative z-10">
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-white">3</span>
                <svg className="w-10 h-10 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-800 mb-3 tracking-tight z-10">Ready for Next Steps</h3>
              <p className="text-gray-500 max-w-md mx-auto leading-relaxed text-base z-10">Please choose a document from the <strong>"Your Study Files"</strong> list on the left to continue. Once selected, you can interact with the AI assistant.</p>
              
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg mx-auto opacity-60 z-10">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <span className="text-xs font-semibold text-gray-500">Summarize</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <span className="text-xs font-semibold text-gray-500">Quiz</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500 mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                  </div>
                  <span className="text-xs font-semibold text-gray-500">Chat</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;