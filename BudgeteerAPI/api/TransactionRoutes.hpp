#pragma once
#include <crow.h>

class TransactionRoutes {
public:
    static crow::response addTransaction(const crow::request& req);
    static crow::response getTransactions(const crow::request& req);
    static crow::response undoTransaction(const crow::request& req);
};
