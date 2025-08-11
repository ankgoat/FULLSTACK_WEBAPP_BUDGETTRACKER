#pragma once
#include "models/ExpectedExpense.h"
#include <vector>
#include <sqlite3.h>
using namespace std;

class ExpectedExpenseRepo {
    sqlite3* db;
public:
    ExpectedExpenseRepo(sqlite3* db) : db(db) {}
    bool createExpectedExpense(const ExpectedExpense& exp);
    vector<ExpectedExpense> getUpcomingExpectedExpenses();
    bool processNextExpectedExpense();
};
