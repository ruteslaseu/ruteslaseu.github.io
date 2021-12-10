const card = document.querySelector(".card");
const header = document.querySelector(".header");
const download = document.querySelector(".info-card").querySelector(".links");
const variants = document.querySelector(".variants");

var request = new XMLHttpRequest();
request.open("GET", "/rutes.json", false);
request.send(null);
var json = JSON.parse(request.responseText);

function loadRoute(index, variant){
    var innerHTML = "";
    const element = json.rutes[index];
    
    document.title = `${element.nom} \u2013 Rutes BTT`;
    header.innerHTML = `<h2>${element.nom}</h2>`;
    if(element.variants.length > 1){
        header.innerHTML += `<p style="font-size: 20px; margin-bottom: 0;">Variant ${variant + 1}</p>`;
        var variantButtons = "";
        for (let i = 0; i < element.variants.length; i++) {
            variantButtons += `<a class="variant-button" role="button" onclick="loadRoute(${index}, ${i})"><p>Variant ${i + 1}</p></a>`
        }
        variants.innerHTML = variantButtons;
    }else{
        variants.style.display = "none";
    }

    innerHTML += element.variants[variant].gpx_embed;
    innerHTML += `<p><i class="far fa-calendar"></i> ${element.variants[variant].estació}</p>`;
    innerHTML += element.variants[variant].descripció1;
    innerHTML += "<div class='row'>"
    for (let i = 0; i < element.galeria.length; i++) {
        const image = element.galeria[i];
        innerHTML += "<div class='column'>";
        innerHTML += `<a href="${image}" data-lightbox="1"><img src="${image}" style="width:100%"></a>`;
        innerHTML += "</div>"
    }
    innerHTML += "</div>";
    innerHTML += element.variants[variant].descripció2;
    card.innerHTML = innerHTML;

    download.innerHTML = `<a href="${element.variants[0].gpx}"><button class="link-button"><img src="/assets/gpx-file-format-variant.png"></button></a>`;
}