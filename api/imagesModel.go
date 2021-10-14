/*  Love Saroha
    lovesaroha1994@gmail.com (email address)
    https://www.lovesaroha.com (website)
    https://github.com/lovesaroha  (github)
*/
package api

import (
	"context"
	"encoding/json"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
)

// Find images.
func findImages() (string, error) {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return "[]", err
	}
	images, err := cli.ImageList(ctx, types.ImageListOptions{All: true})
	if err != nil {
		return "[]", err
	}
	s, _ := json.Marshal(images)
	return string(s), nil
}
