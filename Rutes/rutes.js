const card = document.querySelector(".card");
const header = document.querySelector(".header");
const download = document.querySelector(".info-card").querySelector(".links");
const variants = document.querySelector(".variants");

var request = new XMLHttpRequest();
request.open("GET", "/rutes.json", false);
request.send(null);
var json = JSON.parse(request.responseText);

function loadRoute(referenceName, variant) {
	var innerHTML = "";

	var index = json.rutes.findIndex(function(item, i){
		return item.referenceName === referenceName
	});
	const element = json.rutes[index];

	document.title = `${element.nom} \u2013 Rutes BTT`;
	header.innerHTML = `<h2>${element.nom}</h2>`;
	if (element.variants.length > 1) {
		header.innerHTML += `<p style="font-size: 20px; margin-bottom: 0;">Variant ${
			variant + 1
		}</p>`;
		var variantButtons = "";
		for (let i = 0; i < element.variants.length; i++) {
			variantButtons += `<a class="variant-button" role="button" onclick="loadVariant(${i})"><p>Variant ${
				i + 1
			}</p></a>`;
		}
		variants.innerHTML = variantButtons;
	} else {
		variants.style.display = "none";
	}

	innerHTML += element.variants[variant].gpx_embed;
	innerHTML += "<div class='route-data'>";
	innerHTML += `<p title="Estacions"><i class="far fa-calendar"></i> ${element.variants[variant].estació}</p>`;
	innerHTML += `<p title="Circular"><i class="fas fa-undo-alt"></i> ${element.variants[variant].circular}</p>`;
	//Average: 13km/h
	innerHTML += `<p title="Duració (Només temps sobre rodes)"><i class="far fa-clock"></i> ${hoursToHHMM(
		element.variants[variant].temps
	)}</p>`;
	innerHTML += "</div>";
	innerHTML += `<p>${element.variants[variant].descripció1}</p>`;
	innerHTML += "<div class='row'>";
	for (let i = 0; i < element.galeria.length; i++) {
		const image = element.galeria[i];
		innerHTML += "<div class='column'>";
		innerHTML += `<a href="${image}" data-lightbox="1"><img src="${image}" style="width:100%"></a>`;
		innerHTML += "</div>";
	}
	innerHTML += "</div>";
	innerHTML += `<p>${element.variants[variant].descripció2}</p>`;
	card.innerHTML = innerHTML;

	download.innerHTML += `<a href="${element.variants[variant].gpx}"><button class="link-button"><img src="/assets/gpx-file-format-variant.png"></button></a>`;
	download.innerHTML += `<a href="${element.variants[variant].wikiloc}" target="_Blank"><button class="link-button"><img src="/assets/wikiloc-icon.png"></button></a>`;
}

function loadVariant(variant){
	var path = window.location.pathname;
	var page = path.split("/")[2];
	loadRoute(page, variant);
}

function hoursToHHMM(hours) {
	var hh = Math.floor(Math.abs(hours));
	var mm = Math.floor((Math.abs(hours) * 60) % 60);
	return (hh < 10 ? "0" : "") + hh + "h " + (mm < 10 ? "0" : "") + mm + "'";
}
