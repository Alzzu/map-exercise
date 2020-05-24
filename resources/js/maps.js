import { getPlaces, deletePlace } from "./api.js";

import {
    drawEditTagControls,
    drawEditTagList,
    isPlaceOpen
} from "./helpers.js";

let map2;
let markers = [];

export const initMap = items => {
    map2 = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 60.995339758930285, lng: 24.467076726810678 },
        zoom: 8
    });

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

        const currentTime = moment();
        const times = place.hours.split("-");
        const firstTime = moment(times[0], "hh:mm");
        const secondTime = moment(times[1], "hh:mm");

        const open = isPlaceOpen(place.hours)
            ? "Place is open right now!"
            : "Place is closed";

        let tags = "";
        place.tags.map(tag => {
            tags += "<span>" + tag.label + " </span>";
        });
        document.querySelector(".place").innerHTML =
            "<h2 class='placeTitle'>" +
            place.title +
            "</h2><div class='placeTags'>" +
            tags +
            "</div><div class='placeDescription'>" +
            place.description +
            "</div><div class='placeHours'>" +
            place.hours +
            "</div><div class='placeIsOpen'>" +
            open +
            "</div><div class='placeControls'><button class='editButton button'>Edit</button><button class='deleteButton danger-button button'>Delete</button></div>";

        document.querySelector(".addModal").setAttribute("data-id", place.id);

        document
            .querySelector(".editButton")
            .addEventListener("click", async () => {
                document
                    .querySelector(".addModal")
                    .setAttribute("data-method", "edit");

                const fields = document.querySelectorAll(
                    "div.addModal > div.modal-content > .item > input"
                );

                fields[0].value = place.title;
                fields[1].value = place.description;
                fields[2].value = place.coordinates;
                fields[3].value = place.hours;
                const tagsList = document.querySelector("div.tags");
                const tagControls = document.querySelector("div.tagControls");

                await drawEditTagList(tagsList, place);
                await drawEditTagControls(tagControls, tagsList, place);

                toggleModal();
            });

        document
            .querySelector(".deleteButton")
            .addEventListener("click", async () => {
                await deletePlace(place.id);

                const places = await getPlaces();
                refreshMarkers(places);
            });
    });

    markers.push(marker);
};

export const refreshMarkers = places => {
    if (markers.length != 0) markers.map(marker => marker.setMap(null));
    markers = [];

    places.coordinates.map(item => {
        addMarker(item, map2, places.places);
    });
};
