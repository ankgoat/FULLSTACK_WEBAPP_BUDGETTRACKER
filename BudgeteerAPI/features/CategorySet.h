#pragma once
#include <string>
#include <set>

using namespace std;

class CategorySet { 
    private:
    set<string> categories; // Stores unique category names

    public:

    // Add a category to the set (if not already present)
    void addCategory(const string& category);

    // Remove a category from the set (if present)
    void removeCategory(const string& category);



    // Check if a category exists in the set
    bool contains(const string& category) const;

    // Get the total number of categories
    size_t size() const;

    // Retrieve all category names as a set
    set<string> getAllCategories() const;

    // Clear the entire set
    void clear();

    
};


