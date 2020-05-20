let map2;
let markers = [];

const initMap = items => {
    map2 = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 60.995339758930285, lng: 24.467076726810678 },
        zoom: 8
    });
    console.log(items);

    refreshMarkers(items);

    return map2;
};

const addMarker = (location, map, places) => {
    const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        label: location.id
    });

    marker.addListener("click", e => {
        const place = places.find(place => place.id == marker.label);
        document.querySelector(".place").innerHTML =
            "<h2>" +
            place.title +
            "</h2><div>" +
            place.description +
            "</div><div>" +
            place.hours +
            "</div><button class='editButton'>Edit</button>";

        document.querySelector(".addModal").setAttribute("data-id", place.id);

        document.querySelector(".editButton").addEventListener("click", () => {
            document
                .querySelector(".addModal")
                .setAttribute("data-method", "edit");

            toggleAddModal();

            const fields = document.querySelectorAll(
                "div.addModal > div.modal-content > .item > input"
            );

            fields[0].value = place.title;
            fields[1].value = place.description;
            fields[2].value = place.coordinates;
            fields[3].value = place.hours;
        });
    });

    markers.push(marker);
};

const refreshMarkers = places => {
    console.log("asd");
    if (markers.length != 0) markers.map(marker => marker.setMap(null));
    markers = [];
    console.log("refresh", places);

    places.coordinates.map(item => {
        console.log("adding marker");
        addMarker(item, map2, places.places);
    });
};

module.exports = { initMap, refreshMarkers };
