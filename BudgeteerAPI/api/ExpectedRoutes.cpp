#include "ExpectedRoutes.h"

void ExpectedRoutes::registerRoutes(crow::App<>& app, ExpectedExpenseRepo& repo) {
    CROW_ROUTE(app, "/expected/add").methods("OPTIONS"_method)(
        []() {
            crow::response res;
            res.add_header("Access-Control-Allow-Origin", "*");
            res.add_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            res.add_header("Access-Control-Allow-Headers", "*");
            res.code = 204;
            return res;
        }
    );

    CROW_ROUTE(app, "/expected/add").methods("POST"_method)(
        [repo](const crow::request& req) { 
            return crow::json::wvalue(); 
        }
    );

    CROW_ROUTE(app, "/expected/upcoming").methods("OPTIONS"_method)(
        []() {
            crow::response res;
            res.add_header("Access-Control-Allow-Origin", "*");
            res.add_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            res.add_header("Access-Control-Allow-Headers", "*");
            res.code = 204;
            return res;
        }
    );

    CROW_ROUTE(app, "/expected/upcoming").methods("GET"_method)(
        [repo]() { 
            return crow::json::wvalue(); 
        }
    );

    CROW_ROUTE(app, "/expected/process").methods("OPTIONS"_method)(
        []() {
            crow::response res;
            res.add_header("Access-Control-Allow-Origin", "*");
            res.add_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            res.add_header("Access-Control-Allow-Headers", "*");
            res.code = 204;
            return res;
        }
    );

    CROW_ROUTE(app, "/expected/process").methods("POST"_method)(
        [repo](const crow::request& req) { 
            return crow::json::wvalue(); 
        }
    );
}