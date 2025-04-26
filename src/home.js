//home.js
import resBg from "./asset/resBg.jpg";
import maxavans from "./asset/home-maxavans.jpg";
import fariphoto from "./asset/home-fariphotography.jpg";
import top5way from "./asset/home-top5way.jpg";
import { contructContainer } from "./handlers";

const loadHome = () => {
  console.log("lol");
  const content = document.querySelector("#content");
  const heroGrid = contructContainer("div", "hero-grid");

  let p = document.createElement("p");
  p.textContent = "Hello,";
  heroGrid.appendChild(p);
  p = document.createElement("p");
  p.textContent = "Welcome";
  heroGrid.appendChild(p);
  content.appendChild(heroGrid);
  const contentGrid = contructContainer("div", "content-grid");
  const contentCell1 = contructContainer(
    "div",
    "content-cell",
    "Welcome to Pizzeria",
    `Step into a slice of 
        New York tradition! At Hans Pizza, we bring you the perfect blend of old-world charm and modern flavors. 
        From our signature hand-tossed pizzas to our hearty pastas and delightful deserts, 
        every dish is crafted with love, fresh ingredients, and a commitment to quality`
  );
  const contentCell2 = contructContainer(
    "div",
    "content-cell",
    "Dine-in, Pick-up & Delivery"
  );
  contentCell2.style.backgroundImage = `url(${maxavans})`;
  const contentCell3 = contructContainer(
    "div",
    "content-cell",
    "Daily Specials"
  );
  contentCell3.style.backgroundImage = `url(${fariphoto})`;
  const contentCell4 = contructContainer(
    "div",
    "content-cell",
    "Fresh Ingredients"
  );
  contentCell4.style.backgroundImage = `url(${top5way})`;

  contentGrid.append(contentCell1, contentCell2, contentCell3, contentCell4);
  content.appendChild(contentGrid);

  window.addEventListener("scroll", () => {
    heroGrid.style.opacity = Math.max(
      1 - window.scrollY / window.innerHeight,
      0
    );
  });
};

export { loadHome };
