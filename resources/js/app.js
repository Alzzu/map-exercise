import { initMap, refreshMarkers } from "./maps.js";
import { getPlaces, postPlace, getPlace, updatePlace, getTags } from "./api.js";

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

        const tags = await getTags();
        let tagElements = "";
        tags.map(tag => {
            tagElements +=
                "<button class='tag-button' data-id=" +
                tag.id +
                " data-enabled='false'>" +
                tag.label +
                "</button>";
        });

        tagsList.innerHTML = "<label>Tags</label>" + tagElements;

        const buttons = document.querySelectorAll(
            "div.tags > button.tag-button"
        );

        [...buttons].map(button => {
            button.addEventListener("click", () => {
                if (button.dataset.enabled === "false") {
                    button.setAttribute("data-enabled", "true");
                    button.style.borderColor = "green";
                } else {
                    button.setAttribute("data-enabled", "false");
                    button.style.borderColor = "#000";
                }
            });
        });

        fields[0].value = "";
        fields[1].value = "";
        fields[3].value = "";

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
                    toggleAddModal();

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
                    toggleAddModal();

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
