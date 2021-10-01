package main

import (
	"log"
	"net/http"

	"./api"
)

// Main function.
func main() {

	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)

	http.HandleFunc("/api/get-info", api.HandleGetInfo)

	// All routes related to containers.
	http.HandleFunc("/api/get-containers", api.HandleGetContainers)
	http.HandleFunc("/api/inspect-container", api.HandleInspectContainer)
	http.HandleFunc("/api/start-container", api.HandleStartContainer)
	http.HandleFunc("/api/stop-container", api.HandleStopContainer)
	http.HandleFunc("/api/rename-container", api.HandleRenameContainer)
	http.HandleFunc("/api/get-container-logs", api.HandleGetContainerLogs)
	http.HandleFunc("/api/get-container-stats", api.HandleGetContainerStats)
	http.HandleFunc("/api/remove-container", api.HandleRemoveContainer)

	// All routes related to images.
	http.HandleFunc("/api/get-images", api.HandleGetImages)

	log.Println("ldocker server listening at ", ":3000")
	if err := http.ListenAndServe(":3000", nil); err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
