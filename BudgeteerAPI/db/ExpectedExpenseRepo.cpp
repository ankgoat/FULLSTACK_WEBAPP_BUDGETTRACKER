#include "ExpectedExpenseRepo.h"

using namespace std;

// Constructor
ExpectedExpenseRepo::ExpectedExpenseRepo(sqlite3* db) : db(db) {}

// Add a new expected expense
void ExpectedExpenseRepo::addExpectedExpense(const ExpectedExpense& expense) {
    // TODO: Implement insert query using sqlite3
}

// Get all expected expenses
vector<ExpectedExpense> ExpectedExpenseRepo::getAllExpectedExpenses() {
    // TODO: Implement select * query using sqlite3
    return {};
}

// Get expected expense by ID
ExpectedExpense ExpectedExpenseRepo::getExpectedExpenseById(int id) {
    // TODO: Implement select by ID using sqlite3
    return ExpectedExpense();
}

// Update an expected expense
void ExpectedExpenseRepo::updateExpectedExpense(const ExpectedExpense& expense) {
    // TODO: Implement update query using sqlite3
}

// Delete an expected expense by ID
void ExpectedExpenseRepo::deleteExpectedExpense(int id) {
    // TODO: Implement delete query using sqlite3
}
