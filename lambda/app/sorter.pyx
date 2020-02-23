import numpy as np
cimport numpy as np

cpdef checkMany(np.ndarray[np.uint8_t, ndim=2] collisions, int numChecks, np.ndarray[np.uint8_t, ndim=2] frozen):
  cdef int n = collisions.shape[0]
  cdef int numFrozen = frozen.shape[0]
  cdef np.ndarray[np.uint8_t, ndim=1] best = np.random.randint(0,n,n,dtype=np.uint8)
  cdef np.ndarray[np.uint8_t, ndim=1] attempt = np.random.randint(0,n,n,dtype=np.uint8)
  cdef np.ndarray[np.uint8_t, ndim=1] indexLookup = np.random.randint(0,n,n,dtype=np.uint8)
  cdef int minCollisions = 1000000
  cdef int numCollisions = 0
  cdef int i = 0
  cdef int j = 0
  cdef int tmp = 0
  while i < numChecks:
    # generate an attempt
    attempt = np.random.randint(0, n, n, dtype=np.uint8)
    # Fix frozen values
    for j in range(0, n):
      indexLookup[attempt[j]] = j # map value to its index
    for j in range(0, numFrozen):
      tmp = attempt[frozen[j, 0]] # get value at frozen index
      attempt[frozen[j, 0]] = attempt[frozen[j, 1]] # Assign frozen value to its index
      attempt[indexLookup[frozen[1]]] = tmp # Assign swap out frozen value's position for the value that was at frozen index.
    # Compute number of collisions
    numCollisions = 0
    for j in range(0, n - 1):
      numCollisions += collisions[attempt[j], attempt[j + 1]]
    if numCollisions < minCollisions:
      best = attempt.copy()
      minCollisions = numCollisions
    i += 1
  return minCollisions, best