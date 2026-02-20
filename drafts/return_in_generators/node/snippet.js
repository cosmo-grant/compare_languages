function* gen() {
    yield 1;
    return 2;
}

g = gen();
console.log(g.next())
console.log(g.next())
console.log(g.next())
