def foo():
    print("here")

def bar(x=foo()):
    pass

bar()
bar(1)
bar()
