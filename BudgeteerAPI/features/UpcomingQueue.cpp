#include "UpcomingQueue.h"

// Adds an UpcomingItem to the back of the queue
void UpcomingQueue::enqueue(UpcomingItem item)
{
    /*
      Pseudocode:
      - Add the given item to the end of the internal queue.
      - (Use the queue's push method.)
    */

    uqueue.push(item);
}

// Removes and returns the item from the front of the queue
UpcomingItem UpcomingQueue::dequeue()
{
    /*
      Pseudocode:
      - If the queue is empty:
          - Return a default UpcomingItem (or handle error as needed).
      - Otherwise:
          - Get the item at the front of the queue.
          - Remove the front item from the queue.
          - Return the removed item.
    */

    if(uqueue.empty()){
        return UpcomingItem();
    }else{
        UpcomingItem temp = uqueue.front();
        uqueue.pop();
        return temp;
    }
}

// Returns the item at the front of the queue without removing it
UpcomingItem UpcomingQueue::peek() const
{
    /*
      Pseudocode:
      - If the queue is empty:
          - Return a default UpcomingItem (or handle error as needed).
      - Otherwise:
          - Return the item at the front of the queue (do not remove it).
    */
   if(uqueue.empty()){
    return UpcomingItem();
   }
   return uqueue.front();
}

// Checks if the queue is empty
bool UpcomingQueue::isEmpty() const
{
    /*
      Pseudocode:
      - Return true if the internal queue contains no items; otherwise, return false.
    */
   return uqueue.empty();
}
