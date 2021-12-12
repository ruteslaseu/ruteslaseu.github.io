const list = document.querySelector(".list");
const grid = document.querySelector(".grid");

var request = new XMLHttpRequest();
request.open("GET", "/rutes.json", false);
request.send(null);
var json = JSON.parse(request.responseText);

var listInnerHTML = "";
for (let i = 0; i < json.rutes.length; i++) {
	const element = json.rutes[i];
	listInnerHTML += `<a href='${element.pagina}' style="text-decoration: none; color: inherit">`;
	listInnerHTML += `<div class='list_element' id='${element.dificultat.replace(
		" ",
		""
	)}' style="background-color: ${getColor(element)}; ${
		getColor(element) === "#F9A73E" ? "color: #2f2c48;" : ""
	}">`;
	listInnerHTML += `<h3 style='padding-top: 5px; padding-left: 5px;'>${element.nom}</h3>`;
	listInnerHTML += "<div class='list_data'>";
	listInnerHTML += `<p>Dificultat: ${element.dificultat}</p>`;
	listInnerHTML += `<p>Desnivell positiu: ${element.desnivell}m</p>`;
	listInnerHTML += `<p>Distància: ${element.distancia}km</p>`;
	listInnerHTML += "</div>";
	listInnerHTML += "</div>";
	listInnerHTML += "</a>";
}
list.innerHTML = listInnerHTML;

var gridInnerHTML = "";
for (let i = 0; i < json.rutes.length; i++) {
	const element = json.rutes[i];
	gridInnerHTML += `<div class='column' id='${element.dificultat.replace(
		" ",
		""
	)}'>`;
	gridInnerHTML += `<a href='${element.pagina}'>`;
	gridInnerHTML += `<img src="${
		element.imatge
	}" style="width:100%; border: 3px solid ${getColor(element)}; background-color: ${getColor(element)};">`;
	gridInnerHTML += "</a>";
	gridInnerHTML += `<div class="name" style="background: ${getColor(
		element
	)}; ${getColor(element) === "#F9A73E" ? "color: #2f2c48;" : ""}">${
		element.nom
	}</div>`;
	gridInnerHTML += `<div class="data">`;
	gridInnerHTML += `<p>${element.dificultat}</p>`;
	gridInnerHTML += `<p><i class="fas fa-angle-double-up"></i> ${element.desnivell}m</p>`;
	gridInnerHTML += `<p><i class="fas fa-ruler"></i> ${element.distancia}km</p>`;
	gridInnerHTML += `</div>`;
	gridInnerHTML += "</div>";
}
grid.innerHTML = gridInnerHTML;

function getColor(json) {
	switch (json.dificultat) {
		case "Molt Difícil":
			return "#BF212F";
		case "Difícil":
			return "#F9A73E";
		case "Moderada":
			return "#264B96";
		case "Fàcil":
			return "#0B8F49";
	}
	return "unset";
}
function getColorByIndex(index) {
	switch (index) {
		case 3:
			return "#BF212F";
		case 2:
			return "#F9A73E";
		case 1:
			return "#264B96";
		case 0:
			return "#0B8F49";
	}
	return "unset";
}
function getIndexName(index) {
	switch (index) {
		case 3:
			return "MoltDifícil";
		case 2:
			return "Difícil";
		case 1:
			return "Moderada";
		case 0:
			return "Fàcil";
	}
}

var difficultiesSelected = [true, true, true, true];

function clickDifficulty(index, id) {
	difficultiesSelected[index] = !difficultiesSelected[index];
	if (difficultiesSelected[index] === true) {
		document.querySelectorAll(`[id^='${id}']`)[0].style.background =
			getColorByIndex(index);
		document.querySelectorAll(`[id^='${id}']`)[1].style.background =
			getColorByIndex(index);

		var routes = document.querySelectorAll(`#${getIndexName(index)}`);
		for (let i = 0; i < routes.length; i++) {
			const element = routes[i];
			element.style.display = null;
		}
	} else {
		document.querySelectorAll(`[id^='${id}']`)[0].style.background = "gray";
		document.querySelectorAll(`[id^='${id}']`)[1].style.background = "gray";

		var routes = document.querySelectorAll(`#${getIndexName(index)}`);
		for (let i = 0; i < routes.length; i++) {
			const element = routes[i];
			element.style.display = "none";
		}
	}
}

var gridEnabled = true;
function clickDisplay(){
	gridEnabled ^= true;

	if(gridEnabled){
		document.getElementById(`displaySelector`).getElementsByTagName("p")[0].innerHTML = '<i class="fas fa-th-large"></i> Graella';
		
		document.querySelector(".grid").style.display = "inherit";
		document.querySelector(".list").style.display = "none";
	}else{
		document.getElementById(`displaySelector`).getElementsByTagName("p")[0].innerHTML = '<i class="fas fa-list-ul"></i> Llista';

		document.querySelector(".grid").style.display = "none";
		document.querySelector(".list").style.display = "inherit";
	}
}
window.onresize = window.onload = function() {
	if(this.innerWidth < 830){
		document.getElementById('displaySelector').style.display = "none";
		document.querySelector(".grid").style.display = null;
		document.querySelector(".list").style.display = null;
	}else{
		document.getElementById('displaySelector').style.display = "inherit";
		document.querySelector(".grid").style.display = (gridEnabled ? "inherit" : "none");
		document.querySelector(".list").style.display = (gridEnabled ? "none" : "inherit");
	}
}
