import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, Plus, Calendar, Clock, BarChart3, History, RotateCcw } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: Wallet },
    { path: '/add', label: 'Add', icon: Plus },
    { path: '/expected', label: 'Expected', icon: Calendar },
    { path: '/upcoming', label: 'Upcoming', icon: Clock },
    { path: '/categories', label: 'Categories', icon: BarChart3 },
    { path: '/history', label: 'History', icon: History },
    { path: '/undo', label: 'Undo', icon: RotateCcw },
  ];

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Wallet className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Budget Tracker</span>
          </Link>
          
          <nav className="hidden md:flex space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;