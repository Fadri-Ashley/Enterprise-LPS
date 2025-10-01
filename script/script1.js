// Sidebar
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");
const content = document.getElementById("cardGroup");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  content.classList.toggle("shift");
});

// Add Article
const createBtn = document.getElementById("addButton");
const cardContainer = document.getElementById("cardGroup");

// Load from localstorage while open page
window.addEventListener("load", () => {
  const savedCards = JSON.parse(localStorage.getItem("cards")) || [];
  savedCards.forEach((card) => {
    addCard(card.title, card.article);
  });
});

// Function add card
function addCard(title = "", article = "") {
  const newCard = document.createElement("div");
  newCard.classList.add("card1");

  newCard.innerHTML = `
        <button class="kebab-btn">⋮</button>
        <div class="dropdown">
          <button class="delete-btn">Delete</button>
        </div>
        <input type="text" placeholder="Add Title" maxlength="50" value="${title}">
        <textarea placeholder="Add Article" spellcheck="false">${article}</textarea>
      `;

  // Event listener autosave
  const inputTitle = newCard.querySelector("input");
  const inputArticle = newCard.querySelector("textarea");
  const deleteBtn = newCard.querySelector(".delete-btn");

  inputTitle.addEventListener("input", saveCards);
  inputArticle.addEventListener("input", saveCards);

  deleteBtn.addEventListener("click", () => {
    newCard.remove();
    saveCards();
  });

  // Event listener kebab menu
  const kebabBtn = newCard.querySelector(".kebab-btn");
  const dropdown = newCard.querySelector(".dropdown");

  kebabBtn.addEventListener("click", (e) => {
    dropdown.classList.toggle("show");

    document.querySelectorAll(".dropdown").forEach((menu) => {
      if (menu !== dropdown) menu.classList.remove("show");
    });

    e.stopPropagation();
  });

  cardContainer.appendChild(newCard);
}

// Create button
createBtn.addEventListener("click", () => {
  addCard();
  saveCards(); // Save immediately
});

// Save all cards into localstorage
function saveCards() {
  const cards = [];
  document.querySelectorAll(".card1").forEach((card) => {
    const title = card.querySelector("input").value;
    const article = card.querySelector("textarea").value;
    cards.push({ title, article });
  });
  localStorage.setItem("cards", JSON.stringify(cards));
}

// Kebab menu button

window.addEventListener("click", () => {
  document
    .querySelectorAll(".dropdown")
    .forEach((menu) => menu.classList.remove("show"));
});
