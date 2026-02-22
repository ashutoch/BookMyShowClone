import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { User, Lock, Mail, Film } from 'lucide-react';

// Funny Hindi default usernames for when no username is provided
const FUNNY_NAMES = [
  'Chintamani123', 'Pappu_Bhai', 'Guddu_Rocks', 'Munna_Bhai',
  'Bhola_Shankar', 'Dabbu_Ji', 'Gappu_Seth', 'Tinku_Vijayvargiya',
  'Bablu_Express', 'Chintu_Lal', 'Jhingur_Das', 'Laddu_Prasad',
  'Fatafat_Singh', 'Ghaplu_Rao', 'Chakku_Pahalwan'
];

function getDefaultUsername(email: string): string {
  // Try to extract name from email (before @ and before any dots/numbers)
  const localPart = email.split('@')[0];
  const cleanName = localPart.replace(/[^a-zA-Z]/g, '');
  if (cleanName.length >= 3) {
    return cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase();
  }
  // Fallback: pick a random funny Hindi name
  return FUNNY_NAMES[Math.floor(Math.random() * FUNNY_NAMES.length)];
}

export default function SignIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get('mode') === 'signup');
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchParams.get('mode') === 'signup') setIsSignUp(true);
  }, [searchParams]);

  const redirect = localStorage.getItem('redirectAfterLogin') || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
      if (!formData.email || !formData.password) {
        setError('Please fill in email and password');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }

      // Use entered username, or generate one from email
      const finalUsername = formData.username.trim() || getDefaultUsername(formData.email);

      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', finalUsername);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.removeItem('redirectAfterLogin');
      // Dispatch storage event so Header updates immediately
      window.dispatchEvent(new Event('storage'));
      navigate(redirect);

    } else {
      if (!formData.email || !formData.password) {
        setError('Please enter your email and password');
        return;
      }
      const storedEmail = localStorage.getItem('userEmail');
      if (!storedEmail || storedEmail !== formData.email) {
        setError("We don't recognise this email — you may not have an account with us yet.");
        return;
      }
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.removeItem('redirectAfterLogin');
      window.dispatchEvent(new Event('storage'));
      navigate(redirect);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const switchToSignUp = () => { setIsSignUp(true); setError(''); setFormData({ email: '', password: '', username: '' }); };
  const switchToSignIn = () => { setIsSignUp(false); setError(''); setFormData({ email: '', password: '', username: '' }); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 mb-2">
            <Film size={28} className="text-rose-600" />
            <span className="text-rose-600 font-extrabold text-3xl tracking-tight">
              Movies<span className="text-gray-800">Verse</span>
            </span>
          </button>
          <p className="text-gray-500 text-sm">
            {isSignUp ? 'Create your account to start booking' : 'Welcome back! Sign in to continue'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="bg-gray-100 rounded-xl p-1 flex mb-6">
          <button
            onClick={switchToSignIn}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${
              !isSignUp ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={switchToSignUp}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${
              isSignUp ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            {isSignUp
              ? 'Username is optional — we\'ll pick a fun one if you skip it!'
              : 'Enter your credentials to access your bookings'}
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm flex items-center justify-between">
              <span>{error}</span>
              {(error.includes('don\'t recognise') || error.includes('not have an account')) && (
                <button onClick={switchToSignUp} className="ml-2 underline font-semibold whitespace-nowrap hover:text-red-800">
                  Sign up →
                </button>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Choose a username or leave blank"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={isSignUp ? 'At least 6 characters' : 'Enter your password'}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition shadow-md hover:shadow-lg mt-2"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-gray-500">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={isSignUp ? switchToSignIn : switchToSignUp}
              className="text-rose-600 hover:text-rose-700 font-semibold"
            >
              {isSignUp ? 'Sign In' : 'Sign Up for free'}
            </button>
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          By continuing, you agree to MoviesVerse's Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}