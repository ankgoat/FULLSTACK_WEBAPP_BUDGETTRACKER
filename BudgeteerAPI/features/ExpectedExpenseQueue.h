#pragma once
#include <queue>
#include "../models/ExpectedExpense.h"

using namespace std;

class ExpectedExpenseQueue {
public:
    void enqueue(ExpectedExpense expense);   // Add to back
    ExpectedExpense dequeue();               // Remove & return front
    ExpectedExpense peek() const;            // View front without removing
    bool isEmpty() const;                    // True if queue is empty
private:
    queue<ExpectedExpense> tqueue;
};
