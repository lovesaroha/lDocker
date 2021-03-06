/*  Love Saroha
    lovesaroha1994@gmail.com (email address)
    https://www.lovesaroha.com (website)
    https://github.com/lovesaroha  (github)
*/
package api

import "net/http"

// HandleGetInfo function listen to get /api/get-info and return docker info.
func HandleGetInfo(res http.ResponseWriter, req *http.Request) {
	info, err := findInfo()
	if err != nil {
		// Unable to get info.
		http.Error(res, `{"error" : "`+err.Error()+`"}`, 400)
		return
	}
	res.Write([]byte(info))
}
