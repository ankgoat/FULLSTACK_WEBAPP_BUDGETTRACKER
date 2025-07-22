import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { undoTransaction } from '../api/transactionAPI';
import { RotateCcw, AlertTriangle, CheckCircle } from 'lucide-react';

const UndoTransaction = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUndo = async () => {
    setLoading(true);
    setError(null);

    try {
      await undoTransaction();
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError('Failed to undo transaction. There may be no transactions to undo.');
      console.error('Undo transaction error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Undo Transaction</h1>
        <p className="text-gray-600">Remove the most recent transaction</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        {!success ? (
          <>
            <div className="text-center mb-6">
              <div className="bg-yellow-100 rounded-full p-4 inline-block mb-4">
                <AlertTriangle className="h-12 w-12 text-yellow-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Are you sure?
              </h2>
              <p className="text-gray-600 mb-4">
                This action will permanently remove your most recent transaction from the system.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-left">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800 mb-1">Important Notes:</p>
                    <ul className="text-yellow-700 space-y-1">
                      <li>• This action cannot be reversed</li>
                      <li>• Only the most recent transaction will be removed</li>
                      <li>• Your account balance will be updated accordingly</li>
                      <li>• If no transactions exist, nothing will happen</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="text-red-800 text-sm">{error}</span>
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                onClick={handleUndo}
                disabled={loading}
                className="flex-1 bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <RotateCcw className="h-5 w-5" />
                    <span>Yes, Undo Transaction</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => navigate('/')}
                disabled={loading}
                className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-4 inline-block mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Transaction Undone Successfully!
            </h2>
            <p className="text-gray-600 mb-4">
              Your most recent transaction has been removed from the system.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <p className="text-sm text-green-800">
                You will be redirected to the dashboard in a moment...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          How Undo Works
        </h3>
        <div className="text-sm text-blue-800 space-y-2">
          <p>• The system maintains a stack of transactions (LIFO - Last In, First Out)</p>
          <p>• When you undo, the most recent transaction is removed</p>
          <p>• Your balance and category totals are automatically updated</p>
          <p>• You can only undo one transaction at a time</p>
        </div>
      </div>
    </div>
  );
};

export default UndoTransaction;