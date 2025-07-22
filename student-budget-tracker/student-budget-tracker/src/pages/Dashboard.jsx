import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSummary, getTransactions } from '../api/transactionAPI';
import { getCategorySummary } from '../api/summaryAPI';
import TransactionCard from '../components/TransactionCard';
import ExpenseChart from '../components/ExpenseChart';
import { formatCurrency } from '../utils/formatCurrency';
import { Wallet, TrendingUp, TrendingDown, Plus, Eye } from 'lucide-react';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [summaryData, transactionsData, categoriesData] = await Promise.all([
          getSummary(),
          getTransactions(),
          getCategorySummary()
        ]);
        
        setSummary(summaryData);
        setRecentTransactions(transactionsData.slice(-5).reverse());
        setCategories(categoriesData);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  const balance = summary ? summary.totalIncome - summary.totalExpenses : 0;
  const balanceColor = balance >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your budget tracker</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Income</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(summary?.totalIncome || 0)}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(summary?.totalExpenses || 0)}
              </p>
            </div>
            <TrendingDown className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Balance</p>
              <p className={`text-2xl font-bold ${balanceColor}`}>
                {formatCurrency(balance)}
              </p>
            </div>
            <Wallet className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Recent Transactions and Expense Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
            <Link
              to="/history"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
            >
              <Eye className="h-4 w-4" />
              <span>View All</span>
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <TransactionCard key={index} transaction={transaction} />
            ))}
            
            {recentTransactions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Wallet className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No recent transactions</p>
                <Link
                  to="/add"
                  className="mt-2 inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                >
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

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/add"
            className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Plus className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-blue-900">Add Transaction</span>
          </Link>
          
          <Link
            to="/expected"
            className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-green-900">Expected Expenses</span>
          </Link>
          
          <Link
            to="/categories"
            className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <TrendingDown className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-purple-900">Categories</span>
          </Link>
          
          <Link
            to="/undo"
            className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Wallet className="h-8 w-8 text-red-600 mb-2" />
            <span className="text-sm font-medium text-red-900">Undo Last</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;