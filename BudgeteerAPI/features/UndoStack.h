#pragma once
#include <stack>
#include "../models/Transaction.h"

using namespace std;

class UndoStack {
public:
    void push(Transaction transaction);   // Add to top
    Transaction pop();                    // Remove & return top
    bool isEmpty() const;                 // True if stack is empty
private:
    stack<Transaction> tstack;
};
