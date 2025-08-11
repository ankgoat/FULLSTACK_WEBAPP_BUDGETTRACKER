#pragma once
#include <crow.h>

class ExpectedRoutes {
public:
    static crow::response addExpectedExpense(const crow::request& req);
    static crow::response getUpcomingExpectedExpenses(const crow::request& req);
    static crow::response processExpectedExpenses(const crow::request& req);
};
