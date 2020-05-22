import { initMap, refreshMarkers } from "./maps.js";
import { getPlaces, postPlace, getPlace, updatePlace, getTags } from "./api.js";
import { drawTagControls, drawTagList } from "./helpers.js";

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

    google.maps.event.addListener(map, "click", async e => {
        const latLng = e.latLng.lat() + ", " + e.latLng.lng();
        if (marker != "") marker.setMap(null);
        marker = new google.maps.Marker({
            position: e.latLng,
            map: map
        });
        document.querySelector(".addModal").setAttribute("data-method", "add");
        const fields = document.querySelectorAll(
            "div.addModal > div.modal-content > .item > input"
        );

        const tagsList = document.querySelector("div.tags");
        const tagControls = document.querySelector("div.tagControls");

        await drawTagList(tagsList);
        await drawTagControls(tagControls, tagsList);

        fields[0].value = "";
        fields[1].value = "";
        fields[3].value = "";

        toggleModal();

        const coordinatesField = (document.querySelector(
            'input[name="coordinates"]'
        ).value = latLng);
    });

    document.querySelector(".close-button").addEventListener("click", () => {
        if (marker != "") marker.setMap(null);
        toggleModal();
    });

    document
        .querySelector("button.addSubmit")
        .addEventListener("click", async () => {
            const fields = document.querySelectorAll(
                "div.addModal > div.modal-content > .item > input"
            );

            const tagButtons = document.querySelectorAll(
                "div.tags > button.tag-button"
            );
            const tags = [...tagButtons]
                .filter(tagButton => tagButton.dataset.enabled === "true")
                .map(tagButton => parseInt(tagButton.dataset.id));
            console.log("enabled tags", tags);

            const values = {
                [fields[0].name]: fields[0].value,
                [fields[1].name]: fields[1].value,
                [fields[2].name]: fields[2].value,
                [fields[3].name]: fields[3].value,
                tags
            };

            const method = document
                .querySelector(".addModal")
                .getAttribute("data-method");

            if (method === "add") {
                if (await postPlace(values)) {
                    toggleModal();

                    if (marker != "") marker.setMap(null);
                    const places = await getPlaces();
                    refreshMarkers(places);
                } else {
                    console.log("failure");
                }
            } else if (method === "edit") {
                const id = document
                    .querySelector(".addModal")
                    .getAttribute("data-id");

                if (await updatePlace(id, values)) {
                    toggleModal();

                    const places = await getPlaces();
                    refreshMarkers(places);
                } else {
                    console.log("failure to update");
                }

                console.log("edit");
            }
        });
};

document.addEventListener("DOMContentLoaded", app);

require("./modal.js");
