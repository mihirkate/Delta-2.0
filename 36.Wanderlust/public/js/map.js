try {
  mapboxgl.accessToken = mapToken;

  if (listing && listing.geometry && listing.geometry.coordinates) {
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v12",
      center: listing.geometry.coordinates, // starting position [lng, lat]
      zoom: 15, // starting zoom
    });

    console.log("This are ", listing.geometry.coordinates);

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
  }
} catch (err) {
  console.error("An error occurred:", err);
  throw new Error("Please fill the details carefully!");
}
