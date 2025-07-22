#include "ExpectedExpense.h"

// Getters
int ExpectedExpense::getId() const {
    return id;
}

double ExpectedExpense::getAmount() const {
    return amount;
}

string ExpectedExpense::getDueDate() const {
    return dueDate;
}

string ExpectedExpense::getCategory() const {
    return category;
}

string ExpectedExpense::getLabel() const {
    return label;
}

// Setters
void ExpectedExpense::setId(int newId) {
    id = newId;
}

void ExpectedExpense::setAmount(double newAmount) {
    amount = newAmount;
}

void ExpectedExpense::setDueDate(const string& newDueDate) {
    dueDate = newDueDate;
}

void ExpectedExpense::setCategory(const string& newCategory) {
    category = newCategory;
}

void ExpectedExpense::setLabel(const string& newLabel) {
    label = newLabel;
}

// JSON Serialization
json ExpectedExpense::toJson() const {
    json j;
    j["id"] = id;
    j["amount"] = amount;
    j["dueDate"] = dueDate;
    j["category"] = category;
    j["label"] = label;
    return j;
}

ExpectedExpense ExpectedExpense::fromJson(const json& jsonObj) {
    ExpectedExpense e;
    e.setId(jsonObj.value("id", 0));
    e.setAmount(jsonObj.value("amount", 0.0));
    e.setDueDate(jsonObj.value("dueDate", ""));
    e.setCategory(jsonObj.value("category", ""));
    e.setLabel(jsonObj.value("label", ""));
    return e;
}
