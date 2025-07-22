#pragma once
#include <string>
#include <nlohmann/json.hpp> // For JSON serialization

using namespace std;
using json = nlohmann::json;

class Transaction {
private:
    int id;
    double amount;
    string category;
    string date;
    string description;

public:
    // Getters
    int getId() const;
    double getAmount() const;
    string getCategory() const;
    string getDate() const;
    string getDescription() const;

    // Setters
    void setId(int newId);
    void setAmount(double newAmount);
    void setCategory(const string& newCategory);
    void setDate(const string& newDate);
    void setDescription(const string& newDescription);

    // JSON serialization
    json toJson() const;
    static Transaction fromJson(const json& jsonObj);
};
