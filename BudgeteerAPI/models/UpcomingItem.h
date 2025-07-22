
#include <string>
#include <nlohmann/json.hpp>

using namespace std;

class UpcomingItem {
private:
    int id;
    double amount;
    string dueDate;
    string category;
    string label;

public:
    UpcomingItem();
    UpcomingItem(int id, double amount, const string& dueDate,
                 const string& category, const string& label);

    // Getters
    int getId() const;
    double getAmount() const;
    const string& getDueDate() const;
    const string& getCategory() const;
    const string& getLabel() const;

    // Setters
    void setId(int id);
    void setAmount(double amount);
    void setDueDate(const string& dueDate);
    void setCategory(const string& category);
    void setLabel(const string& label);

    // Serialization
    nlohmann::json toJson() const;
    static UpcomingItem fromJson(const nlohmann::json& j);
};


