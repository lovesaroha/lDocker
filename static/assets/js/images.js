/*  Love Saroha
    lovesaroha1994@gmail.com (email address)
    https://www.lovesaroha.com (website)
    https://github.com/lovesaroha  (github)
*/

let images = [];

// Get images.
function getImages() {
  return fetch(`/api/get-images`, {
    method: 'get',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(response => response.json()).then(json => {
    // Save images data.
    images = json;
  });
}

// This function show images.
function showImages() {
  let el = document.getElementById("imagesList_id");
  if (el == null) { return; }
  if (images.length == 0) {
    // No images.
    el.innerHTML = `<h1 class="font-bold underline">Containers</h1><div class="mb-2 card flex p-2">
    <i class="fad fa-disk fa-3x mr-3 icon-primary"></i>
    <div class="w-full self-center"><h3 class="bg-placeholder mb-2 p-2 w-half"></h3><h4 class="bg-placeholder mb-0 p-2"></h4></div></div>
    <i class="fad fa-disk fa-3x mr-3 icon-primary"></i>
    <div class="w-full self-center"><h3 class="bg-placeholder mb-2 p-2 w-half"></h3><h4 class="bg-placeholder mb-0 p-2"></h4></div></div>`;
    return;
  }
  let template = `<h1 class="font-bold underline">Images</h1>`;
  for (let i = 0; i < images.length; i++) {
    template += `<div class="card p-2 flex flex-wrap mb-2">
    <i class="fad fa-clone fa-3x mr-3 icon-primary hide-on-sm"></i>
    <div class="media-body">
    <h3 class="font-bold mb-0">${images[i].RepoTags[0]}</h3>
    <h4 class="text-subtitle">${parseInt(images[i].Size / 1000000)}mb</h4>
    </div></div>`;
  }
  el.innerHTML = template;
}