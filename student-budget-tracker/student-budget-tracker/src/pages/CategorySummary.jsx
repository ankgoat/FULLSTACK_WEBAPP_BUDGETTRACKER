import React, { useState, useEffect } from 'react';
import { getCategorySummary } from '../api/summaryAPI';
import CategorySummaryTable from '../components/CategorySummaryTable';
import ExpenseChart from '../components/ExpenseChart';
import { formatCurrency } from '../utils/formatCurrency';
import { BarChart3, PieChart, TrendingDown } from 'lucide-react';

const CategorySummary = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('table');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategorySummary();
        // Sort categories by total amount (descending)
        const sortedCategories = data.sort((a, b) => b.total - a.total);
        setCategories(sortedCategories);
      } catch (err) {
        setError('Failed to load category summary');
        console.error('Category summary error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
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

  const totalExpenses = categories.reduce((sum, cat) => sum + cat.total, 0);
  const averageExpensePerCategory = categories.length > 0 ? totalExpenses / categories.length : 0;
  const topCategory = categories.length > 0 ? categories[0] : null;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Category Summary</h1>
        <p className="text-gray-600">Analyze your spending patterns by category</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(totalExpenses)}
              </p>
            </div>
            <TrendingDown className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-blue-600">
                {categories.length}
              </p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average per Category</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(averageExpensePerCategory)}
              </p>
            </div>
            <PieChart className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Top Category Highlight */}
      {topCategory && (
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6 border border-red-200">
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            Highest Spending Category
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-red-800">{topCategory.category}</p>
              <p className="text-sm text-red-600">
                {((topCategory.total / totalExpenses) * 100).toFixed(1)}% of total expenses
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-red-800">
                {formatCurrency(topCategory.total)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* View Mode Toggle */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Category Breakdown</h2>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Table View</span>
            </button>
            <button
              onClick={() => setViewMode('chart')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'chart'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <PieChart className="h-4 w-4" />
              <span>Chart View</span>
            </button>
          </div>
        </div>

        {viewMode === 'table' ? (
          <CategorySummaryTable categories={categories} />
        ) : (
          <div className="max-w-md mx-auto">
            <ExpenseChart categories={categories} />
          </div>
        )}
      </div>

      {/* Insights */}
      {categories.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Top 3 Categories</h4>
              <div className="space-y-2">
                {categories.slice(0, 3).map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium text-gray-900">
                      {index + 1}. {category.category}
                    </span>
                    <span className="text-sm text-red-600 font-medium">
                      {formatCurrency(category.total)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Category Distribution</h4>
              <div className="space-y-2">
                {categories.slice(0, 3).map((category, index) => {
                  const percentage = ((category.total / totalExpenses) * 100).toFixed(1);
                  return (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium text-gray-900">
                        {category.category}
                      </span>
                      <span className="text-sm text-blue-600 font-medium">
                        {percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySummary;