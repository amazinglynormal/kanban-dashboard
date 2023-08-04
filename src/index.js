const addCardButtons = document.querySelectorAll(".add-card-button");
const addCardForms = document.querySelectorAll(".add-card-form");
const cardLists = document.querySelectorAll(".card-list");

function getColumnInfo(element) {
    let column = element;

    while (!column.classList.contains("column")) {
        column = column.parentNode;
    }

    return { column, index: column.dataset.index, title: column.dataset.title };
}

const columnTitleContainers = document.querySelectorAll(
    ".column-title-container"
);

const titleContainers = [];
const changeTitleContainers = [];

columnTitleContainers.forEach((columnTitleContainer) => {
    titleContainers.push(
        columnTitleContainer.querySelector(".title-container")
    );

    changeTitleContainers.push(
        columnTitleContainer.querySelector(".change-title-container")
    );
});

titleContainers.forEach((titleContainer) => {
    const button = titleContainer.querySelector(".change-title-button");
    button.addEventListener("click", () => {
        const { title } = getColumnInfo(button);
        titleContainer.classList.add("hidden");
        titleContainer.nextElementSibling.classList.remove("hidden");
        const changeTitle = titleContainer.nextElementSibling.querySelector(
            ".change-title-input"
        );
        changeTitle.value = title;
    });
});

changeTitleContainers.forEach((changeTitleContainer) => {
    const changeTitleInput = changeTitleContainer.querySelector(
        ".change-title-input"
    );
    const cancelButton = changeTitleContainer.querySelector(
        ".cancel-title-change"
    );
    const submitButton = changeTitleContainer.querySelector(
        ".save-title-change-button"
    );
    const form = changeTitleContainer.querySelector(".change-title-form");

    cancelButton.addEventListener("click", () => {
        changeTitleInput.value = "";
        changeTitleContainer.classList.add("hidden");
        changeTitleContainer.previousElementSibling.classList.remove("hidden");
    });

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const newTitle = formData.get("new-title");

        if (!newTitle) return;

        const { column } = getColumnInfo(changeTitleContainer);
        column.dataset.title = newTitle;
        const title = column.querySelector("h2");
        title.innerText = newTitle;

        changeTitleInput.value = "";
        changeTitleContainer.classList.add("hidden");
        changeTitleContainer.previousElementSibling.classList.remove("hidden");
    });
});

function generateNewCard(options) {
    const { text, index } = options;
    const cardListItem = document.createElement("li");
    cardListItem.classList.add("card-list-item");

    const card = document.createElement("div");
    card.classList.add("card");

    const cardText = document.createElement("p");
    cardText.innerText = text;

    card.appendChild(cardText);

    cardListItem.appendChild(card);

    cardLists[index].appendChild(cardListItem);
}

addCardButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.add("hidden");
        const { index } = getColumnInfo(button);
        addCardForms[index].classList.remove("hidden");
    });
});

addCardForms.forEach((form) => {
    const { index } = getColumnInfo(form);
    const cancelButton = form.querySelector(".add-card-form-cancel");
    const submitButton = form.querySelector(".add-card-form-submit");
    const textArea = form.querySelector("textarea");

    cancelButton.addEventListener("click", () => {
        addCardButtons[index].classList.remove("hidden");
        textArea.value = "";
        form.classList.add("hidden");
    });

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const newCardData = formData.get("new-card");

        if (!newCardData) return;

        generateNewCard({ index, text: newCardData });

        addCardButtons[index].classList.remove("hidden");
        textArea.value = "";
        form.classList.add("hidden");
    });
});
