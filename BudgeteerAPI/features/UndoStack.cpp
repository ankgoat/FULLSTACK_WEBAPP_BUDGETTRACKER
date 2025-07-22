#include "UndoStack.h"

using namespace std;

void UndoStack::push(Transaction transaction) {
    tstack.push(transaction);

}

Transaction UndoStack::pop() {
    // PSEUDOCODE:
    // - If stack_ is empty, handle underflow (throw/return default)
    // - Else, store tstack.top() in temp
    // - stack_.pop();
    // - return temp;

    
    if(tstack.empty()){
        return Transaction();
    }
    Transaction temp = tstack.top();
    tstack.pop();
    return temp;

}

bool UndoStack::isEmpty() const {
    // PSEUDOCODE:
    // - return tstack.empty();
    return tstack.empty();
}
