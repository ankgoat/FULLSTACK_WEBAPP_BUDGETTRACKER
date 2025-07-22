import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDateTime } from '../utils/dateUtils';
import { TrendingUp, TrendingDown, Calendar, Tag } from 'lucide-react';

const TransactionCard = ({ transaction }) => {
  const isIncome = transaction.type === 'income';
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {isIncome ? (
            <TrendingUp className="h-5 w-5 text-green-500" />
          ) : (
            <TrendingDown className="h-5 w-5 text-red-500" />
          )}
          <span className={`text-lg font-semibold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
            {isIncome ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
          </span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          isIncome ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {transaction.type}
        </span>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Tag className="h-4 w-4" />
          <span>{transaction.category}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{formatDateTime(transaction.date)}</span>
        </div>
        
        {transaction.note && (
          <div className="mt-2 text-sm text-gray-700 bg-gray-50 p-2 rounded">
            {transaction.note}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionCard;