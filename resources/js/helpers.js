import { getTags, postTag, getPlaces } from "./api.js";

export const drawTagControls = (element, tagList) => {
    element.innerHTML =
        "<button class='add-tag-button'>+</button><input class='newtag-input' name='newtag' type='text' style='display: none;'>";

    const addTagButton = element.querySelector(".add-tag-button");
    addTagButton.addEventListener("click", () => {
        const newTagInput = element.querySelector(".newtag-input");
        addTagButton.style.display = "none";
        newTagInput.style.display = "inline-block";
        newTagInput.focus();

        newTagInput.onkeydown = async e => {
            if (e.key === "Enter") {
                await postTag({ label: newTagInput.value });
                await drawTagList(tagList);
                await drawTagControls(element, tagList);

                addTagButton.style.display = "inline-block";
                newTagInput.style.display = "none";
            }
        };
    });
};

export const drawTagList = async element => {
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

    element.innerHTML = "<label>Tags</label>" + tagElements;

    const buttons = element.querySelectorAll(".tag-button");

    [...buttons].map(button => {
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
    }, false);
};

export const drawFilterTagList = async (element, callback) => {
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

    element.innerHTML = tagElements;

    const buttons = element.querySelectorAll(".tag-button");

    [...buttons].map(button => {
        button.addEventListener("click", () => {
            if (button.dataset.enabled === "false") {
                button.setAttribute("data-enabled", "true");
                button.style.borderColor = "green";
            } else {
                button.setAttribute("data-enabled", "false");
                button.style.borderColor = "#000";
            }

            callback();
        });
    }, false);
};

export const drawEditTagControls = (element, tagList, place) => {
    element.innerHTML =
        "<button class='add-tag-button'>+</button><input class='newtag-input' name='newtag' type='text' style='display: none;'>";

    const addTagButton = element.querySelector(".add-tag-button");
    addTagButton.addEventListener("click", () => {
        const newTagInput = element.querySelector(".newtag-input");
        addTagButton.style.display = "none";
        newTagInput.style.display = "inline-block";
        newTagInput.focus();

        newTagInput.onkeydown = async e => {
            if (e.key === "Enter") {
                await postTag({ label: newTagInput.value });
                await drawEditTagList(tagList, place);
                await drawEditTagControls(element, tagList, place);

                addTagButton.style.display = "inline-block";
                newTagInput.style.display = "none";
            }
        };
    });
};

export const drawEditTagList = async (element, place) => {
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

    element.innerHTML = "<label>Tags</label>" + tagElements;

    const buttons = element.querySelectorAll("button.tag-button");

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
};

export const isPlaceOpen = hours => {
    const currentTime = moment();
    const times = hours.split("-");
    const firstTime = moment(times[0], "hh:mm");
    const secondTime = moment(times[1], "hh:mm");

    if (moment(currentTime, "hh:mm").isBetween(firstTime, secondTime)) {
        return true;
    } else {
        return false;
    }
};
