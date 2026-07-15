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
navigator.geolocation.watchPosition(position=>{

const lat=position.coords.latitude;

const lon=position.coords.longitude;

console.log(lat,lon);

});