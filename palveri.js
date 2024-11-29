// Hakee JSON-tiedoston GitHubista
fetch('https://raw.githubusercontent.com/inkakatariina/json-data/refs/heads/main/palveri.json')
    .then(function (response) {
        if (!response.ok) {
            throw new Error("Verkkovirhe: " + response.status);
        }
        return response.json(); // Muunnetaan vastaus JSON-muotoon
    })
    .then(function (data) {
        // Oletetaan, että JSON-tiedostossa on "palaveri"-objekti
        if (data.palaveri) {
            kerro(data.palaveri); // Välitetään "palaveri"-objekti
        } else {
            document.getElementById("vastaus").innerHTML =
                "<p>JSON-tiedosto ei sisällä palaverin tietoja.</p>";
        }
    })
    .catch(function (error) {
        document.getElementById("vastaus").innerHTML =
            "<p>Tietoa ei pystytä hakemaan: " + error.message + "</p>";
        console.error("Virhe JSON-datan haussa:", error);
    });

// Funktio, joka käsittelee ja tulostaa JSON-datan
function kerro(palaveri) {
    // Tarkistetaan, että osallistujat on taulukko
    if (!Array.isArray(palaveri.osallistujat)) {
        document.getElementById("vastaus").innerHTML =
            "<p>Osallistujat-tiedot puuttuvat tai ovat väärässä muodossa.</p>";
        return;
    }

    // Rakennetaan HTML sisällön näyttämiseksi
    let html = `
        <p><strong>Aihe:</strong> ${palaveri.aihe || "Ei määritelty"}</p>
        <p><strong>Osallistujien lukumäärä:</strong> ${palaveri.osallistujienLukumaara || "Ei määritelty"}</p>
        <p><strong>Paikka:</strong> ${palaveri.paikka || "Ei määritelty"}</p>
        <p><strong>Alkamisajankohta:</strong> ${palaveri.alkaminen ? new Date(palaveri.alkaminen).toLocaleString() : "Ei määritelty"}</p>
        <p><strong>Kesto:</strong> ${palaveri.kesto || "Ei määritelty"}</p>
        <p><strong>Osallistujat:</strong></p>
        <ul>
            ${palaveri.osallistujat.map(nimi => `<li>${nimi}</li>`).join('')}
        </ul>
    `;

    // Päivitetään sisältö HTML-elementtiin
    document.getElementById("vastaus").innerHTML = html;
}
