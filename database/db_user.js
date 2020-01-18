// Tiedosto jossa hoidetaan käyttäjiin liittyvä tietokannan muokkaaminen
// Querystring luodaan turvallisesti käyttäen queryparametreja
// Varsinaisen haun tekee tiedostosta potgresdriver.js löytyvä
// executeQuery -funktio, jota kutsutaan täältä
const postgresdriver = require('./postgresdriver');

// Funktio joka hakee kannasta käyttäjän id:n, nimen sekä
// salasana hashin
module.exports.getUserAndPassword = (userData) => {
    // Ensin tulee luoda queryString, jossa query parametrit on merkattu
    // merkinnällä $<numero>, jotta PostgreSQL kanta tietää mikä osa querysta
    // on querya ja mikä osa muuttujia. Näin estetään SQL injektiot
    const queryString = `
        SELECT user_id, username, password_hash
        FROM public.account
        WHERE username = $1;
    `;
    // SQL parametrit annetaan arrayna, jossa järjestyksessä on väliä
    // Querystringissä parametrin numero viittaa tiettyyn alkioon arrayssa
    // jarjestyksen mukaan. Esim. $1 viittaa parametri arrayn ensimmäiseen alkioon
    const sqlParams = [userData.username];

    return postgresdriver.executeQuery(queryString, sqlParams).then((res) => {
        // Jos tietokannasta palautuu jotain (eli res.length > 0), niin tämä funktio
        // palauttaa siitä ensimmäisen alkion, mutta jos kannasta ei löydy mitään niin
        // sitten palautetaan pelkkä null
        console.log(res)
        return res.length > 0 ? res[0] : null;
    })
}