package main

import "fmt"

type Inner struct{}

type Outer struct{ Inner }

func (i Inner) F() string {
	return i.G()
}

func (i Inner) G() string { return "inner" }

func (o Outer) G() string { return "outer" }

func main() {
	o := Outer{Inner{}}
	fmt.Println(o.F())
}
