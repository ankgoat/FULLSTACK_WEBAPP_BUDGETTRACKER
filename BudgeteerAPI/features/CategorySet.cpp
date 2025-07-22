#include "CategorySet.h"


// Add a category to the set
void CategorySet::addCategory(const string& category) {
    // Insert the category into the set if it is not already there
    
    categories.insert(category);

    
}

// Remove a category from the set
void CategorySet::removeCategory(const string& category) {
    // Remove the category from the set if it exists
    categories.erase(category);
    
}

// Check if a category exists
bool CategorySet::contains(const string& category) const {
    // Return true if the set contains the category, otherwise false
    return categories.contains(category);
        
    
}

// Get number of categories
size_t CategorySet::size() const {
    // Return the size of the set
    size_t size = categories.size();
    return size;
}

// Retrieve all category names
set<string> CategorySet::getAllCategories() const {
    // Return a copy of the set of category names
    return categories;
}

// Clear the set
void CategorySet::clear() {
    // Remove all entries from the set

    categories.clear();

}
