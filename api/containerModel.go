package api

import (
	"context"
	"encoding/json"
	"io"
	"time"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
)

// Container object.
type container struct {
	ID   string `json:"_id,omitempty" bson:"_id,omitempty"`
	Name string `json:"name,omitempty" bson:"name,omitempty"`
}

// Container remove options.
type containerRemoveOptions struct {
	ID            string `json:"_id,omitempty" bson:"_id,omitempty"`
	RemoveVolumes bool   `json:"removeVolumes,omitempty" bson:"removeVolumes,omitempty"`
	RemoveLinks   bool   `json:"removeLinks,omitempty" bson:"removeLinks,omitempty"`
	Force         bool   `json:"force,omitempty" bson:"force,omitempty"`
}

// Container stats object.
type containerStatsObject struct {
	UpdatedAt   time.Time         `json:"updatedAt,omitempty" bson:"updatedAt,omitempty"`
	Port        int               `json:"port,omitempty" bson:"port,omitempty"`
	Deployed    bool              `json:"deployed,omitempty" bson:"deployed,omitempty"`
	MemoryStats MemoryStatsObject `json:"memory_stats,omitempty" bson:"memory_stats,omitempty"`
	Networks    NetworksObject    `json:"networks,omitempty" bson:"networks,omitempty"`
}

// Networks object defined.
type NetworksObject struct {
	Eth EthObject `json:"eth0,omitempty" bson:"eth0,omitempty"`
}

// Eth object defined.
type EthObject struct {
	ReceivedBytes      int `json:"rx_bytes,omitempty" bson:"rx_bytes,omitempty"`
	ReceivedPackets    int `json:"rx_packets,omitempty" bson:"rx_packets,omitempty"`
	TransmittedBytes   int `json:"tx_bytes,omitempty" bson:"tx_bytes,omitempty"`
	TransmittedPackets int `json:"tx_packets,omitempty" bson:"tx_packets,omitempty"`
}

// Memory stats object defined.
type MemoryStatsObject struct {
	Usage    int `json:"usage,omitempty" bson:"usage,omitempty"`
	MaxUsage int `json:"max_usage,omitempty" bson:"max_usage,omitempty"`
}

// Find containers.
func findContainers() (string, error) {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return "[]", err
	}

	containers, err := cli.ContainerList(ctx, types.ContainerListOptions{All: true})
	if err != nil {
		return "[]", err
	}
	s, _ := json.Marshal(containers)
	return string(s), nil
}

// This function return container logs.
func findContainerLogs(id string) (string, error) {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return "", err
	}
	out, err := cli.ContainerLogs(ctx, id, types.ContainerLogsOptions{ShowStdout: true})
	if err != nil {
		return "", err
	}
	o, err := io.ReadAll(out)
	if err != nil {
		return "", err
	}
	return string(o), nil
}

// This function rename given container.
func renameContainer(container container) error {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return err
	}

	err = cli.ContainerRename(ctx, container.ID, container.Name)
	if err != nil {
		return err
	}
	return nil
}

// This function stop given container.
func stopContainer(id string) error {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return err
	}

	err = cli.ContainerStop(ctx, id, nil)
	if err != nil {
		return err
	}
	return nil
}

// This function start given container.
func startContainer(id string) error {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return err
	}

	err = cli.ContainerStart(ctx, id, types.ContainerStartOptions{})
	if err != nil {
		return err
	}
	return nil
}

// This function remove given container.
func removeContainer(options containerRemoveOptions) error {
	options.Force = true
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return err
	}

	err = cli.ContainerRemove(ctx, options.ID, types.ContainerRemoveOptions{Force: options.Force, RemoveVolumes: options.RemoveVolumes, RemoveLinks: options.RemoveLinks})
	if err != nil {
		return err
	}
	return nil
}

// This function return container info.
func inspectContainer(id string) (string, error) {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return "{}", err
	}

	container, err := cli.ContainerInspect(ctx, id)
	if err != nil {
		return "{}", err
	}
	s, _ := json.Marshal(container)
	return string(s), nil
}

// This function return contaner stats.
func findContainerStats(id string) (string, error) {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return "{}", err
	}
	stats, err := cli.ContainerStats(ctx, id, false)
	if err != nil {
		return "{}", err
	}
	var containerStats containerStatsObject
	b, _ := io.ReadAll(stats.Body)
	json.Unmarshal([]byte(string(b)), &containerStats)
	s, _ := json.Marshal(containerStats)
	return string(s), nil
}
