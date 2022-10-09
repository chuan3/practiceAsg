const menuCardTemplate = document.querySelector("[data-menu-template]");
const menuCardContainer = document.querySelector("[data-menu-cards-container]");
const searchInput = document.querySelector("[data-search]");

let menu = [];
let t = null;
searchInput.addEventListener("input", (e) => {
  if (t != null) clearTimeout(t);
  t = setTimeout(() => {
    const value = e.target.value;
    menu.forEach((menu) => {
      const isVisible = menu.name.includes(value);
      menu.element.classList.toggle("hide", !isVisible);
    });

    console.log(menu);
  }, 500);
});

fetch("https://stream-restaurant-menu-svc.herokuapp.com/item")
  .then((res) => res.json())
  .then((data) => {
    menu = data.map((menu) => {
      const card = menuCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      header.textContent = menu.name;
      menuCardContainer.append(card);
      return { name: menu.name, element: card };
    });
  });
