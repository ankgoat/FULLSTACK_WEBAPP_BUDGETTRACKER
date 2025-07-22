#include "UpcomingItem.h"

using namespace std;

// Constructors
UpcomingItem::UpcomingItem()
    : id(0), amount(0.0), dueDate(""), category(""), label("") {}

UpcomingItem::UpcomingItem(int id, double amount, const string& dueDate,
                           const string& category, const string& label)
    : id(id), amount(amount), dueDate(dueDate), category(category), label(label) {}

// Getters
int UpcomingItem::getId() const { return id; }
double UpcomingItem::getAmount() const { return amount; }
const string& UpcomingItem::getDueDate() const { return dueDate; }
const string& UpcomingItem::getCategory() const { return category; }
const string& UpcomingItem::getLabel() const { return label; }

// Setters
void UpcomingItem::setId(int id) { this->id = id; }
void UpcomingItem::setAmount(double amount) { this->amount = amount; }
void UpcomingItem::setDueDate(const string& dueDate) { this->dueDate = dueDate; }
void UpcomingItem::setCategory(const string& category) { this->category = category; }
void UpcomingItem::setLabel(const string& label) { this->label = label; }

// Serialization
nlohmann::json UpcomingItem::toJson() const {
    nlohmann::json j;
    j["id"] = id;
    j["amount"] = amount;
    j["dueDate"] = dueDate;
    j["category"] = category;
    j["label"] = label;
    return j;
}

UpcomingItem UpcomingItem::fromJson(const nlohmann::json& j) {
    return UpcomingItem(
        j.value("id", 0),
        j.value("amount", 0.0),
        j.value("dueDate", ""),
        j.value("category", ""),
        j.value("label", "")
    );
}
