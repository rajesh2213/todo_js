//nav.js
import { toggleDialog, formToJson, addToStorage, removeStorage } from "./utils";

const navHandler = () => {
  const navToggleBtn = document.querySelector(".nav-toggle");
  const nav = document.querySelector("nav");
  const addProjectDialog = document.querySelector("#add-project");
  const addProjectForm = document.querySelector("#add-project form");
  const openProjectBtn = document.querySelector("#open-project-btn");
  const addProjectBtn = document.querySelector(".add-project-btn");
  const navContent = document.querySelector(".nav-content");
  const allTask = document.querySelector(".all-task");

  navToggleBtn.addEventListener("click", (e) => btnHandler(e));
  addProjectBtn.addEventListener("click", (e) => btnHandler(e));
  allTask.addEventListener("click", (e) => btnHandler(e));
  openProjectBtn.addEventListener("click", (e)=>btnHandler(e))

  const btnHandler = (e) => {
    switch (true) {
      case e.target.id.includes("open-project-btn"):
        console.log(e.target)
        toggleDialog(addProjectDialog);
        break;
      case e.target.classList.contains("nav-toggle") ||
        e.target.parentElement.classList.contains("nav-toggle"):
        navToggleBtn.classList.toggle("clicked");
        nav.classList.toggle("show");
        break;
      case e.target.classList.contains("add-project-btn"):
        e.preventDefault();
        const formJsonObj = formToJson(addProjectForm);
        addToStorage(formJsonObj);
        renderPorject();
        toggleDialog(addProjectDialog);
        break;
      case e.target.classList.contains("project-delete-btn"):
        deleteProject(e);
        renderPorject();
        break;
      case e.target.classList.contains("task-btn"):
        selectProjectBtns(e);
        const projectIdx = getProjectIdx();
        document.dispatchEvent(
          new CustomEvent("navProjectClicked", {
            detail: getProjectIdx(),
          })
        );
        break;
    }
  };

  function selectProjectBtns(e) {
    const addTask = document.querySelector('.open-task-btn')
    e.target.classList.toggle("clicked", true);
    e.target.disabled = true;
    e.target.parentElement.classList.contains('project-list')?addTask.classList.toggle('show', true) : addTask.classList.toggle('show', false)
    const taskBtns = document.querySelectorAll(".task-btn");

    taskBtns.forEach((btn) => {
      if (btn != e.target) {
        btn.classList.toggle("clicked", false);
        btn.disabled = false;
      }
    });
  }

  function getProjectIdx() {
    const projectBtns = Array.from(
      document.querySelectorAll(".project-list .task-btn")
    );
    return projectBtns.findIndex((project) =>
      project.classList.contains("clicked")
    );
  }

  function renderPorject() {
    navContent.innerHTML = "";
    const storedPorjects = JSON.parse(localStorage.getItem("projects"));
    storedPorjects.forEach((project) => {
      const div = document.createElement("div");
      div.classList.add("project-list");
      const projectBtn = createProjectBtn(project.name);
      const deleteBtn = createDeleteBtn();
      div.append(projectBtn, deleteBtn);
      navContent.appendChild(div);
    });
  }

  function createProjectBtn(name) {
    const button = document.createElement("button");
    button.classList.add("task-btn");
    button.textContent = name;
    button.addEventListener("click", (e) => btnHandler(e));
    return button;
  }

  function createDeleteBtn() {
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("project-delete-btn");
    deleteBtn.textContent = "delete";
    deleteBtn.addEventListener("click", (e) => btnHandler(e));
    return deleteBtn;
  }

  function deleteProject(e) {
    const projectDelete =
      e.target.parentElement.querySelector("button").textContent;
    removeStorage(projectDelete);
  }

  renderPorject();
};

export { navHandler };
