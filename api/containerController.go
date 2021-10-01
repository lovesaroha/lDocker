package api

import (
	"encoding/json"
	"net/http"
)

// HandleGetContainers function listen to get /api/get-containers and return containers.
func HandleGetContainers(res http.ResponseWriter, req *http.Request) {
	containers, err := findContainers()
	if err != nil {
		// Unable to get containers.
		http.Error(res, `{"error" : "`+err.Error()+`"}`, 400)
		return
	}
	res.Write([]byte(containers))
}

// HandleGetContainerLogs function listen to get /api/get-container-logs and return container logs.
func HandleGetContainerLogs(res http.ResponseWriter, req *http.Request) {
	logs, err := findContainerLogs(req.FormValue("id"))
	if err != nil {
		// Unable to get containers.
		http.Error(res, `{"error" : "`+err.Error()+`"}`, 400)
		return
	}
	res.Write([]byte(logs))
}

// HandleStartContainer function listen to get /api/start-container.
func HandleStartContainer(res http.ResponseWriter, req *http.Request) {
	err := startContainer(req.FormValue("id"))
	if err != nil {
		// Unable to start containers.
		http.Error(res, `{"error" : "`+err.Error()+`"}`, 400)
		return
	}
	res.Write([]byte(`{"started" : true}`))
}

// HandleStopContainer function listen to get /api/stop-container.
func HandleStopContainer(res http.ResponseWriter, req *http.Request) {
	err := stopContainer(req.FormValue("id"))
	if err != nil {
		// Unable to stop containers.
		http.Error(res, `{"error" : "`+err.Error()+`"}`, 400)
		return
	}
	res.Write([]byte(`{"stopped" : true}`))
}

// HandleRenameContainer function listen to get /api/rename-container.
func HandleRenameContainer(res http.ResponseWriter, req *http.Request) {
	var container container
	if json.NewDecoder(req.Body).Decode(&container) != nil {
		http.Error(res, `{"error" : "Invalid parameters"}`, 400)
		return
	}
	err := renameContainer(container)
	if err != nil {
		// Unable to rename container.
		http.Error(res, `{"error" : "`+err.Error()+`"}`, 400)
		return
	}
	res.Write([]byte(`{"updated" : true}`))
}

// HandleRemoveContainer function listen to get /api/remove-container.
func HandleRemoveContainer(res http.ResponseWriter, req *http.Request) {
	var removeOptions containerRemoveOptions
	if json.NewDecoder(req.Body).Decode(&removeOptions) != nil {
		http.Error(res, `{"error" : "Invalid parameters"}`, 400)
		return
	}
	err := removeContainer(removeOptions)
	if err != nil {
		// Unable to remove container.
		http.Error(res, `{"error" : "`+err.Error()+`"}`, 400)
		return
	}
	res.Write([]byte(`{"removed" : true}`))
}

// HandleInspectContainer function listen to get /api/inspect-container and return container info.
func HandleInspectContainer(res http.ResponseWriter, req *http.Request) {
	container, err := inspectContainer(req.FormValue("id"))
	if err != nil {
		// Unable to get container info.
		http.Error(res, `{"error" : "`+err.Error()+`"}`, 400)
		return
	}
	res.Write([]byte(container))
}

// HandleGetContainerStats function listen to get /api/get-container-stats and return container stats info.
func HandleGetContainerStats(res http.ResponseWriter, req *http.Request) {
	containerStats, err := findContainerStats(req.FormValue("id"))
	if err != nil {
		// Unable to get container info.
		http.Error(res, `{"error" : "`+err.Error()+`"}`, 400)
		return
	}
	res.Write([]byte(containerStats))
}
