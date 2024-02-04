mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
container: "map", // container ID
style: "mapbox://styles/mapbox/streets-v12",
center: listing.geometry, // starting position [lng, lat]
zoom: 5, // starting zoom
});


const marker1 = new mapboxgl.Marker({color:"red"})
.setLngLat(listing.geometry).
setPopup(new mapboxgl.Popup({offset:25})
.setHTML(
    `<h4>${listing.location}</h4><p>exact location  provided after booling </p>`
    )) 
.addTo(map);

