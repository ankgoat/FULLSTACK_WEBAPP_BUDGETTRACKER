#pragma once // declarews my database calss is a public interface
#include <string>
#include <sqlite3.h>

using namespace std;

class Database {
private:
    sqlite3* db; // Pointer to the SQLite database connection

public:


//Constucutor and destructor and we need it to construct the class and and destruct the class when the object gets destroyed
    Database();
    ~Database();

    // Open a connection to the database at the given file path
    void openConnection(const string& path);

    // Create required tables if they do not exist
    void initializeTables();

    // Close the database connection
    void closeConnection();

    // Get the raw sqlite3* pointer (for use by repositories)
    sqlite3* getConnection() const;
};
