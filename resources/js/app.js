import { initMap, refreshMarkers } from "./maps.js";
import { getPlaces, postPlace, updatePlace } from "./api.js";
import {
    drawTagControls,
    drawTagList,
    drawFilterTagList,
    isPlaceOpen
} from "./helpers.js";

let marker = "";
const addModal = document.querySelector(".modal");

const app = async () => {
    const items = await getPlaces();
    const map = await initMap(items);

    //filters

    const tagFiltersSelected = () => {
        const tagFilter = document.querySelectorAll(".tagFilter > .tag-button");
        let tagList = [];

        [...tagFilter].map(tag => {
            if (tag.dataset.enabled == "true") {
                tagList.push(parseInt(tag.dataset.id));
            }
        });

        return tagList;
    };

    const filterCoordinates = (data, filtered) => {
        let array = [];
        filtered.map(place => {
            array.push(place.id);
        });

        const coordinates = data.coordinates.filter(coordinate =>
            array.includes(parseInt(coordinate.id))
        );

        return coordinates;
    };

    const performSearch = data => {
        const openCheckbox = document.querySelector(".open");
        const searchInput = document.querySelector(".search");
        if (
            searchInput.value != "" &&
            openCheckbox.checked &&
            tagFiltersSelected().length != 0
        ) {
            const searchFilter = data.places.filter(place =>
                place.title
                    .toLowerCase()
                    .includes(searchInput.value.toLowerCase())
            );

            const isOpenFilter = searchFilter.filter(place =>
                isPlaceOpen(place.hours)
            );

            const tags = tagFiltersSelected();
            const filtered = isOpenFilter.filter(place =>
                place.tags.some(({ id }) => tags.includes(id))
            );

            const coordinates = filterCoordinates(data, filtered);

            refreshMarkers({ places: filtered, coordinates });
        } else if (
            searchInput.value != "" &&
            openCheckbox.checked &&
            tagFiltersSelected().length === 0
        ) {
            const searchFilter = data.places.filter(place =>
                place.title
                    .toLowerCase()
                    .includes(searchInput.value.toLowerCase())
            );

            const filtered = searchFilter.filter(place =>
                isPlaceOpen(place.hours)
            );

            const coordinates = filterCoordinates(data, filtered);

            refreshMarkers({ places: filtered, coordinates });
        } else if (
            tagFiltersSelected().length != 0 &&
            !openCheckbox.checked &&
            searchInput.value === ""
        ) {
            const tags = tagFiltersSelected();
            const filtered = data.places.filter(place =>
                place.tags.some(({ id }) => tags.includes(id))
            );

            const coordinates = filterCoordinates(data, filtered);

            refreshMarkers({ places: filtered, coordinates });
        } else if (
            searchInput.value != "" &&
            !openCheckbox.checked &&
            tagFiltersSelected().length != 0
        ) {
            const searchFilter = data.places.filter(place =>
                place.title
                    .toLowerCase()
                    .includes(searchInput.value.toLowerCase())
            );

            const tags = tagFiltersSelected();
            const filtered = searchFilter.filter(place =>
                place.tags.some(({ id }) => tags.includes(id))
            );

            const coordinates = filterCoordinates(data, filtered);

            refreshMarkers({ places: filtered, coordinates });
        } else if (
            searchInput.value != "" &&
            !openCheckbox.checked &&
            tagFiltersSelected().length === 0
        ) {
            const filtered = data.places.filter(place =>
                place.title
                    .toLowerCase()
                    .includes(searchInput.value.toLowerCase())
            );

            const coordinates = filterCoordinates(data, filtered);

            refreshMarkers({ places: filtered, coordinates });
        } else if (
            searchInput.value == "" &&
            openCheckbox.checked &&
            tagFiltersSelected().length === 0
        ) {
            const filtered = data.places.filter(place =>
                isPlaceOpen(place.hours)
            );

            const coordinates = filterCoordinates(data, filtered);

            refreshMarkers({ places: filtered, coordinates });
        } else {
            refreshMarkers(data);
        }
    };

    const tagFilter = document.querySelector(".tagFilter");
    await drawFilterTagList(tagFilter, async () =>
        performSearch(await getPlaces())
    );

    const searchInput = document.querySelector(".search");
    searchInput.addEventListener("focus", async () => {
        const request = await getPlaces();
        searchInput.addEventListener("input", () => {
            performSearch(request);
        });
    });

    const openCheckbox = document.querySelector(".open");
    openCheckbox.addEventListener("change", async () => {
        const request = await getPlaces();
        tagFiltersSelected();
        performSearch(request);
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
            }
        });
};

document.addEventListener("DOMContentLoaded", app);

require("./modal.js");
