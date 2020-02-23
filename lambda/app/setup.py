from distutils.core import setup, Extension

import numpy
import sys


if __name__ =="__main__":
    extension = Extension("sorter", sources = ["sorter.pyx" ], extra_link_args=["-Ofast"], libraries = ["m"])

    from Cython.Build import cythonize
    modules = cythonize(extension)
    setup(
        ext_modules = modules,
        include_dirs = [numpy.get_include()],
    )
