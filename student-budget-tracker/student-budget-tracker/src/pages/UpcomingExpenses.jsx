import React, { useState, useEffect } from 'react';
import { getUpcomingExpenses } from '../api/expectedAPI';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate, getDaysUntilDue, isOverdue } from '../utils/dateUtils';
import { Calendar, Clock, AlertCircle, Tag } from 'lucide-react';

const UpcomingExpenses = () => {
  const [upcomingExpenses, setUpcomingExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcomingExpenses = async () => {
      try {
        setLoading(true);
        const data = await getUpcomingExpenses();
        // Sort by due date and take first 3
        const sortedExpenses = data
          .sort((a, b) => new Date(a.nextDueDate) - new Date(b.nextDueDate))
          .slice(0, 3);
        setUpcomingExpenses(sortedExpenses);
      } catch (err) {
        setError('Failed to load upcoming expenses');
        console.error('Upcoming expenses error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingExpenses();
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

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Expenses</h1>
        <p className="text-gray-600">Next 3 due expenses, sorted by date</p>
      </div>

      {upcomingExpenses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Clock className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Expenses</h3>
          <p className="text-gray-600">You don't have any scheduled expenses coming up.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {upcomingExpenses.map((expense, index) => {
            const daysUntilDue = getDaysUntilDue(expense.nextDueDate);
            const overdue = isOverdue(expense.nextDueDate);
            
            let statusColor = 'bg-green-100 text-green-800';
            let statusIcon = Clock;
            let statusText = `Due in ${daysUntilDue} days`;
            
            if (overdue) {
              statusColor = 'bg-red-100 text-red-800';
              statusIcon = AlertCircle;
              statusText = 'Overdue';
            } else if (daysUntilDue === 0) {
              statusColor = 'bg-yellow-100 text-yellow-800';
              statusIcon = AlertCircle;
              statusText = 'Due Today';
            } else if (daysUntilDue <= 3) {
              statusColor = 'bg-orange-100 text-orange-800';
              statusIcon = AlertCircle;
              statusText = `Due in ${daysUntilDue} days`;
            }

            const StatusIcon = statusIcon;
            
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{expense.name}</h3>
                      <p className="text-sm text-gray-600">#{index + 1} in queue</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-600 mb-1">
                      {formatCurrency(expense.amount)}
                    </div>
                    <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
                      <StatusIcon className="h-4 w-4" />
                      <span>{statusText}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Tag className="h-4 w-4" />
                    <span>Category: {expense.category}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {formatDate(expense.nextDueDate)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Repeats every {expense.recurrenceDays} days</span>
                  </div>
                </div>
                
                {overdue && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <span className="text-sm text-red-800 font-medium">
                        This expense is overdue. Consider processing it soon.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      
      {upcomingExpenses.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Quick Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {upcomingExpenses.length}
              </div>
              <div className="text-blue-800">Upcoming Expenses</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(upcomingExpenses.reduce((sum, expense) => sum + expense.amount, 0))}
              </div>
              <div className="text-blue-800">Total Amount Due</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {upcomingExpenses.filter(expense => getDaysUntilDue(expense.nextDueDate) <= 3).length}
              </div>
              <div className="text-blue-800">Due Within 3 Days</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingExpenses;