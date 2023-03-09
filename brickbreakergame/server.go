package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("starting")
	static := http.FileServer(http.Dir("./test"))
	http.Handle("/", static)

	http.ListenAndServe(":8080", nil)
}
