#include "TransactionRoutes.h"

void TransactionRoutes::registerRoutes(crow::App<>& app, TransactionRepo& repo) {
    // OPTIONS for CORS preflight - /transactions
    CROW_ROUTE(app, "/transactions").methods("OPTIONS"_method)(
        []() {
            crow::response res;
            res.add_header("Access-Control-Allow-Origin", "*");
            res.add_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            res.add_header("Access-Control-Allow-Headers", "*");
            res.code = 204;
            return res;
        }
    );

    // GET /transactions - Get all transactions
    CROW_ROUTE(app, "/transactions").methods("GET"_method)(
        [repo]() { 
            // TODO: Get transactions from repo
            // Example: auto transactions = repo.getAllTransactions();
            // return crow::json::wvalue(transactions);
            return crow::json::wvalue(); 
        }
    );

    // OPTIONS for CORS preflight - /add
    CROW_ROUTE(app, "/add").methods("OPTIONS"_method)(
        []() {
            crow::response res;
            res.add_header("Access-Control-Allow-Origin", "*");
            res.add_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            res.add_header("Access-Control-Allow-Headers", "*");
            res.code = 204;
            return res;
        }
    );

    // POST /add - Add new transaction
    CROW_ROUTE(app, "/add").methods("POST"_method)(
        [&repo](const crow::request& req) { 
            // TODO: Parse request body and add transaction
            // Example: auto data = crow::json::load(req.body);
            // repo.addTransaction(data);
            return crow::json::wvalue(); 
        }
    );

    // OPTIONS for CORS preflight - /summary
    CROW_ROUTE(app, "/summary").methods("OPTIONS"_method)(
        []() {
            crow::response res;
            res.add_header("Access-Control-Allow-Origin", "*");
            res.add_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            res.add_header("Access-Control-Allow-Headers", "*");
            res.code = 204;
            return res;
        }
    );

    // GET /summary - Get transaction summary
    CROW_ROUTE(app, "/summary").methods("GET"_method)(
        [&repo]() { 
            // TODO: Get summary from repo
            // Example: auto summary = repo.getSummary();
            // return crow::json::wvalue(summary);
            return crow::json::wvalue(); 
        }
    );

    // OPTIONS for CORS preflight - /undo
    CROW_ROUTE(app, "/undo").methods("OPTIONS"_method)(
        []() {
            crow::response res;
            res.add_header("Access-Control-Allow-Origin", "*");
            res.add_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            res.add_header("Access-Control-Allow-Headers", "*");
            res.code = 204;
            return res;
        }
    );

    // POST /undo - Undo last transaction
    CROW_ROUTE(app, "/undo").methods("POST"_method)(
        [&repo](const crow::request& req) { 
            // TODO: Undo transaction
            // Example: auto data = crow::json::load(req.body);
            // repo.undoTransaction(data);
            return crow::json::wvalue(); 
        }
    );
}