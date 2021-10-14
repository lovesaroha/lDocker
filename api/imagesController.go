/*  Love Saroha
    lovesaroha1994@gmail.com (email address)
    https://www.lovesaroha.com (website)
    https://github.com/lovesaroha  (github)
*/
package api

import "net/http"

// HandleGetImages function listen to get /api/get-images and return images.
func HandleGetImages(res http.ResponseWriter, req *http.Request) {
	images, err := findImages()
	if err != nil {
		// Unable to get images.
		http.Error(res, `{"error" : "`+err.Error()+`"}`, 400)
		return
	}
	res.Write([]byte(images))
}
