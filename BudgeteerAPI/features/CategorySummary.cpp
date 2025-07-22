#include "CategorySummary.h"



// Adds a transaction amount to a category
void CategorySummary::addTransaction(const string& category, double amount) {
    // Pseudocode:
    // - Check if the category exists in the map
    // - If it does, add the amount to its total
    // - If it does not, create a new entry with the amount

    totals[category] += amount;


}

// Removes an amount from a category (supports undo)
void CategorySummary::removeTransaction(const string& category, double amount) {
    // Pseudocode:
    // - Subtract the amount from the specified category
    // - If the resulting total is zero, remove the category from the map

    totals[category] -= amount;

    if(totals[category] == 0.0){
        totals.erase(category);
    }
}

// Returns the total for a specific category
double CategorySummary::getTotal(const string& category) const {
    // Pseudocode:
    // - Look for the category in the map
    // - If found, return its total
    // - If not found, return 0.01
    auto it  = totals.find(category);
    if(it != totals.end()){
        return it->second;
    }else{
        return 0.0;
    }
}

// Returns a copy of all category totals
unordered_map<string, double> CategorySummary::getAllTotals() const {
    // Pseudocode:
    // - Return a copy of the entire map of categories and totals
    
    return totals;
   
}

// Resets all summaries
void CategorySummary::clear() {
    // Pseudocode:
    // - Remove all entries from the map so it becomes empty
    totals.clear();
}
