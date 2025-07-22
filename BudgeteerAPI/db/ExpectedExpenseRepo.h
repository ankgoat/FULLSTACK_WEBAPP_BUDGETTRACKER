#pragma once
#include <vector>
#include "../models/ExpectedExpense.h"
#include "Database.h"

using namespace std;

class ExpectedExpenseRepo {
public:
    // Constructor: takes an open SQLite DB connection
    ExpectedExpenseRepo(sqlite3* db);

    // Add a new expected expense
    void addExpectedExpense(const ExpectedExpense& expense);

    // Get all expected expenses
    vector<ExpectedExpense> getAllExpectedExpenses();

    // Get a specific expected expense by id
    ExpectedExpense getExpectedExpenseById(int id);

    // Update an existing expected expense
    void updateExpectedExpense(const ExpectedExpense& expense);

    // Delete an expected expense by id
    void deleteExpectedExpense(int id);

private:
    sqlite3* db; // SQLite connection pointer
};
