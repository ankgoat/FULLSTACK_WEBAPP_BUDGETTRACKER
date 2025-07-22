#ifndef TRANSACTION_ROUTES_H
#define TRANSACTION_ROUTES_H

#include <crow.h>
#include "db/TransactionRepo.h"

namespace TransactionRoutes {

void registerRoutes(crow::App<>& app, TransactionRepo& repo) {
    // Get all transactions
    CROW_ROUTE(app, "/transactions")([&repo]() {
        auto transactions = repo.getAllTransactions();
        crow::json::wvalue result;
        int idx = 0;
        for (const auto& txn : transactions) {
            result["transactions"][idx++] = txn.toJson();
        }
        return result;
    });

    // Add transaction
    CROW_ROUTE(app, "/add").methods("POST"_method)([&repo](const crow::request& req) {
        auto x = crow::json::load(req.body);
        if (!x) return crow::response(400, "Invalid JSON");
        Transaction txn = Transaction::fromJson(std::move(x));
        if (repo.createTransaction(txn)) {
            return crow::response(200, "Transaction added");
        }
        return crow::response(500, "Creation failed");
    });

    // Summary
    CROW_ROUTE(app, "/summary")([&repo]() {
        crow::json::wvalue summary;
        summary["totalIncome"] = repo.calculateTotalIncome();
        summary["totalExpense"] = repo.calculateTotalExpense();
        summary["balance"] = repo.calculateBalance();
        return summary;
    });

    // Undo last transaction
    CROW_ROUTE(app, "/undo").methods("POST"_method)([&repo]() {
        if (repo.undoLastTransaction()) {
            return crow::response(200, "Undo success");
        }
        return crow::response(404, "Nothing to undo");
    });
}

} // namespace TransactionRoutes

#endif // TRANSACTION_ROUTES_H
