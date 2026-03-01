package main

import "fmt"

func main() {
	s := make([]func() int, 0)
	for i := 0; i < 3; i++ {
		s = append(s, func() int { return i })
	}
	fmt.Println(s[0]())
	fmt.Println(s[1]())
	fmt.Println(s[2]())
}
