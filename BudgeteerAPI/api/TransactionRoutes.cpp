#include "TransactionRoutes.hpp"
#include "../include/JsonResponse.hpp"
#include <nlohmann/json.hpp>

// If you have repos, keep these includes (adjust paths if needed)
// #include "../db/TransactionRepo.h"

using json = nlohmann::json;

crow::response TransactionRoutes::addTransaction(const crow::request& req) {
    try {
        json body = json::parse(req.body);
        // TODO: validate & persist
        // TransactionRepo::add(body["description"].get<std::string>(), body["amount"].get<double>());
        return json_ok(json{{"status","added"}}, 201);
    } catch (...) {
        return json_ok(json{{"error","Invalid JSON"}}, 400);
    }
}

crow::response TransactionRoutes::getTransactions(const crow::request& /*req*/) {
    // TODO: fetch from DB
    json txns = json::array({
        {{"description","Groceries"},{"amount",-50}},
        {{"description","Salary"},{"amount",2000}}
    });
    return json_ok(json{{"transactions", txns}});
}

crow::response TransactionRoutes::undoTransaction(const crow::request& /*req*/) {
    // TODO: undo last transaction
    // TransactionRepo::undoLast();
    return json_ok(json{{"status","undone"}});
}
