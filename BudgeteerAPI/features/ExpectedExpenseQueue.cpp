#include "ExpectedExpenseQueue.h"

using namespace std;

void ExpectedExpenseQueue::enqueue(ExpectedExpense expense) {
    
    tqueue.push(expense);
}

ExpectedExpense ExpectedExpenseQueue::dequeue() {
    
    if(tqueue.empty()){
        return ExpectedExpense();
    }
    else{
        ExpectedExpense temp = tqueue.front();
        tqueue.pop();
        return temp;
    }
}

ExpectedExpense ExpectedExpenseQueue::peek() const {
   
    if(tqueue.empty()){
        return ExpectedExpense();
    }
    else{
        return tqueue.front();
    }
}

bool ExpectedExpenseQueue::isEmpty() const {
    
    return tqueue.empty();
}
