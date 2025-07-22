#pragma once
#include <vector>
#include <deque>
#include "../models/Transaction.h"

using namespace std;

class RecentHistory{
    public:
    //adds a transaction to the history
    void record(Transaction payment);

    //returns a vector of the N most recent transactions 
    vector<Transaction> getRecent(int n) const;

    private:
    deque<Transaction> history;



};
