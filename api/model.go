package api

import (
	"context"
	"encoding/json"

	"github.com/docker/docker/client"
)

// This function return docker server info.
func findInfo() (string, error) {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return "{}", err
	}
	info, err := cli.Info(ctx)
	if err != nil {
		return "{}", err
	}
	s, _ := json.Marshal(info)
	return string(s), nil
}
