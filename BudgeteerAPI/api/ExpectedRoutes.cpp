#include "ExpectedRoutes.hpp"
#include "../include/JsonResponse.hpp"
#include <nlohmann/json.hpp>

// If you have repos, keep these includes (adjust paths if needed)
// #include "../db/ExpectedExpenseRepo.h"

using json = nlohmann::json;

crow::response ExpectedRoutes::addExpectedExpense(const crow::request& req) {
    try {
        json body = json::parse(req.body);
        // TODO: validate & persist
        // ExpectedExpenseRepo::addExpectedExpense(body["name"].get<std::string>(), body["amount"].get<double>());
        return json_ok(json{{"status","expected_added"}}, 201);
    } catch (...) {
        return json_ok(json{{"error","Invalid JSON"}}, 400);
    }
}

crow::response ExpectedRoutes::getUpcomingExpectedExpenses(const crow::request& /*req*/) {
    // TODO: fetch real data
    json upcoming = json::array({
        {{"name","Rent"},{"amount",1200}},
        {{"name","Internet"},{"amount",60}}
    });
    return json_ok(json{{"upcoming", upcoming}});
}

crow::response ExpectedRoutes::processExpectedExpenses(const crow::request& /*req*/) {
    // TODO: apply processing
    // ExpectedExpenseRepo::processExpenses();
    return json_ok(json{{"status","processed"}});
}
