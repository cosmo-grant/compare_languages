function foo() {
  console.log("here")
}

function bar(x = foo()) { }

bar()
bar(1)
bar()

