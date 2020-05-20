import { initMap, refreshMarkers } from "./maps.js";
import { getPlaces, postPlace, getPlace } from "./main.js";

let marker = "";
const addModal = document.querySelector(".modal");

const app = async () => {
    const items = await getPlaces();
    const map = await initMap(items);

    document
        .querySelector(".testbutton")
        .addEventListener("click", async () => {
            const places = await getPlaces();
            refreshMarkers(places);
        });

    google.maps.event.addListener(map, "click", e => {
        const latLng = e.latLng.lat() + ", " + e.latLng.lng();
        if (marker != "") marker.setMap(null);
        marker = new google.maps.Marker({
            position: e.latLng,
            map: map
        });

        toggleAddModal();

        const coordinatesField = (document.querySelector(
            'input[name="coordinates"]'
        ).value = latLng);
    });

    document
        .querySelector("button.addSubmit")
        .addEventListener("click", async () => {
            const fields = document.querySelectorAll(
                "div.addModal > div.modal-content > .item > input"
            );

            const values = {
                [fields[0].name]: fields[0].value,
                [fields[1].name]: fields[1].value,
                [fields[2].name]: fields[2].value,
                [fields[3].name]: fields[3].value
            };

            if (postPlace(values)) {
                toggleAddModal();

                if (marker != "") marker.setMap(null);
                const places = await getPlaces();
                refreshMarkers(places);
            } else {
                console.log("failure");
            }
        });

    console.log(await getPlace(1));
};

document.addEventListener("DOMContentLoaded", app);

require("./modal.js");
