export function contructContainer(
  element,
  className = "",
  h2 = "",
  p = "",
  img = ""
) {
  const tempContainer = document.createElement(element);
  if (className != "") tempContainer.classList.add(className);
  if (h2 != "") {
    const containerHeading = document.createElement("h2");
    containerHeading.textContent = h2;
    tempContainer.appendChild(containerHeading);
  }
  if (img != "") {
    const containerImg = document.createElement("img");
    containerImg.src = `${img}`;
    tempContainer.appendChild(containerImg);
  }
  if (p != "") {
    const containerText = document.createElement("p");
    containerText.textContent = p;
    tempContainer.appendChild(containerText);
  }
  return tempContainer;
}

export function resetDisplay(e) {
  const content = document.querySelector("#content");
  content.innerHTML = "";
  e.target.classList.toggle("clicked", true);
  const btns = Array.from(document.querySelectorAll("nav button")).filter(
    (value) => value != e.target
  );
  btns.forEach((btn) => {
    btn.classList.toggle("clicked", false);
  });
}
