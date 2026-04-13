import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ toggleTheme, theme }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-indigo-100 dark:border-indigo-900 shadow-sm dark:bg-gray-900/80">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-2 rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 tracking-tight">
            Study Assistant
          </span>
        </Link>
        <div className="space-x-2 sm:space-x-4 flex items-center">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-300 dark:hover:text-indigo-400 dark:hover:bg-gray-800 transition-colors"
            title="Toggle theme"
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            )}
          </button>
          {!token ? (
            <>
              <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800">Login</Link>
              <Link to="/register" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:opacity-90 transition-all transform hover:-translate-y-0.5">Register</Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {username && (
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 capitalize pr-2">
                  {username}
                </span>
              )}
              <button onClick={handleLogout} className="flex items-center gap-2 text-rose-500 hover:text-white hover:bg-rose-500 border border-rose-100 dark:border-rose-900/30 font-medium transition-all px-4 py-2 rounded-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;