import { postTag } from "./api.js";

export const drawTagControls = element => {
    element.innerHTML +=
        "<button class='add-tag-button'>+</button><input class='newtag-input' name='newtag' type='text' style='display: none;'>";

    const addTagButton = document.querySelector(".add-tag-button");
    addTagButton.addEventListener("click", () => {
        const newTagInput = document.querySelector(".newtag-input");
        addTagButton.style.display = "none";
        newTagInput.style.display = "inline-block";
        newTagInput.focus();

        newTagInput.onkeydown = e => {
            if (e.key === "Enter") {
                postTag({ label: newTagInput.value });

                addTagButton.style.display = "inline-block";
                newTagInput.style.display = "none";
            }
        };
    });
};
