const list = document.querySelector(".list");
const grid = document.querySelector(".grid");

var request = new XMLHttpRequest();
request.open("GET", "/rutes.json", false);
request.send(null);
var json = JSON.parse(request.responseText);

var listInnerHTML = "";
for (let i = 0; i < json.rutes.length; i++) {
    const element = json.rutes[i];
    listInnerHTML += `<a href='${element.pagina}' style="text-decoration: none; color: inherit">`
    listInnerHTML +=    `<div class='list_element' style="background-color: ${getColor(element)}; ${getColor(element)==="#F9A73E"?"color: #2f2c48;":""}">`;
    listInnerHTML +=        `<h3 style='padding-top: 5px; padding-left: 5px;'>${element.nom}</h3>`;
    listInnerHTML +=        "<div class='list_data'>";
    listInnerHTML +=            `<p>Dificultat: ${element.dificultat}</p>`;
    listInnerHTML +=            `<p>Desnivell positiu: ${element.desnivell}m</p>`;
    listInnerHTML +=            `<p>Distància: ${element.distancia}km</p>`;
    listInnerHTML +=        "</div>";
    listInnerHTML +=    "</div>"
    listInnerHTML += "</a>";
}
list.innerHTML = listInnerHTML;

var gridInnerHTML = "";
for (let i = 0; i < json.rutes.length; i++) {
    const element = json.rutes[i];
    gridInnerHTML += "<div class='column'>";
    gridInnerHTML +=    `<a href='${element.pagina}'>`;
    gridInnerHTML +=        `<img src="${element.imatge}" style="width:100%">`;
    gridInnerHTML +=    "</a>";
    gridInnerHTML +=    `<div>${element.nom}</div>`;
    gridInnerHTML += "</div>";
}
grid.innerHTML = gridInnerHTML;

function getColor(json){
    switch(json.dificultat){
        case "Molt Difícil":
            return "#BF212F";
        case "Difícil":
            return "#F9A73E";
        case "Moderada":
            return "#264B96";
        case "Fàcil":
            return "#006F3C";
    }
    return "unset";
}