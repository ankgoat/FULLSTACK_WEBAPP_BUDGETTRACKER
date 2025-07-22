#include "Transaction.h"

// Getters
int Transaction::getId() const {
    return id;
}

double Transaction::getAmount() const {
    return amount;
}

string Transaction::getCategory() const {
    return category;
}

string Transaction::getDate() const {
    return date;
}

string Transaction::getDescription() const {
    return description;
}

// Setters
void Transaction::setId(int newId) {
    id = newId;
}

void Transaction::setAmount(double newAmount) {
    amount = newAmount;
}

void Transaction::setCategory(const string& newCategory) {
    category = newCategory;
}

void Transaction::setDate(const string& newDate) {
    date = newDate;
}

void Transaction::setDescription(const string& newDescription) {
    description = newDescription;
}

// JSON Serialization
json Transaction::toJson() const {
    json j;
    j["id"] = id;
    j["amount"] = amount;
    j["category"] = category;
    j["date"] = date;
    j["description"] = description;
    return j;
}

Transaction Transaction::fromJson(const json& jsonObj) {
    Transaction t;
    t.setId(jsonObj.value("id", 0));
    t.setAmount(jsonObj.value("amount", 0.0));
    t.setCategory(jsonObj.value("category", ""));
    t.setDate(jsonObj.value("date", ""));
    t.setDescription(jsonObj.value("description", ""));
    return t;
}
