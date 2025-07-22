#pragma once
#include <vector>
#include <sqlite3.h>
#include "../models/Transaction.h"

using namespace std;

class TransactionRepo {
private:
    sqlite3* db; // Pointer to the SQLite database connection

public:
    // Constructor: takes an open database connection
    TransactionRepo(sqlite3* connection);

    // Create a new transaction, returns the new transaction's ID
    int createTransaction(const Transaction& transaction);

    // Retrieve a transaction by its ID
    Transaction getTransactionById(int id);

    // Retrieve all transactions as a vector
    vector<Transaction> getAllTransactions();

    // Update an existing transaction, returns true if successful
    bool updateTransaction(const Transaction& transaction);

    // Delete a transaction by ID, returns true if successful
    bool deleteTransaction(int id);
};
