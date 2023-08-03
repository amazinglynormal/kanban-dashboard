const addCardButtons = document.querySelectorAll(".add-card-button");
const addCardForms = document.querySelectorAll(".add-card-form");
const cardLists = document.querySelectorAll(".card-list");

function generateNewCard(options) {
    const { text, columnIndex } = options;
    const cardListItem = document.createElement("li");
    cardListItem.classList.add("card-list-item");

    const card = document.createElement("div");
    card.classList.add("card");

    const cardText = document.createElement("p");
    cardText.innerText = text;

    card.appendChild(cardText);

    cardListItem.appendChild(card);

    cardLists[columnIndex].appendChild(cardListItem);
}

function getColumnIndex(element) {
    return parseInt(element.parentNode.parentNode.parentNode.dataset.index);
}

addCardButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.add("hidden");
        const columnIndex = getColumnIndex(button);
        addCardForms[columnIndex].classList.remove("hidden");
    });
});

addCardForms.forEach((form) => {
    const columnIndex = getColumnIndex(form);
    const cancelButton = form.querySelector(".add-card-form-cancel");
    const submitButton = form.querySelector(".add-card-form-submit");
    const textArea = form.querySelector("textarea");

    cancelButton.addEventListener("click", () => {
        addCardButtons[columnIndex].classList.remove("hidden");
        textArea.value = "";
        form.classList.add("hidden");
    });

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const newCardData = formData.get("new-card");

        generateNewCard({ columnIndex, text: newCardData });

        addCardButtons[columnIndex].classList.remove("hidden");
        textArea.value = "";
        form.classList.add("hidden");
    });
});
