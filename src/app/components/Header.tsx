import { Link, useNavigate } from 'react-router';
import { Search, Menu, MapPin, ChevronDown, User, X, Ticket, LogOut } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cities } from '../data/moviesData';

export function Header() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('Bhubaneswar');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const menuDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check login status
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const name = localStorage.getItem('userName') || '';
    setIsLoggedIn(loggedIn);
    setUserName(name);

    // Load selected city
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
      setSelectedCity(savedCity);
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setShowCityDropdown(false);
      }
      if (menuDropdownRef.current && !menuDropdownRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setShowCityDropdown(false);
    localStorage.setItem('selectedCity', city);
  };

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

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-rose-600 font-bold text-2xl">
              book<span className="text-gray-800">my</span>show
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
          <div className="flex items-center gap-4">
            {/* City Selector */}
            <div className="relative" ref={cityDropdownRef}>
              <button
                onClick={() => setShowCityDropdown(!showCityDropdown)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md transition"
              >
                <MapPin size={18} className="text-rose-600" />
                <span className="hidden sm:inline">{selectedCity}</span>
                <ChevronDown size={16} />
              </button>
              {showCityDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sign In / Username */}
            {isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-700 rounded-md font-medium">
                <User size={18} />
                <span>{userName}</span>
              </div>
            ) : (
              <Link
                to="/signin"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition"
              >
                Sign in
              </Link>
            )}

            {/* Menu Icon */}
            <div className="relative" ref={menuDropdownRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-100 rounded-md transition"
              >
                {showMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              {/* Menu Dropdown */}
              {showMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                        <p className="text-sm text-gray-600">Signed in as</p>
                        <p className="font-semibold text-gray-800">{userName}</p>
                      </div>
                      <Link
                        to="/my-bookings"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                        onClick={() => setShowMenu(false)}
                      >
                        <Ticket size={20} className="text-rose-600" />
                        <span className="text-gray-700">My Bookings</span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-left border-t border-gray-200"
                      >
                        <LogOut size={20} className="text-red-600" />
                        <span className="text-gray-700">Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/signin"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                        onClick={() => setShowMenu(false)}
                      >
                        <User size={20} className="text-rose-600" />
                        <span className="text-gray-700">Sign In</span>
                      </Link>
                      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          Sign in to view your bookings and more
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex gap-6 mt-3 overflow-x-auto">
          <Link to="/movies" className="text-gray-700 hover:text-rose-600 transition whitespace-nowrap">
            Movies
          </Link>
          <Link to="/events" className="text-gray-700 hover:text-rose-600 transition whitespace-nowrap">
            Events
          </Link>
          <Link to="/plays" className="text-gray-700 hover:text-rose-600 transition whitespace-nowrap">
            Plays
          </Link>
          <Link to="/sports" className="text-gray-700 hover:text-rose-600 transition whitespace-nowrap">
            Sports
          </Link>
          <Link to="/activities" className="text-gray-700 hover:text-rose-600 transition whitespace-nowrap">
            Activities
          </Link>
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