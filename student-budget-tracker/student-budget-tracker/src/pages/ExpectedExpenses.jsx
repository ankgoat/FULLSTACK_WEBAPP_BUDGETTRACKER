import React, { useState, useEffect } from 'react';
import { addExpectedExpense, getUpcomingExpenses } from '../api/expectedAPI';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate, getDaysUntilDue, isOverdue } from '../utils/dateUtils';
import { Calendar, DollarSign, Tag, FileText, Clock, AlertCircle } from 'lucide-react';

const ExpectedExpenses = () => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    nextDueDate: '',
    recurrenceDays: ''
  });
  const [upcomingExpenses, setUpcomingExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const categories = ['Rent', 'Utilities', 'Insurance', 'Subscriptions', 'Loan Payment', 'Other'];

  useEffect(() => {
    fetchUpcomingExpenses();
  }, []);

  const fetchUpcomingExpenses = async () => {
    try {
      const data = await getUpcomingExpenses();
      setUpcomingExpenses(data);
    } catch (err) {
      console.error('Error fetching upcoming expenses:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const expenseData = {
        ...formData,
        amount: parseFloat(formData.amount),
        recurrenceDays: parseInt(formData.recurrenceDays)
      };

      await addExpectedExpense(expenseData);
      setSuccess(true);
      setFormData({
        name: '',
        amount: '',
        category: '',
        nextDueDate: '',
        recurrenceDays: ''
      });
      
      // Refresh upcoming expenses
      await fetchUpcomingExpenses();
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to add expected expense. Please try again.');
      console.error('Add expected expense error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Expected Expenses</h1>
        <p className="text-gray-600">Set up recurring bills and expenses</p>
      </div>

      {/* Add Expected Expense Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Expected Expense</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <p className="text-green-600 text-sm">Expected expense added successfully!</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="inline h-4 w-4 mr-1" />
                Expense Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Monthly Rent"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="inline h-4 w-4 mr-1" />
                Amount
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="inline h-4 w-4 mr-1" />
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Next Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Next Due Date
              </label>
              <input
                type="date"
                name="nextDueDate"
                value={formData.nextDueDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Recurrence Days */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline h-4 w-4 mr-1" />
                Recurrence (Days)
              </label>
              <input
                type="number"
                name="recurrenceDays"
                value={formData.recurrenceDays}
                onChange={handleChange}
                min="1"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 30 for monthly"
              />
              <p className="text-sm text-gray-500 mt-1">
                How many days between each occurrence? (30 = monthly, 7 = weekly)
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <Calendar className="h-5 w-5" />
                <span>Add Expected Expense</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Upcoming Expenses */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Expenses</h2>
        
        {upcomingExpenses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No upcoming expenses scheduled</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingExpenses.map((expense, index) => {
              const daysUntilDue = getDaysUntilDue(expense.nextDueDate);
              const overdue = isOverdue(expense.nextDueDate);
              
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{expense.name}</h3>
                    <span className="text-lg font-bold text-red-600">
                      {formatCurrency(expense.amount)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <span className="flex items-center space-x-1">
                      <Tag className="h-4 w-4" />
                      <span>{expense.category}</span>
                    </span>
                    
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(expense.nextDueDate)}</span>
                    </span>
                    
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Every {expense.recurrenceDays} days</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {overdue ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <AlertCircle className="h-3 w-3" />
                        <span>Overdue</span>
                      </span>
                    ) : daysUntilDue === 0 ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <AlertCircle className="h-3 w-3" />
                        <span>Due Today</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Clock className="h-3 w-3" />
                        <span>Due in {daysUntilDue} days</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpectedExpenses;