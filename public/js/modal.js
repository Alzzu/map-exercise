const toggleModal = () => {
    const modal = document.querySelector(".modal");
    modal.style.display === "none"
        ? (modal.style.display = "block")
        : (modal.style.display = "none");
};

const toggleAddModal = () => {
    const addmodal = document.querySelector(".addModal");
    addmodal.style.display === "none"
        ? (addmodal.style.display = "block")
        : (addmodal.style.display = "none");
};
