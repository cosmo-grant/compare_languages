function foo() {
  console.log("here")
  return 0
}

function bar(x = foo()) {
  console.log(x)
}

bar()
bar(1)
bar()

