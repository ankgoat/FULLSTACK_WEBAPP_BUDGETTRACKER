#include <crow.h>
#include "api/TransactionRoutes.hpp"
#include "api/ExpectedRoutes.hpp"

int main() {
    crow::SimpleApp app;

    // ---- SUMMARY (accept any method so GET surely matches) ----
    CROW_ROUTE(app, "/summary")([](){
        crow::json::wvalue out;
        out["totals"]["income"]   = 0;
        out["totals"]["expenses"] = 0;
        out["totals"]["net"]      = 0;
        out["byCategory"]         = crow::json::wvalue::list{};
        out["count"]              = 0;
        out["recent"]             = crow::json::wvalue::list{};
        return crow::response(200, out);
    });

    // ==== Transaction Routes ====
    CROW_ROUTE(app, "/transactions").methods(crow::HTTPMethod::Get)
    ([](const crow::request& req) { return TransactionRoutes::getTransactions(req); });

    CROW_ROUTE(app, "/transactions/add").methods(crow::HTTPMethod::Post)
    ([](const crow::request& req) { return TransactionRoutes::addTransaction(req); });

    CROW_ROUTE(app, "/transactions/undo").methods(crow::HTTPMethod::Post)
    ([](const crow::request& req) { return TransactionRoutes::undoTransaction(req); });

    // ==== Expected Expense Routes ====
    CROW_ROUTE(app, "/expected/add").methods(crow::HTTPMethod::Post)
    ([](const crow::request& req) { return ExpectedRoutes::addExpectedExpense(req); });

    CROW_ROUTE(app, "/expected/upcoming").methods(crow::HTTPMethod::Get)
    ([](const crow::request& req) { return ExpectedRoutes::getUpcomingExpectedExpenses(req); });

    CROW_ROUTE(app, "/expected/process").methods(crow::HTTPMethod::Post)
    ([](const crow::request& req) { return ExpectedRoutes::processExpectedExpenses(req); });

    // Health check
    CROW_ROUTE(app, "/")([](){ return "Budgeteer API is running!"; });

    app.port(18080).multithreaded().run();
}
