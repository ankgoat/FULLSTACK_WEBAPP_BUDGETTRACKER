#include "RecentHistory.h"



// Add a Transaction to the history
void RecentHistory::record(Transaction payment) {
    // PSEUDOCODE:
    // - Push the new transaction to the front OR back of the deque
    //   (choose one policy and stay consistent)

    history.pop_back();


}

// Return N most recent Transactions as a vector
vector<Transaction> RecentHistory::getRecent(int N) const {
    // PSEUDOCODE:
    // - Create an empty vector<Transaction> result
    // - Iterate through the deque up to N elements
    // - Push those elements into result
    // - Return result

    vector<Transaction> result;

    for(const Transaction& a: history){
        result.push_back(a);

    }
    return result;
}
