def gen():
    yield 1
    return 2

g = gen()
print(next(g))
print(next(g))

