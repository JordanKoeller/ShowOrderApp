import numpy as np
cimport numpy as np

cpdef checkMany(np.ndarray[np.uint8_t, ndim=2] collisions, int numChecks, np.ndarray[np.uint8_t, ndim=2] frozen)