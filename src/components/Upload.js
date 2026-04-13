import { useState } from 'react';
import axios from 'axios';

const Upload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/documents/upload', formData, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setFile(null);
      if (document.getElementById('file-upload')) {
        document.getElementById('file-upload').value = '';
      }
      onUpload();
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3">
        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex justify-center items-center hover:border-indigo-500 transition-colors bg-gray-50">
          <input 
            type="file" 
            id="file-upload"
            onChange={(e) => setFile(e.target.files[0])} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            required 
            accept=".pdf,.txt,.md"
          />
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="mt-1 text-sm text-gray-600">
              {file ? <span className="font-medium text-indigo-600">{file.name}</span> : <span>Drag and drop or click to browse</span>}
            </p>
            <p className="text-xs text-gray-500 mt-1">PDF, TXT, MD up to 10MB</p>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button 
          type="submit" 
          disabled={!file || uploading}
          className={`w-full text-white p-3 rounded-lg font-medium transition-colors flex justify-center ${!file || uploading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
          {uploading ? (
            <span>Uploading...</span>
          ) : (
            <span>Upload Document</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default Upload;