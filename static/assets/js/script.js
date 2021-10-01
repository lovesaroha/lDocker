"use-strict";

/*  Love Saroha
    lovesaroha1994@gmail.com (email address)
    https://www.lovesaroha.com (website)
    https://github.com/lovesaroha  (github)
*/

// All functions related to routing.
let appRoutes = {};

// Initialize router function.
function initializeRouter(e) {
    e.preventDefault();
    let url = window.location.toString().replace(window.location.origin, "").split("?");
    if (url[0] == "/") { url[0] = "/#/"; }
    if (appRoutes[url[0]] == undefined) {
        window.location = "/#/";
        return;
    }
    let urlParameters = {};
    if (url[1] != undefined) {
        // Assign url parameters values.
        let params = url[1].split("&");
        for (let k = 0; k < params.length; k++) {
            let paramsPair = params[k].split("=");
            if (paramsPair.length != 2) { continue; }
            urlParameters[paramsPair[0]] = paramsPair[1];
        }
    }
    // Prepare application.
    document.querySelector(`html`).scrollTop = 0;
    appRoutes[url[0]](urlParameters);
}

// Run router function on page change.
window.addEventListener("load", initializeRouter, false);
window.addEventListener("popstate", initializeRouter, false);
let view = document.getElementById("view_id");

// Home page.
appRoutes["/#/"] = function () {
    view.innerHTML = document.getElementById("homePageTemplate_id").innerHTML;
    getContainers().then(r => {
        showContainers();
    }).catch(e => { console.log(e); });
    getImages().then(r => {
        showImages();
    }).catch(e => { console.log(e); });
    getInfo().then(r => {
        showInfo();
    }).catch(e => { console.log(e); });
}

// Find by id.
function findById(list, id) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].Id == id) {
            return list[i];
        }
    }
    return {};
}

let info = {};

// Get docker info.
function getInfo() {
    return fetch(`/api/get-info`, {
        method: 'get',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => response.json()).then(json => {
        // Save info data.
        info = json;
    });
}

// This function show docker info.
function showInfo() {
    let el = document.getElementById("info_id");
    if (el == null) { return; }
    el.innerHTML = `<div class="bg-primary flex justify-between flex-wrap shadow-xl mb-4">
    <div class="bg-primary-dark p-2 px-4 m-3"><h3 class="mb-0 text-white font-bold">Containers ${info.Containers}</h3></div>
    <div class="bg-primary-dark p-2 px-4 m-3"><h3 class="mb-0 text-white font-bold">Running ${info.ContainersRunning}</h3></div>
    <div class="bg-primary-dark p-2 px-4 m-3"><h3 class="mb-0 text-white font-bold">Images ${info.Images}</h3></div>
    <div class="bg-primary-dark p-2 px-4 m-3"><h3 class="mb-0 text-white font-bold">CPU ${info.NCPU}</h3></div>
    <div class="bg-primary-dark p-2 px-4 m-3"><h3 class="mb-0 text-white font-bold">Memory ${parseInt(info.MemTotal / 1000000000)}gb</h3></div>
    </div>`;
}