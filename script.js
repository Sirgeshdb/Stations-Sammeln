let standortMarker = null;
const map = L.map('map').setView([52.37,9.73],13);

L.tileLayer(

'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

{

maxZoom:19

}

).addTo(map);
fetch("punkte.geojson")
.then(response => response.json())
.then(data => {

L.geoJSON(data).addTo(map);

});
navigator.geolocation.watchPosition(function(position) {

    // GPS-Daten holen
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;


    // Wenn es den Marker noch nicht gibt -> erstellen
    if (standortMarker === null) {

        standortMarker = L.marker([lat, lon])
            .addTo(map)
            .bindPopup("Mein Standort");

        map.setView([lat, lon], 16);

    } 
    
    // Wenn Marker schon da ist -> verschieben
    else {

        standortMarker.setLatLng([lat, lon]);

    }


},
function(error) {

    alert("GPS Fehler: " + error.message);

},
{
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 10000
});

let letzterPunkt=null;

let strecke=0;

if(letzterPunkt){

strecke+=map.distance(

letzterPunkt,

[lat,lon]

);

}

letzterPunkt=[lat,lon];

if(abstand<20){

marker.erreicht=true;

}
let punktSumme = 0;
if (!marker.erreicht) {

    marker.erreicht = true;

    punktSumme += marker.wert;

}

let gesamtPunkte = punktSumme * (strecke / 1000);

document.getElementById("punkte").innerHTML =
gesamtPunkte.toFixed(1);

document.getElementById("distanz").innerHTML =
(strecke / 1000).toFixed(2) + " km";
localStorage.setItem("strecke", strecke);
localStorage.setItem("punktSumme", punktSumme);

strecke = Number(localStorage.getItem("strecke")) || 0;
punktSumme = Number(localStorage.getItem("punktSumme")) || 0;

document.getElementById("reset").onclick = function(){

    if (standortMarker !== null) {
        map.removeLayer(standortMarker);
        standortMarker = null;
    }

    letzterPunkt = null;

    strecke = 0;
    punktSumme = 0;
    gesamtPunkte = 0;

    localStorage.clear();

    document.getElementById("distanz").textContent = "0 km";
    document.getElementById("punkte").textContent = "0";

    map.setView([52.37, 9.73], 13);

};