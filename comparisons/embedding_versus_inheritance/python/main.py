class Parent:
    def f(self):
        return self.g()

    def g(self):
        return "parent"


class Child(Parent):
    def g(self):
        return "child"


c = Child()
print(c.f())
