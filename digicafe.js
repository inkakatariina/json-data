// Hakee JSON-tiedoston GitHubista
fetch('https://raw.githubusercontent.com/inkakatariina/json-data/a02b8187e24ccbcce8a89a419cd0221b4515ec99/data.json')
    .then(function (response) {
        if (!response.ok) {
            throw new Error("Verkkovirhe: " + response.status);
        }
        return response.json(); // Muunnetaan vastaus JSON-muotoon
    })
    .then(function (data) {
        // Tarkistetaan, että data sisältää odotetut kentät
        if (data.yritys && data.yhteystiedot && data.tuotteet && data.henkilokunta) {
            kerro(data); // Välitetään koko JSON-objekti
        } else {
            document.getElementById("vastaus").innerHTML =
                "<p>JSON-tiedosto ei sisällä odotettuja tietoja.</p>";
        }
    })
    .catch(function (error) {
        document.getElementById("vastaus").innerHTML =
            "<p>Tietoa ei pystytä hakemaan: " + error.message + "</p>";
        console.error("Virhe JSON-datan haussa:", error);
    });

// Funktio, joka käsittelee ja tulostaa JSON-datan
function kerro(data) {
    // Tarkistetaan, että tuotteet ja henkilökuntatiedot ovat taulukoita
    if (!Array.isArray(data.tuotteet) || !Array.isArray(data.henkilokunta)) {
        document.getElementById("vastaus").innerHTML =
            "<p>Tuotteet tai henkilökuntatiedot ovat väärässä muodossa.</p>";
        return;
    }

    // Rakennetaan HTML sisällön näyttämiseksi
    let html = `
        <h2>${data.yritys}</h2>
        <p><strong>Yhteystiedot:</strong></p>
        <ul>
            <li><strong>Osoite:</strong> ${data.yhteystiedot.osoite}</li>
            <li><strong>Puhelin:</strong> ${data.yhteystiedot.puhelin}</li>
            <li><strong>Sähköposti:</strong> ${data.yhteystiedot.email}</li>
        </ul>
        <p><strong>Tuotteet:</strong></p>
        <ul>
            ${data.tuotteet.map(tuote => `<li>${tuote}</li>`).join('')}
        </ul>
        <p><strong>Henkilökunta:</strong></p>
        <ul>
            ${data.henkilokunta.map(henkilo => `<li>${henkilo.nimi}, ${henkilo.titteli}</li>`).join('')}
        </ul>
    `;

    // Päivitetään sisältö HTML-elementtiin
    document.getElementById("vastaus").innerHTML = html;
}
