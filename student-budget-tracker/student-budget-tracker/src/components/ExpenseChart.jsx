import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import { PieChart } from 'lucide-react';

const ExpenseChart = ({ categories }) => {
  const totalExpenses = categories.reduce((sum, cat) => sum + cat.total, 0);
  
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 
    'bg-purple-500', 'bg-indigo-500', 'bg-pink-500', 'bg-gray-500'
  ];

  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <PieChart className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Expense Breakdown</h3>
        </div>
        <div className="text-center py-8 text-gray-500">
          <PieChart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No expense data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <PieChart className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Expense Breakdown</h3>
      </div>
      
      <div className="space-y-4">
        {categories.map((category, index) => {
          const percentage = totalExpenses > 0 ? (category.total / totalExpenses) * 100 : 0;
          const colorClass = colors[index % colors.length];
          
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${colorClass}`}></div>
                <span className="text-sm font-medium text-gray-900">{category.category}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {formatCurrency(category.total)}
                </div>
                <div className="text-xs text-gray-500">
                  {percentage.toFixed(1)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-900">Total Expenses</span>
          <span className="text-lg font-bold text-red-600">{formatCurrency(totalExpenses)}</span>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;