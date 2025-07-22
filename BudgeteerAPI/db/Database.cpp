#include "Database.h"
#include <iostream>

Database::Database() : db(nullptr) {}

Database::~Database() {
    closeConnection();
}

void Database::openConnection(const string& path) {
    if (sqlite3_open(path.c_str(), &db) != SQLITE_OK) {
        cerr << "Error opening database: " << sqlite3_errmsg(db) << endl;
        db = nullptr;
    }
}

void Database::initializeTables() {
    const char* createTableSQL =
        "CREATE TABLE IF NOT EXISTS transactions ("
        "id INTEGER PRIMARY KEY AUTOINCREMENT,"
        "amount REAL,"
        "category TEXT,"
        "date TEXT,"
        "description TEXT"
        ");";
    char* errMsg = nullptr;
    if (sqlite3_exec(db, createTableSQL, nullptr, nullptr, &errMsg) != SQLITE_OK) {
        cerr << "Error creating tables: " << errMsg << endl;
        sqlite3_free(errMsg);
    }
}

void Database::closeConnection() {
    if (db) {
        sqlite3_close(db);
        db = nullptr;
    }
}

sqlite3* Database::getConnection() const {
    return db;
}
