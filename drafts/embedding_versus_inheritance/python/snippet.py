class Inner:
    def F(self):
        return self.G()

    def G(self):
        return "inner"


class Outer(Inner):
    def G(self):
        return "outer"


o = Outer()
print(o.F())
