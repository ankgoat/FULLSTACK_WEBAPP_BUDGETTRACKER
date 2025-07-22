#pragma once
#include <queue>
#include "../models/UpcomingItem.h" // Replace with your actual data type

using namespace std;

class UpcomingQueue {
public:
    // Add an item to the back of the queue
    void enqueue(UpcomingItem item);

    // Remove and return the item at the front of the queue
    UpcomingItem dequeue();

    // Peek at the item at the front without removing it
    UpcomingItem peek() const;

    // Check if the queue is empty
    bool isEmpty() const;

private:
    queue<UpcomingItem> uqueue; // Underlying queue storage
};
 