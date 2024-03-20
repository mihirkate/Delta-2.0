/* mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12",
  center: listing.geometry, // starting position [lng, lat]
  zoom: 5, // starting zoom
});

const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }))
  .setHTML("<h1>Hello world !!!!</h1>")
  .addToMap(map); */

/*   mapboxgl.accessToken = mapToken;
  console.log(mapToken);

  if (listing && listing.geometry && listing.geometry.coordinates) {
    const map = new mapboxgl.Map({
      container: "map",
      center: listing.geometry.coordinates,
      zoom: 12,
    });

    const marker = new mapboxgl.Marker({ color: "red" })
      .setLngLat(listing.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h4>${listing.location}</h4>`
        )
      )
      .addTo(map);
  } else {
    throw new Error("Please fill the details carefully!");
  } */
  
mapboxgl.accessToken = mapToken;

if (!mapboxgl.accessToken) {
  console.error(
    "Mapbox access token is missing. Please provide a valid access token."
  );
} else if (!listing || !listing.geometry || !listing.geometry.coordinates) {
  console.error(
    "Listing data is missing or incomplete. Please check the provided JSON data."
  );
} else {
  console.log("Listing data:", listing);

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: listing.geometry.coordinates,
    zoom: 12,
  });

  const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h4>${listing.title}</h4><p>${listing.description}</p>`
      )
    )
    .addTo(map);
}

