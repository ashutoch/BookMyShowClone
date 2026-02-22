import { Link, useNavigate } from 'react-router';
import { Search, Menu, X, Ticket, LogOut, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function Header() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const menuDropdownRef = useRef<HTMLDivElement>(null);

  const refreshAuthState = () => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const name = localStorage.getItem('userName') || '';
    setIsLoggedIn(loggedIn);
    setUserName(name);
  };

  useEffect(() => {
    refreshAuthState();
    // Re-check on tab focus (catches post-login redirect back to page)
    window.addEventListener('focus', refreshAuthState);
    window.addEventListener('storage', refreshAuthState);
    return () => {
      window.removeEventListener('focus', refreshAuthState);
      window.removeEventListener('storage', refreshAuthState);
    };
  }, []);

  // Also re-check on every navigation by polling (handles same-tab redirects)
  useEffect(() => {
    const interval = setInterval(refreshAuthState, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuDropdownRef.current && !menuDropdownRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUserName('');
    setShowMenu(false);
    navigate('/');
  };

  const handleMenuToggle = () => {
    refreshAuthState();
    setShowMenu(prev => !prev);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="text-rose-600 font-extrabold text-2xl tracking-tight">
              Movies<span className="text-gray-800">Verse</span>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for Movies, Events, Plays, Sports and Activities"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </form>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Username pill or Sign In button */}
            {isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-700 rounded-full font-semibold text-sm border border-rose-100">
                <User size={16} />
                <span>{userName}</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  localStorage.setItem('redirectAfterLogin', window.location.pathname);
                  navigate('/signin');
                }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition font-medium text-sm"
              >
                Sign In
              </button>
            )}

            {/* Hamburger Menu */}
            <div className="relative" ref={menuDropdownRef}>
              <button
                onClick={handleMenuToggle}
                className="p-2 hover:bg-gray-100 rounded-md transition"
              >
                {showMenu ? <X size={24} /> : <Menu size={24} />}
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-3 bg-rose-50 border-b border-rose-100">
                        <p className="text-xs text-rose-400 font-medium uppercase tracking-wide mb-0.5">Signed in as</p>
                        <p className="font-bold text-rose-700 text-lg">{userName}</p>
                      </div>
                      <Link
                        to="/my-bookings"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                        onClick={() => setShowMenu(false)}
                      >
                        <Ticket size={20} className="text-rose-600" />
                        <span className="text-gray-700 font-medium">My Bookings</span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-left border-t border-gray-100"
                      >
                        <LogOut size={20} className="text-red-500" />
                        <span className="text-gray-700 font-medium">Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <div className="px-4 py-4">
                      <p className="text-sm text-gray-500 mb-3">Sign in to book tickets and manage your bookings</p>
                      <button
                        onClick={() => {
                          localStorage.setItem('redirectAfterLogin', window.location.pathname);
                          navigate('/signin');
                          setShowMenu(false);
                        }}
                        className="w-full py-2.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition font-semibold text-sm mb-2"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => {
                          localStorage.setItem('redirectAfterLogin', window.location.pathname);
                          navigate('/signin?mode=signup');
                          setShowMenu(false);
                        }}
                        className="w-full py-2.5 border-2 border-rose-600 text-rose-600 rounded-lg hover:bg-rose-50 transition font-semibold text-sm"
                      >
                        Create Account
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex gap-6 mt-3 overflow-x-auto">
          {['Movies', 'Events', 'Plays', 'Sports', 'Activities'].map(item => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-gray-700 hover:text-rose-600 transition whitespace-nowrap font-medium text-sm pb-1 border-b-2 border-transparent hover:border-rose-600"
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for Movies, Events, Plays, Sports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </form>
      </div>
    </header>
  );
}