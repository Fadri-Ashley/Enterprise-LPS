// Sidebar
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// Add Article
const createBtn = document.getElementById("addButton");
const cardContainer = document.getElementById("card1Container");

// Load dari localStorage waktu halaman dibuka
window.addEventListener("load", () => {
  const savedCards = JSON.parse(localStorage.getItem("cards")) || [];
  savedCards.forEach((card) => {
    addCard(card.title, card.article);
  });
});

// Function buat tambah card baru
function addCard(title = "", article = "") {
  const newCard = document.createElement("div");
  newCard.classList.add("card1");

  newCard.innerHTML = `
        <button class="delete-btn">Delete</button>
        <input type="text" placeholder="Add Title" value="${title}">
        <textarea placeholder="Add Article">${article}</textarea>
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

  cardContainer.appendChild(newCard);
}

// Tombol create
createBtn.addEventListener("click", () => {
  addCard();
  saveCards(); // langsung simpan biar nggak hilang
});

// Simpan semua kartu ke localStorage
function saveCards() {
  const cards = [];
  document.querySelectorAll(".card1").forEach((card) => {
    const title = card.querySelector("input").value;
    const article = card.querySelector("textarea").value;
    cards.push({ title, article });
  });
  localStorage.setItem("cards", JSON.stringify(cards));
}
