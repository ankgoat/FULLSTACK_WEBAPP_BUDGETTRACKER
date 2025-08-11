#include "TransactionRepo.h"
using namespace std;

bool TransactionRepo::createTransaction(const Transaction& t) {
    // Implement SQLite insert logic here
    return true;
}

vector<Transaction> TransactionRepo::getAllTransactions() {
    vector<Transaction> txs;
    // Fetch all transactions from db
    return txs;
}

double TransactionRepo::calculateTotalIncome() {
    // Sum SQL query
    return 0.0;
}

double TransactionRepo::calculateTotalExpense() {
    // Sum SQL query
    return 0.0;
}

double TransactionRepo::calculateBalance() {
    return calculateTotalIncome() - calculateTotalExpense();
}

bool TransactionRepo::undoLastTransaction() {
    // Delete last transaction logic
    return true;
}
