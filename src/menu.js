//menu.js
import resBg from "./asset/resBg.jpg";
import maxavans from "./asset/home-maxavans.jpg";
import fariphoto from "./asset/home-fariphotography.jpg";
import top5way from "./asset/home-top5way.jpg";
import { contructContainer } from "./handlers";
import cheesecake from "./asset/cheesecake.jpg";
import margherita from "./asset/margherita.jpg";

const loadMenu = () => {
  const content = document.querySelector("#content");
  const contentGrid = contructContainer("div", "menu-grid");
  const contentCell1 = contructContainer(
    "div",
    "menu-cell",
    "Cheese Cake",
    "",
    cheesecake
  );
  const contentCell2 = contructContainer(
    "div",
    "menu-cell",
    "Pasta",
    "",
    margherita
  );

  const contentCell3 = contructContainer(
    "div",
    "menu-cell",
    "Pizzeria",
    "",
    margherita
  );
  const contentCell4 = contructContainer(
    "div",
    "menu-cell",
    "Cake",
    "",
    cheesecake
  );
  contentGrid.append(contentCell1, contentCell2, contentCell3, contentCell4);
  content.appendChild(contentGrid);
};

export { loadMenu };
