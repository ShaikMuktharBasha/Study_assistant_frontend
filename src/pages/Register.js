import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Zap, BookOpen, MessageSquare, Loader2 } from 'lucide-react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL || 'https://study-assistant-backend-seven.vercel.app'}/api/auth/register`, { username, email, password });
      window.location = '/login';
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-70px)] overflow-hidden bg-white dark:bg-[#0A0A0A] transition-colors duration-500 font-sans">

      {/* Left side - Product Features (Elegant Dark Vibe) */}
      <div className="hidden lg:flex w-1/2 relative bg-[#050511] overflow-hidden flex-col justify-between p-16">
        {/* Abstract Glowing Orbs */}
        <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[150px] transform -translate-x-1/3 -translate-y-1/4 animate-pulse duration-10000"></div>
        <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[150px] transform translate-x-1/3 translate-y-1/4"></div>
        
        {/* Subtle grid pattern opacity */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMC41IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-30 z-0"></div>

        <div className={`relative z-10 space-y-4 max-w-xl transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium backdrop-blur-md mb-4 shadow-xl">
            <Zap size={14} className="text-yellow-400 fill-current" /> Join the Revolution
          </div>
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight leading-tight">
            Start Learning <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">At Light Speed.</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed pt-2 font-medium">
            Create an account to unlock AI-powered summaries, instant quizzes, and intelligent document chatting.
          </p>
        </div>
        
        <div className={`relative z-10 space-y-6 pt-12 transition-all duration-1000 delay-300 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-start gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl hover:bg-white/[0.04] hover:scale-[1.02] transition-all cursor-default">
            <div className="p-3 bg-indigo-500/20 rounded-xl shadow-inner shadow-indigo-500/20 border border-indigo-400/20">
              <BookOpen size={24} className="text-indigo-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">Instant Summaries</h3>
              <p className="text-gray-400 text-sm mt-1 leading-relaxed">Distill hours of reading into highly precise, digestible key points in seconds.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl hover:bg-white/[0.04] hover:scale-[1.02] transition-all cursor-default">
            <div className="p-3 bg-purple-500/20 rounded-xl shadow-inner shadow-purple-500/20 border border-purple-400/20">
              <MessageSquare size={24} className="text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">Conversational Learning</h3>
              <p className="text-gray-400 text-sm mt-1 leading-relaxed">Ask questions directly to your documents. The AI cites precise sections as context.</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-gray-500 font-medium tracking-wide">
          © 2026 Study Assistant. Made with precision.
        </div>
      </div>

      {/* Right side - Register Form (Ultra sleek white/dark mode) */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 relative dark:bg-[#0A0A0A]">
        <div className={`w-full max-w-md transition-all duration-1000 delay-100 transform ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Create an account
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:underline transition-all">
                Sign in to workspace
              </Link>
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-[3.25rem] pr-4 py-4 bg-gray-50 dark:bg-[#111116] border border-gray-200 dark:border-gray-800 placeholder-gray-400 text-gray-900 dark:text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm font-medium"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-[3.25rem] pr-4 py-4 bg-gray-50 dark:bg-[#111116] border border-gray-200 dark:border-gray-800 placeholder-gray-400 text-gray-900 dark:text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm font-medium"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-[3.25rem] pr-4 py-4 bg-gray-50 dark:bg-[#111116] border border-gray-200 dark:border-gray-800 placeholder-gray-400 text-gray-900 dark:text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm font-medium"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-medium bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 p-4 rounded-xl animate-pulse">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {error}
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex items-center justify-center gap-2 py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 dark:focus:ring-offset-[#0A0A0A] shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Sign up
                    <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
