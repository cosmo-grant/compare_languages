package main

import "fmt"

var x = 1
var y = 2

func main() {
	fmt.Println(x)
	fmt.Println(y)
	var y = 3
	fmt.Println(y)
}
