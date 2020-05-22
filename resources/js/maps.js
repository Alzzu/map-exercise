import { getTags } from "./api.js";

let map2;
let markers = [];

export const initMap = items => {
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

        document
            .querySelector(".editButton")
            .addEventListener("click", async () => {
                document
                    .querySelector(".addModal")
                    .setAttribute("data-method", "edit");

                toggleModal();

                const fields = document.querySelectorAll(
                    "div.addModal > div.modal-content > .item > input"
                );

                fields[0].value = place.title;
                fields[1].value = place.description;
                fields[2].value = place.coordinates;
                fields[3].value = place.hours;

                const allTags = await getTags();

                const array = [];
                if (place.tags) {
                    place.tags.map(tag => {
                        array.push(tag.id);
                    });
                }

                let tagElements = "";
                allTags.map(tag => {
                    const enabled = array.includes(tag.id) ? "true" : "false";
                    tagElements +=
                        "<button class='tag-button' data-id=" +
                        tag.id +
                        " data-enabled=" +
                        enabled +
                        ">" +
                        tag.label +
                        "</button>";
                });

                document.querySelector("div.tags").innerHTML =
                    "<label>Tags</label>" + tagElements;

                const buttons = document.querySelectorAll(
                    "div.tags > button.tag-button"
                );

                [...buttons].map(button => {
                    if (button.dataset.enabled === "true") {
                        button.style.borderColor = "green";
                    } else {
                        button.style.borderColor = "#000";
                    }

                    button.addEventListener("click", () => {
                        console.log("click");
                        if (button.dataset.enabled === "false") {
                            button.setAttribute("data-enabled", "true");
                            button.style.borderColor = "green";
                        } else {
                            button.setAttribute("data-enabled", "false");
                            button.style.borderColor = "#000";
                        }
                    });
                });
            });
    });

    markers.push(marker);
};

export const refreshMarkers = places => {
    console.log("asd");
    if (markers.length != 0) markers.map(marker => marker.setMap(null));
    markers = [];
    console.log("refresh", places);

    places.coordinates.map(item => {
        console.log("adding marker");
        addMarker(item, map2, places.places);
    });
};
