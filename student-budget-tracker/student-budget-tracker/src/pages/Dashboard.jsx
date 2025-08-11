import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSummary } from '../api/summaryAPI';
import { getTransactions } from '../api/transactionAPI';
import TransactionCard from '../components/TransactionCard';
import ExpenseChart from '../components/ExpenseChart';
import { formatCurrency } from '../utils/formatCurrency';
import { Wallet, TrendingUp, TrendingDown, Plus, Eye } from 'lucide-react';

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [summaryData, transactionsData] = await Promise.all([
          getSummary(),
          getTransactions(),
        ]);
        
        setSummary(summaryData || {});
        
        // Better handling of transactionsData
        let transactionsList = [];
        
        if (Array.isArray(transactionsData)) {
          // If it's already an array
          transactionsList = transactionsData;
        } else if (transactionsData && Array.isArray(transactionsData.transactions)) {
          // If it's an object with a transactions property
          transactionsList = transactionsData.transactions;
        } else if (transactionsData && Array.isArray(transactionsData.data)) {
          // If it's an object with a data property
          transactionsList = transactionsData.data;
        } else {
          // If it's something else, log it to see what we're getting
          console.log('Unexpected transactionsData format:', transactionsData);
          transactionsList = [];
        }
        
        setRecentTransactions(transactionsList.slice(-5).reverse());
      } catch (err) {
        console.error('Dashboard error:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  // Support old/new shapes
  const totalIncome   = summary.totalIncome   ?? summary?.totals?.income   ?? 0;
  const totalExpenses = summary.totalExpenses ?? summary?.totals?.expenses ?? 0;
  const balance       = totalIncome - totalExpenses;
  const balanceColor  = balance >= 0 ? 'text-green-600' : 'text-red-600';
  const categories    = summary.byCategory ?? [];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your budget tracker</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Income</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
            </div>
            <TrendingDown className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Balance</p>
              <p className={`text-2xl font-bold ${balanceColor}`}>{formatCurrency(balance)}</p>
            </div>
            <Wallet className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Recent + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
            <Link to="/history" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>View All</span>
            </Link>
          </div>

          <div className="space-y-4">
            {recentTransactions.map((t, i) => (
              <TransactionCard key={i} transaction={t} />
            ))}

            {recentTransactions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Wallet className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No recent transactions</p>
                <Link to="/add" className="mt-2 inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                  <Plus className="h-4 w-4" />
                  <span>Add your first transaction</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div>
          <ExpenseChart categories={categories} />
        </div>
      </div>
    </div>
  );
}