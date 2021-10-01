
/*  Love Saroha
    lovesaroha1994@gmail.com (email address)
    https://www.lovesaroha.com (website)
    https://github.com/lovesaroha  (github)
*/

let containers = [];

// Get containers.
function getContainers() {
  return fetch(`/api/get-containers`, {
    method: 'get',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(response => response.json()).then(json => {
    // Save container data.
    containers = json;
  });
}

// Start stop container.
function startStopContainer(el) {
  let id = el.getAttribute("data-id");
  let container = findById(containers, id);
  closeModal();
  let url = `/api/start-container?id=${container.Id}`;
  if (container.State == "running") {
    url = `/api/stop-container?id=${container.Id}`;
  }
  fetch(url, {
    method: 'get',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(response => response.json()).then(json => {
    getContainers().then(r => {
      // Show containers.
      showContainers();
    }).catch(e => { console.log(e); });
    getInfo().then(r => {
      showInfo();
    }).catch(e => { console.log(e); });
  }).catch(e => { console.log(e); });
}

// This function show containers.
function showContainers() {
  let el = document.getElementById("containersList_id");
  if (el == null) { return; }
  if (containers.length == 0) {
    // No containers.
    el.innerHTML = `<h1 class="font-bold underline">Containers</h1><div class="mb-2 card flex p-2">
    <i class="fad fa-square fa-3x mr-3 icon-primary"></i>
    <div class="w-full self-center"><h3 class="bg-placeholder mb-2 p-2 w-half"></h3><h4 class="bg-placeholder mb-0 p-2"></h4></div></div>
    <i class="fad fa-square fa-3x mr-3 icon-primary"></i>
    <div class="w-full self-center"><h3 class="bg-placeholder mb-2 p-2 w-half"></h3><h4 class="bg-placeholder mb-0 p-2"></h4></div></div>`;
    return;
  }
  let template = `<h1 class="font-bold underline">Containers</h1>`;
  for (let i = 0; i < containers.length; i++) {
    template += `<div class="card p-2 flex flex-wrap mb-2">
    <i class="fad fa-square fa-3x mr-3 ${containers[i].State == 'running' ? 'icon-primary' : 'text-gray'} hide-on-sm"></i>
    <div class="media-body">
    <h3 class="font-bold mb-0 hover:underline cursor-pointer" data-id="${containers[i].Id}" onclick="javascript: showContainerInfo(this);">${containers[i].Names[0].replace("/", "")}</h3>
    <h4 class="text-subtitle capitalize">${containers[i].State}</h4>
    </div></div>`;
  }
  el.innerHTML = template;
}

// This function shows container info.
function showContainerInfo(el) {
  let id = el.getAttribute("data-id");
  let container = findById(containers, id);
  let ports = ``;
  if (container.Ports.length > 0) {
    ports = `<div class="card p-2 mb-2">
    <h3 class="font-bold mb-0">Port</h3>
    <h4 class="text-subtitle  mb-0">${container.Ports[0].PrivatePort}:${container.Ports[0].PublicPort}</h4></div>`;
  }
  showModal(`<div class="bg-modal fade-in modal-content mx-auto mt-10 overflow-hidden p-4 shadow-xl sm:max-w-xl sm:w-full">
  <h1 class="font-bold mb-0">${container.Names[0].replace("/", "")}</h1>
  <h4 class="text-subtitle capitalize">${container.State}</h4>
  <div class="card p-4 mb-2 flex justify-between flex-wrap">
  <i data-id="${container.Id}" onclick="javascript: startStopContainer(this);" class="fad ${container.State == 'running' ? 'fa-pause' : 'fa-play'}  cursor-pointer mx-3 fa-2x icon-primary"></i>
  <i data-id="${container.Id}" onclick="javascript: showContainerDetails(this);" class="fad fa-info-circle cursor-pointer mx-3 fa-2x icon-primary"></i>
  <i data-id="${container.Id}" onclick="javascript: showContainerRemoveConfirmation(this);" class="fad fa-trash mx-3 cursor-pointer fa-2x icon-primary"></i>
  <i data-id="${container.Id}" onclick="javascript: showContainerLogs(this);" class="fad fa-align-left mx-3 cursor-pointer fa-2x icon-primary"></i>
  <i data-id="${container.Id}" onclick="javascript: showContainerStats(this);" class="fad fa-analytics mx-3 cursor-pointer fa-2x icon-primary"></i>
  </div>
  <div class="card p-2 mb-2">
  <h3 class="font-bold mb-0">ID</h3>
  <h4 class="text-subtitle truncate mb-0">${container.Id.substring(0, 12)}</h4></div>
  <div class="card p-2 mb-2">
  <h3 class="font-bold mb-0">Image</h3>
  <h4 class="text-subtitle  mb-0">${container.Image}</h4></div>
  ${ports}
  </div>`);
}

// This function shows container details.
function showContainerDetails(el) {
  let id = el.getAttribute("data-id");
  showModal(`<div class="bg-modal fade-in modal-content mx-auto mt-10 overflow-hidden p-4 shadow-xl sm:max-w-3xl sm:w-full">
  <div id="${id}">
  <center><i class="fad fa-spinner-third fa-spin fa-3x icon-primary"></i><h3 class="font-bold">Getting Info..</h3></center>
  </div></div>`);
  // Get container details.
  fetch(`/api/inspect-container?id=${id}`, {
    method: 'get',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(response => response.json()).then(json => {
    // Environment variables.
    let environment = `<h3 class="font-bold">Environment</h3>`;
    for (let i = 0; i < json.Config.Env.length; i++) {
      environment += `<div class="bg-light p-2 mb-2"><h4 class="font-bold mb-0">${json.Config.Env[i].split("=")[0]}</h4>
      <h4 class="text-subtitle mb-0">${json.Config.Env[i].split("=")[1]}</h4></div>`;
    }
    // Mounted volumes.
    let mounts = `<h3 class="font-bold">Mounts</h3>`;
    for (let i = 0; i < json.Mounts.length; i++) {
      mounts += `<div class="bg-light p-2 mb-2"><h4 class="font-bold mb-0">${json.Mounts[i]["Destination"]}</h4>
      <h4 class="text-subtitle mb-0">${json.Mounts[i]["Source"]}</h4></div>`;
    }
    document.getElementById(id).innerHTML = `${environment}${mounts}`;
  }).catch(error => { closeModal(); });
}

// This function shows container logs.
function showContainerLogs(el) {
  let id = el.getAttribute("data-id");
  showModal(`<div class="bg-modal fade-in modal-content mx-auto mt-10 overflow-hidden p-4 shadow-xl sm:max-w-3xl sm:w-full">
  <div id="${id}">
  <center><i class="fad fa-spinner-third fa-spin fa-3x icon-primary"></i><h3 class="font-bold">Getting Info..</h3></center>
  </div></div>`);
  // Get container logs.
  fetch(`/api/get-container-logs?id=${id}`, {
    method: 'get'
  }).then(response => response.text()).then(text => {
    // Show text.
    document.getElementById(id).innerHTML = `<div class="bg-light p-2">${text}</div>`;
  }).catch(error => { closeModal(); });
}

// This function shows container stats.
function showContainerStats(el) {
  let id = el.getAttribute("data-id");
  let container = findById(containers, id);
  if (container.State != 'running') {
    showModal(`<div class="bg-modal fade-in modal-content mx-auto mt-10 overflow-hidden p-4 shadow-xl sm:max-w-md sm:w-full">
    <center><i class="fad fa-envelope fa-3x icon-primary"></i>
    <h3 class="font-bold mb-0">Container stopped</h3>
    <h4 class="text-subtitle">Start this container first to see stats</h4>
    </center>
    </div>`);
    return;
  }
  showModal(`<div class="bg-modal fade-in modal-content mx-auto mt-10 overflow-hidden p-4 shadow-xl sm:max-w-md sm:w-full">
  <div id="${id}">
  <center><i class="fad fa-spinner-third fa-spin fa-3x icon-primary"></i><h3 class="font-bold">Getting Info..</h3></center>
  </div></div>`);
  // Get container stats.
  fetch(`/api/get-container-stats?id=${id}`, {
    method: 'get',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(response => response.json()).then(json => {
    // Show text.
    document.getElementById(id).innerHTML = `<h3 class="font-bold mb-0">Memory</h3><h4 class="text-subtitle">${(json.memory_stats.usage / 1000000).toFixed(2)}mb</h4>
    <h3 class="font-bold mb-0">Network</h3>
    <h4 class="text-subtitle mb-0">Received <font class="text-primary">${(json.networks.eth0.rx_bytes / 1000).toFixed(2)}kb</font></h4>`;
  }).catch(error => { closeModal(); });
}

// This function shows container remove confirmation.
function showContainerRemoveConfirmation(el) {
  let id = el.getAttribute("data-id");
  let container = findById(containers, id);
  if (container.State == 'running') {
    showModal(`<div class="bg-modal fade-in modal-content mx-auto mt-10 overflow-hidden p-4 shadow-xl sm:max-w-xl sm:w-full">
    <center><i class="fad fa-envelope fa-3x icon-primary"></i>
    <h3 class="font-bold mb-0">Cannot remove a running container</h3>
    <h4 class="text-subtitle">Stop this container first and than remove it</h4>
    </center>
    </div>`);
    return;
  }
  showModal(`<div class="bg-modal fade-in modal-content mx-auto mt-10 overflow-hidden p-4 shadow-xl sm:max-w-xl sm:w-full">
  <center><i class="fad fa-question fa-3x icon-primary"></i>
  <h3 class="font-bold mb-0">Are You Sure?</h3>
  <h4 class="text-subtitle">You want to remove (${container.Names[0]})</h4>
  </center>
  <div class="mb-2 card flex-wrap sm:flex justify-between p-2">
  <h4 class="text-subtitle mb-0 self-center">Remove Volumes</h4>
  <label class="switch">
  <input type="checkbox" id="removeVolumes_id">
  <span class="slider"></span>
  </label></div>
  <button data-id="${id}" onclick="javascript: removeContainer(this);">Remove</button>
  </div>`);
}

// Remove container.
function removeContainer(el) {
  let id = el.getAttribute("data-id");
  let removeVolumes = document.getElementById("removeVolumes_id").checked;
  fetch("/api/remove-container", {
    method: 'post',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: `{"removeVolumes" : ${removeVolumes} ,"_id" : "${id}"}`
  }).then(response => response.json()).then(json => {
    closeModal();
    getContainers().then(r => {
      // Show containers.
      showContainers();
    });
    getInfo().then(r => {
      showInfo();
    }).catch(e => { console.log(e); });
  }).catch(e => { closeModal(); });
}