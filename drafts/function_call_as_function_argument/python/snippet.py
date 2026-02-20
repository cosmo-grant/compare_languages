def foo():
    print("here")
    return 0

def bar(x=foo()):
    print(x)

bar()
bar(1)
bar()

