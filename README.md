# ShowOrderApp
App for computing the optimal order of acts in a dance show to avoid having too many quick changes (situations where the same person is in two acts that
are back-to-back).

This was made by request of a friend for the 2020 Trinity University Momentum Dance show. It is certainly a "quick and dirty" app that does not
find the _most_ optimal solution, but it does find a handful of good show orders, providing the show's producers with some show order options
to choose from that have a close-to-minimal number of quick-changes.

## Algorithm design

A brute-force method is used. The user uploads a CSV specifying what students are in what dances, and the app randomly shuffles dance orders, computing
the total number of quick-changes in the show order. This is repeated for many possible show orders, and the top 5 that are found are returned to the user.

As a simple way of parallelizing the app, I run the actual shuffling code in AWS Lambda, with 10 concurrent invocations. Additionally, the shuffle code is cythonized
and vectorized to provide additional performance. In total, it can test about 10 million show orders in about 30 seconds.
