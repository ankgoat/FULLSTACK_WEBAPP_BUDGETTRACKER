#pragma once
#include "models/Transaction.h"
#include <vector>
#include <sqlite3.h>
using namespace std;

class TransactionRepo {
    sqlite3* db;
public:
    TransactionRepo(sqlite3* db) : db(db) {}
    bool createTransaction(const Transaction& t);
    vector<Transaction> getAllTransactions();
    double calculateTotalIncome();
    double calculateTotalExpense();
    double calculateBalance();
    bool undoLastTransaction();
};
