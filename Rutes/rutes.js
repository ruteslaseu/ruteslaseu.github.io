const card = document.querySelector(".card");
const header = document.querySelector(".header");
const download = document.querySelector(".info-card").querySelector(".links");

var request = new XMLHttpRequest();
request.open("GET", "/rutes.json", false);
request.send(null);
var json = JSON.parse(request.responseText);

function loadRoute(index){
    var innerHTML = "";
    const element = json.rutes[index];
    
    document.title = `${element.nom} \u2013 Rutes BTT`;
    header.innerHTML = `<h2>${element.nom}</h2>`;

    innerHTML += element.gpx_embed;
    innerHTML += element.descripció1;
    innerHTML += "<div class='row'>"
    for (let i = 0; i < element.galeria.length; i++) {
        const image = element.galeria[i];
        innerHTML += "<div class='column'>";
        innerHTML += `<a href="${image}" data-lightbox="1"><img src="${image}" style="width:100%"></a>`;
        innerHTML += "</div>"
    }
    innerHTML += "</div>";
    innerHTML += element.descripció2;
    card.innerHTML = innerHTML;

    download.innerHTML = `<a href="${element.gpx}"><button class="link-button"><img src="/assets/gpx-file-format-variant.png"></button></a>`;
}