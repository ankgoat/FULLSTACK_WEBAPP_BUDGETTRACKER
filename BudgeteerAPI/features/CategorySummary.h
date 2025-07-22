#pragma once
#include <string>
#include <unordered_map>;

using namespace std;

class CategorySummary{
    public: 

    //Adds a transaction amount to the category
    void addTransaction(const string& category, double amount);

    // Remove an amount to a category (supoorts undo)
    void removeTransaction(const string& category, double amount);

    //Returns the total for a specfic category
    double getTotal(const string& category)const;

    //Return a copy of all category totals
    unordered_map<string,double> getAllTotals() const;

    //Resets all summaries
    void clear();

    private:
    unordered_map<string,double> totals;

};

