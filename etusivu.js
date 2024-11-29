fetch('https://jaakkola.github.io/json/digitekniikat.json?nocache=' + new Date().getTime())


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

function kerro(data){
// muuttuja teksti, johon tulostettava tieto kerätään
var teksti=""; // Kerätään tulostettava tieto tähän muuttujaan

// Tulostetaan otsikko
teksti = "<h1>"+data.otsikko+"</h1>";
 // Tulostetaan kuvaus
teksti = teksti + "<p>" + data.kuvaus + "</p>";
 // Lisätään kuva
teksti = teksti + "<p><img src='" + data.kuva + "' alt='kuva' ></p>";
// Opintojakson tiedot
teksti = teksti + "<h3>Opintojakso: " + data.opintojakso.nimi + " " + data.opintojakso.tunnus + " " +data.opintojakso.opintopisteet+ "</h3>";

// taulukon sisältö listaelementtiin
teksti =teksti + "<ul>";
// taulukon käsittely for-lauseessa
for (var i=0; i<data.sisalto.length; i++) {
    teksti = teksti + "<li>" + data.sisalto[i] + "</li>";
}

//objektielementti käsittely
teksti = teksti + "<h3>Linkit</h3><ul>";
for(var i=0; i<data.tekniikat.length; i++){
    teksti = teksti + "<li>" + data.tekniikat[i].aihe + "<a href='"+data.tekniikat[i].linkki+"'> " +data.tekniikat[i].linkki+"</a></li>";
}

//listaelemntti kiinni
teksti = teksti + "</ul>"


// tulostus sivulle
document.getElementById("vastaus").innerHTML=teksti;
}

fetch('https://raw.githubusercontent.com/inkakatariina/json-data/main/data.json')
    // Muunnetaan vastaus JSON-muotoon
    .then(function (response) {
        return response.json(); // Palautetaan JSON-muotoinen vastaus
    })
    // Käsitellään muunnettu (eli JSON-muotoinen) vastaus
    .then(function (responseJson) {
        // Kutsutaan funktiota ja välitetään sille JSON-vastaus
        naytaData(responseJson);
    })
    // Jos tuli jokin virhe
    .catch(function (error) {
        document.getElementById("vastaus").innerHTML =
            "<p>Tietoa ei pystytä hakemaan</p>";
        console.error("Virhe JSON-datan haussa:", error); // Kirjataan virhe konsoliin
    });

// Esimerkkifunktio datan näyttämiseksi
function naytaData(data) {
    // Määritellään muuttuja, johon kootaan HTML-sisältö
     // Näytetään otsikko
    let teksti = "<h1>" + data.otsikko + "</h1>";
    // Näytetään kuvaus
    teksti += "<p>" + data.kuvaus + "</p>";
        // Näytetään kuva
    teksti += "<p><img src='" + data.kuva + "' alt='kuva'></p>";

// Näytetään opintojakson tiedot
teksti += "<h3>Opintojakso: " + data.opintojakso.nimi + "</h3>";
teksti += "<p>Tunnus: " + data.opintojakso.tunnus + "</p>";
teksti += "<p>Opintopisteet: " + data.opintojakso.opintopisteet + "</p>";

// Näytetään sisalto-taulukko listana
teksti += "<h3>Sisältö:</h3><ul>";
for (let i = 0; i < data.sisalto.length; i++) {
    teksti += "<li>" + data.sisalto[i] + "</li>";
}
teksti += "</ul>";

// Näytetään tekniikat-taulukko ja niiden linkit
teksti += "<h3>Tekniikat:</h3>";
for (let i = 0; i < data.tekniikat.length; i++) {
    teksti += "<p><a href='" + data.tekniikat[i].linkki + "' target='_blank'>" + data.tekniikat[i].aihe + "</a></p>";
}

    // Tulostetaan koottu sisältö HTML-sivulle
    document.getElementById("vastaus").innerHTML = teksti;
}
