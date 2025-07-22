#include "TransactionRepo.h"
#include <iostream>

// Constructor: store the database connection pointer for later use
TransactionRepo::TransactionRepo(sqlite3* connection) : db(connection) {}

// Create a new transaction in the database
int TransactionRepo::createTransaction(const Transaction& transaction) {
    // SQL statement to insert a new transaction (uses placeholders for parameters)
    const char* sql = "INSERT INTO transactions (amount, category, date, description) VALUES (?, ?, ?, ?);";
    sqlite3_stmt* stmt = nullptr;

    // Prepare the SQL statement for execution
    if (sqlite3_prepare_v2(db, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        std::cerr << "Failed to prepare statement: " << sqlite3_errmsg(db) << std::endl;
        return -1; // Indicate failure
    }

    // Bind the transaction's data to the SQL statement parameters
    sqlite3_bind_double(stmt, 1, transaction.getAmount());
    sqlite3_bind_text(stmt, 2, transaction.getCategory().c_str(), -1, SQLITE_TRANSIENT);
    sqlite3_bind_text(stmt, 3, transaction.getDate().c_str(), -1, SQLITE_TRANSIENT);
    sqlite3_bind_text(stmt, 4, transaction.getDescription().c_str(), -1, SQLITE_TRANSIENT);

    // Execute the statement (actually inserts the data)
    if (sqlite3_step(stmt) != SQLITE_DONE) {
        std::cerr << "Failed to execute statement: " << sqlite3_errmsg(db) << std::endl;
        sqlite3_finalize(stmt);
        return -1; // Indicate failure
    }

    // Get the ID of the newly inserted transaction
    int newId = static_cast<int>(sqlite3_last_insert_rowid(db));

    // Clean up the prepared statement
    sqlite3_finalize(stmt);

    return newId; // Return the new transaction's ID
}

// Retrieve a transaction by its ID
Transaction TransactionRepo::getTransactionById(int id) {
    // SQL statement to select a transaction by ID
    const char* sql = "SELECT id, amount, category, date, description FROM transactions WHERE id = ?;";
    sqlite3_stmt* stmt = nullptr;

    // Prepare the SQL statement
    if (sqlite3_prepare_v2(db, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        std::cerr << "Failed to prepare statement: " << sqlite3_errmsg(db) << std::endl;
        return Transaction(); // Return default transaction on failure
    }

    // Bind the ID parameter to the SQL statement
    sqlite3_bind_int(stmt, 1, id);

    Transaction transaction;

    // Execute the statement and check if a result row is returned
    if (sqlite3_step(stmt) == SQLITE_ROW) {
        // Extract each column from the result and set the transaction's fields
        transaction.setId(sqlite3_column_int(stmt, 0));
        transaction.setAmount(sqlite3_column_double(stmt, 1));
        transaction.setCategory(reinterpret_cast<const char*>(sqlite3_column_text(stmt, 2)));
        transaction.setDate(reinterpret_cast<const char*>(sqlite3_column_text(stmt, 3)));
        transaction.setDescription(reinterpret_cast<const char*>(sqlite3_column_text(stmt, 4)));
    } else {
        std::cerr << "No transaction found with ID " << id << std::endl;
    }

    // Clean up the prepared statement
    sqlite3_finalize(stmt);

    return transaction;
}

// Retrieve all transactions from the database
std::vector<Transaction> TransactionRepo::getAllTransactions() {
    // SQL statement to select all transactions
    const char* sql = "SELECT id, amount, category, date, description FROM transactions;";
    sqlite3_stmt* stmt = nullptr;
    std::vector<Transaction> transactions;

    // Prepare the SQL statement
    if (sqlite3_prepare_v2(db, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        std::cerr << "Failed to prepare statement: " << sqlite3_errmsg(db) << std::endl;
        return transactions; // Return empty vector on failure
    }

    // Loop through all rows returned by the query
    while (sqlite3_step(stmt) == SQLITE_ROW) {
        Transaction transaction;
        transaction.setId(sqlite3_column_int(stmt, 0));
        transaction.setAmount(sqlite3_column_double(stmt, 1));
        transaction.setCategory(reinterpret_cast<const char*>(sqlite3_column_text(stmt, 2)));
        transaction.setDate(reinterpret_cast<const char*>(sqlite3_column_text(stmt, 3)));
        transaction.setDescription(reinterpret_cast<const char*>(sqlite3_column_text(stmt, 4)));
        transactions.push_back(transaction);
    }

    // Clean up the prepared statement
    sqlite3_finalize(stmt);

    return transactions;
}

// Update an existing transaction
bool TransactionRepo::updateTransaction(const Transaction& transaction) {
    // SQL statement to update a transaction by ID
    const char* sql = "UPDATE transactions SET amount = ?, category = ?, date = ?, description = ? WHERE id = ?;";
    sqlite3_stmt* stmt = nullptr;

    // Prepare the SQL statement
    if (sqlite3_prepare_v2(db, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        std::cerr << "Failed to prepare statement: " << sqlite3_errmsg(db) << std::endl;
        return false;
    }

    // Bind the updated fields and the ID to the SQL statement
    sqlite3_bind_double(stmt, 1, transaction.getAmount());
    sqlite3_bind_text(stmt, 2, transaction.getCategory().c_str(), -1, SQLITE_TRANSIENT);
    sqlite3_bind_text(stmt, 3, transaction.getDate().c_str(), -1, SQLITE_TRANSIENT);
    sqlite3_bind_text(stmt, 4, transaction.getDescription().c_str(), -1, SQLITE_TRANSIENT);
    sqlite3_bind_int(stmt, 5, transaction.getId());

    // Execute the statement
    if (sqlite3_step(stmt) != SQLITE_DONE) {
        std::cerr << "Failed to execute statement: " << sqlite3_errmsg(db) << std::endl;
        sqlite3_finalize(stmt);
        return false;
    }

    // Clean up the prepared statement
    sqlite3_finalize(stmt);

    return true;
}

// Delete a transaction by ID
bool TransactionRepo::deleteTransaction(int id) {
    // SQL statement to delete a transaction by ID
    const char* sql = "DELETE FROM transactions WHERE id = ?;";
    sqlite3_stmt* stmt = nullptr;

    // Prepare the SQL statement
    if (sqlite3_prepare_v2(db, sql, -1, &stmt, nullptr) != SQLITE_OK) {
        std::cerr << "Failed to prepare statement: " << sqlite3_errmsg(db) << std::endl;
        return false;
    }

    // Bind the ID parameter to the SQL statement
    sqlite3_bind_int(stmt, 1, id);

    // Execute the statement
    if (sqlite3_step(stmt) != SQLITE_DONE) {
        std::cerr << "Failed to execute statement: " << sqlite3_errmsg(db) << std::endl;
        sqlite3_finalize(stmt);
        return false;
    }

    // Clean up the prepared statement
    sqlite3_finalize(stmt);

    return true;
}
