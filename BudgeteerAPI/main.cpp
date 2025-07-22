#include <crow.h>
#include "CORS.h"
#include "db/Database.h"
#include "db/TransactionRepo.h"
#include "db/ExpectedExpenseRepo.h"
#include "api/TransactionRoutes.h"
#include "api/ExpectedRoutes.h"

int main() {
    try {
        // Initialize database
        Database db;
        db.openConnection("budget.db");
        db.initializeTables();
        
        // Create repository instances
        TransactionRepo txnRepo{db.getConnection()};
        ExpectedExpenseRepo expRepo{db.getConnection()};
        
        // Create Crow app with CORS middleware
        crow::App<> app;
        
        // Register routes
        TransactionRoutes::registerRoutes(app, txnRepo);
        ExpectedRoutes::registerRoutes(app, expRepo);
        
        // Add a health check endpoint
        CROW_ROUTE(app, "/health")([](){
            return crow::response(200, "OK");
        });
        
        // Start server
        std::cout << "Starting Budget Tracker API on port 18080..." << std::endl;
        app.port(18080).multithreaded().run();
        
    } catch (const std::exception& e) {
        std::cerr << "Error starting server: " << e.what() << std::endl;
        return 1;
    }
    
    return 0;
}