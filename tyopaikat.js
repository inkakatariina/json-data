fetch('https://gis.vantaa.fi/rest/tyopaikat/v1/Tekninen%20ala')

// Muunnetaan vastaus JSON muotoon
 .then(function (response) {
return response.json();
})
// Käsitellään muunnettu (eli JSON muotoinen) vastaus
.then(function (responseJson) {
    // Kutsutaan funktiota ja välitetään sille json-vastaus 
     kerro(responseJson);
 
})
// Jos tuli jokin virhe
.catch(function (error) {
document.getElementById("vastaus").innerHTML =
"<p>Tietoa ei pystytä hakemaan</p>";
console.error("Virhe JSON-datan haussa:", error);
});

// tyopaikat.js

function kerro(data) {
    var teksti = ""; // Kerätään tulostettava tieto tähän muuttujaan

   // Käytetään perinteistä for-silmukkaa
   for (let i = 0; i < data.length; i++) {
    // Käytetään i-indeksiä työpaikan tietojen hakemiseen
    let tyopaikka = data[i];

    // Näytetään ammattiala ja lukumäärä
    teksti += "<p>" + data[i].tyotehtava + "</p>";
    teksti += "<p>Osoite: " + data[i].osoite + "</p>";
    // Lisätään linkki työpaikkoihin
    teksti += "<p>Linkki<a href='" + data[i].linkki + "'> " + data[i].linkki + "</a></p>";
}

    // Tulostus sivulle
    document.getElementById("vastaus").innerHTML = teksti;
}

// Kutsutaan funktiota ja välitetään sille tyopaikat-data
kerro(tyopaikat);
