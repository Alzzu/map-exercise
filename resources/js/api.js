const setList = (element, content) => {
    document.querySelector(element).innerHTML = content;
};

export const getPlaces = async () => {
    return new Promise((resolve, reject) => {
        let items = [];

        const placesRequest = new XMLHttpRequest();
        placesRequest.open("GET", "api/places");
        placesRequest.onload = () => {
            if (placesRequest.status === 200) {
                let buffer = "";
                items = JSON.parse(placesRequest.responseText).map(item => ({
                    id: "" + item.id,
                    lat: parseFloat(item.coordinates.split(",")[0]),
                    lng: parseFloat(item.coordinates.split(",")[1].substr(1))
                }));
                resolve({
                    places: JSON.parse(placesRequest.responseText),
                    coordinates: items
                });
            } else {
                reject(placesRequest.status());
            }
        };
        placesRequest.send();
    });
};

export const postPlace = async data => {
    console.log(data);
    return new Promise((resolve, reject) => {
        const postPlaceRequest = new XMLHttpRequest();
        postPlaceRequest.open("POST", "api/places");
        postPlaceRequest.setRequestHeader(
            "X-CSRF-TOKEN",
            document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content")
        );
        postPlaceRequest.setRequestHeader("Content-Type", "application/json");
        postPlaceRequest.onload = () => {
            if (postPlaceRequest.status === 200) {
                console.log(postPlaceRequest.statusText);
                resolve(true);
            } else {
                console.log(postPlaceRequest.status);
                reject(false);
            }
        };
        postPlaceRequest.send(JSON.stringify(data));
    });
};

export const updatePlace = async (id, data) => {
    return new Promise((resolve, reject) => {
        const updatePlaceRequest = new XMLHttpRequest();
        updatePlaceRequest.open("PUT", "api/places/" + id);
        updatePlaceRequest.setRequestHeader("Content-Type", "application/json");
        updatePlaceRequest.onload = () => {
            if (updatePlaceRequest.status === 200) {
                const place = JSON.parse(updatePlaceRequest.responseText);
                console.log("update", place);
                resolve(place);
            } else {
                reject(updatePlaceRequest.status());
            }
        };
        updatePlaceRequest.send(JSON.stringify(data));
    });
};

export const getPlace = async id => {
    return new Promise((resolve, reject) => {
        const getPlaceRequest = new XMLHttpRequest();
        getPlaceRequest.open("GET", "api/places/" + id);
        getPlaceRequest.onload = () => {
            if (getPlaceRequest.status === 200) {
                const place = JSON.parse(getPlaceRequest.responseText);
                console.log(place);
                resolve(place);
            } else {
                reject(getPlaceRequest.status());
            }
        };
        getPlaceRequest.send();
    });
};

export const deletePlace = async id => {
    return new Promise((resolve, reject) => {
        const deletePlaceRequest = new XMLHttpRequest();
        deletePlaceRequest.open("DELETE", "api/places/" + id);
        deletePlaceRequest.onload = () => {
            if (deletePlaceRequest.status === 200) {
                resolve(deletePlaceRequest.responseText);
            } else {
                reject(deletePlaceRequest.status);
            }
        };
        deletePlaceRequest.send();
    });
};

export const getTags = async () => {
    return new Promise((resolve, reject) => {
        const getTagsRequest = new XMLHttpRequest();
        getTagsRequest.open("GET", "api/tags");
        getTagsRequest.onload = () => {
            if (getTagsRequest.status === 200) {
                resolve(JSON.parse(getTagsRequest.responseText));
            } else {
                reject(getTagsRequest.status());
            }
        };
        getTagsRequest.send();
    });
};

export const postTag = async data => {
    console.log(data);
    return new Promise((resolve, reject) => {
        const postTagRequest = new XMLHttpRequest();
        postTagRequest.open("POST", "api/tags");
        postTagRequest.setRequestHeader(
            "X-CSRF-TOKEN",
            document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content")
        );
        postTagRequest.setRequestHeader("Content-Type", "application/json");
        postTagRequest.onload = () => {
            if (postTagRequest.status === 200) {
                resolve(true);
            } else {
                reject(false);
            }
        };
        postTagRequest.send(JSON.stringify(data));
    });
};
