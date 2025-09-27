// Drag and Drop

const list = document.querySelector(".container");
let draggingItem = null;

const storageKey = window.location.pathname + "_articleOrder";

if (list) {
  list.addEventListener("dragstart", (e) => {
    draggingItem = e.target;
    e.target.classList.add("dragging");
  });
  list.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
    document
      .querySelectorAll(".article")
      .forEach((item) => item.classList.remove("over"));
    draggingItem = null;
    saveOrder();
  });
  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingOverItem = getDragAfterElement(list, e.clientY);
    document
      .querySelectorAll(".article")
      .forEach((item) => item.classList.remove("over"));
    if (draggingOverItem) {
      draggingOverItem.classList.add("over");
      list.insertBefore(draggingItem, draggingOverItem);
    } else {
      list.appendChild(draggingItem);
    }
  });

  loadOrder();
}

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".article:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

// Save Order to local storage

function saveOrder() {
  const order = [...list.querySelectorAll(".article")].map(
    (el) => el.dataset.id
  );
  localStorage.setItem(storageKey, JSON.stringify(order));
}

function loadOrder() {
  const order = JSON.parse(localStorage.getItem(storageKey));
  if (!order) return;

  order.forEach((id) => {
    const el = document.querySelector(`.article[data-id='${id}']`);
    if (el) list.appendChild(el);
  });
}

loadOrder();
