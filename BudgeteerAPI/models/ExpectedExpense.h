#pragma once
#include <string>
#include <nlohmann/json.hpp> // For JSON serialization

using namespace std;
using json = nlohmann::json;

class ExpectedExpense {
private:
    int id;
    double amount;
    string dueDate;
    string category;
    string label;

public:
    // Getters
    int getId() const;
    double getAmount() const;
    string getDueDate() const;
    string getCategory() const;
    string getLabel() const;

    // Setters
    void setId(int newId);
    void setAmount(double newAmount);
    void setDueDate(const string& newDueDate);
    void setCategory(const string& newCategory);
    void setLabel(const string& newLabel);

    // JSON serialization
    json toJson() const;
    static ExpectedExpense fromJson(const json& jsonObj);
};
