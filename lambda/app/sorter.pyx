import numpy as np
cimport numpy as np

cpdef checkMany(np.ndarray[np.uint8_t, ndim=2] collisions, int numChecks, np.ndarray[np.uint8_t, ndim=2] frozen):
  cdef int n = collisions.shape[0]
  cdef int numFrozen = (frozen.shape[0] * frozen.shape[1]) // 2
  cdef np.ndarray[np.uint8_t, ndim=1] best = np.arange(0,n,dtype=np.uint8)
  cdef np.ndarray[np.uint8_t, ndim=1] attempt = np.arange(0,n,dtype=np.uint8)
  cdef np.ndarray[np.uint8_t, ndim=1] indexLookup = np.arange(0,n,dtype=np.uint8)
  cdef int minCollisions = 1000000
  cdef int numCollisions = 0
  cdef int i = 0
  cdef int j = 0
  cdef int tmp = 0
  cdef int k = 0
  cdef int indI = 0
  cdef int indJ = 0
  while i < numChecks:
    # generate an attempt
    np.random.shuffle(attempt)
    # Fix frozen values
    for k in range(0, n):
      indexLookup[attempt[k]] = k # map value to its index
    for j in range(0, numFrozen):
      # Get the indices in the attempt you're swapping
      indI = frozen[j, 0] 
      indJ = indexLookup[frozen[j, 1]]
      # Need to correct the index lookup for the next frozen pair.
      indexLookup[attempt[indI]] = indJ
      indexLookup[attempt[indJ]] = indI
      # Swap the values in the attemp
      tmp = attempt[indI]
      attempt[indI] = attempt[indJ]
      attempt[indJ] = tmp
    numCollisions = 0
    for j in range(0, n - 1):
      numCollisions += collisions[attempt[j], attempt[j + 1]]
    if numCollisions < minCollisions:
      best = attempt.copy()
      minCollisions = numCollisions
    i += 1
  return minCollisions, best

def checkMany(collisions, numChecks, frozen):
  n = collisions.shape[0]
  numFrozen = (frozen.shape[0] * frozen.shape[1]) // 2
  best = np.arange(0,n,dtype=np.uint8)
  attempt = np.arange(0,n,dtype=np.uint8)
  indexLookup = np.arange(0,n,dtype=np.uint8)
  minCollisions = 1000000
  numCollisions = 0
  i = 0
  j = 0
  tmp = 0
  while i < numChecks:
    # generate an attempt
    np.random.shuffle(attempt)
    # Fix frozen values
    for k in range(0, n):
      indexLookup[attempt[k]] = k # map value to its index
    for j in range(0, numFrozen):
      # Get the indices in the attempt you're swapping
      indI = frozen[j, 0] 
      indJ = indexLookup[frozen[j, 1]]
      # Need to correct the index lookup for the next frozen pair.
      indexLookup[attempt[indI]] = indJ
      indexLookup[attempt[indJ]] = indI
      # Swap the values in the attemp
      tmp = attempt[indI]
      attempt[indI] = attempt[indJ]
      attempt[indJ] = tmp
    numCollisions = 0
    for j in range(0, n - 1):
      numCollisions += collisions[attempt[j], attempt[j + 1]]
    if numCollisions < minCollisions:
      best = attempt.copy()
      minCollisions = numCollisions
    i += 1
  return minCollisions, best