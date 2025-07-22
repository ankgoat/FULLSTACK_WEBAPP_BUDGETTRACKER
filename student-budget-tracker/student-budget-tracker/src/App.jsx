import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import ExpectedExpenses from './pages/ExpectedExpenses';
import UpcomingExpenses from './pages/UpcomingExpenses';
import CategorySummary from './pages/CategorySummary';
import RecentHistory from './pages/RecentHistory';
import UndoTransaction from './pages/UndoTransaction';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddTransaction />} />
            <Route path="/expected" element={<ExpectedExpenses />} />
            <Route path="/upcoming" element={<UpcomingExpenses />} />
            <Route path="/categories" element={<CategorySummary />} />
            <Route path="/history" element={<RecentHistory />} />
            <Route path="/undo" element={<UndoTransaction />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;