//main.js
import { toggleDialog, formToJson, addToStorage, removeStorage } from "./utils";

export const mainHandler = () => {
  const nav = document.querySelector("nav");
  const navContent = document.querySelector(".nav-content");
  const main = document.querySelector("main");
  const mainContent = document.querySelector(".main-content");
  const taskBtns = document.querySelectorAll(".task-btn");
  const addTaskBtn = document.querySelector(".add-task-btn");
  const addTaskForm = document.querySelector("#add-task form");
  const addTaskDialog = document.querySelector("#add-task");
  const editDialog = document.querySelector("#edit-task");
  const editForm = document.querySelector("#edit-task form");
  const editTaskBtn = document.querySelector(".confirm-task-btn");

  navContent.addEventListener("click", (e) => btnHandler(e));
  addTaskBtn.addEventListener("click", (e) => btnHandler(e));
  main.addEventListener("click", (e) => btnHandler(e));
  editTaskBtn.addEventListener("click", (e) => btnHandler(e));

  let navBtnIdx = -1;
  let taskIdx = -1;

  document.addEventListener("navProjectClicked", (e) => {
    resetMain();
    navBtnIdx = e.detail;
    if (navBtnIdx >= 0) renderTasks();
  });

  function btnHandler(e) {
    let jsonObj;
    switch (true) {
      case e.target.classList.contains("open-task-btn"):
        toggleDialog(addTaskDialog);
        break;
      case e.target.classList.contains("add-task-btn"):
        e.preventDefault();
        jsonObj = formToJson(addTaskForm);
        addTaskToStorage(jsonObj);
        resetMain();
        renderTasks();
        toggleDialog(addTaskDialog);
        break;
      case e.target.classList.contains("task-delete-btn"):
        deleteTask(e);
        resetMain();
        renderTasks();
        break;
      case e.target.classList.contains("task-edit-btn"):
        getEditForm(e);
        toggleDialog(editDialog);
        break;
      // resetMain();
      // renderTasks();
      case e.target.classList.contains("confirm-task-btn"):
        e.preventDefault();
        jsonObj = formToJson(editForm);
        addTaskToStorage(jsonObj, true);
        resetMain();
        renderTasks();
        toggleDialog(editDialog);
        break;
    }
  }

  function resetMain() {
    mainContent.innerHTML = "";
  }

  function addTaskToStorage(jsonObj, edit = false) {
    const storedPorjects = JSON.parse(localStorage.getItem("projects"));
    const taskData = {
      name: jsonObj.taskName,
      description: jsonObj.taskDescription,
      dueDate: jsonObj.taskDueDate,
    };
    if (edit == false) {
      storedPorjects[navBtnIdx].tasks.push(taskData);
    } else {
      storedPorjects[navBtnIdx].tasks[taskIdx].name = jsonObj.taskName;
      storedPorjects[navBtnIdx].tasks[taskIdx].description =
        jsonObj.taskDescription;
      storedPorjects[navBtnIdx].tasks[taskIdx].dueDate = jsonObj.taskDueDate;
    }
    localStorage.setItem("projects", JSON.stringify(storedPorjects));
  }

  function deleteTask(e) {
    const taskName = e.target.parentElement.firstElementChild.textContent;
    const storedPorjects = JSON.parse(localStorage.getItem("projects"));
    const idxToDelete = storedPorjects[navBtnIdx].tasks.findIndex(
      (task) => task.name == taskName
    );
    storedPorjects[navBtnIdx].tasks.splice(idxToDelete, 1);
    localStorage.setItem("projects", JSON.stringify(storedPorjects));
  }

  function getEditForm(e) {
    const taskName = e.target.parentElement.firstElementChild.textContent;
    const storedPorjects = JSON.parse(localStorage.getItem("projects"));
    taskIdx = storedPorjects[navBtnIdx].tasks.findIndex(
      (task) => task.name == taskName
    );
    editForm.taskName.value = storedPorjects[navBtnIdx].tasks[taskIdx].name;
    editForm.taskDescription.value =
      storedPorjects[navBtnIdx].tasks[taskIdx].description;
    editForm.taskDueDate.value =
      storedPorjects[navBtnIdx].tasks[taskIdx].dueDate;
  }

  function renderTasks() {
    const storedPorjects = JSON.parse(localStorage.getItem("projects"));
    const selectedProject = storedPorjects[navBtnIdx];
    const selectedProjectsTasks = selectedProject.tasks;
    const fragment = document.createDocumentFragment();
    if (selectedProjectsTasks.length < 1) {
      const div = document.createElement("div");
      div.classList.add("task-list");
      div.textContent = "No tasks";
      fragment.appendChild(div);
    } else {
      selectedProjectsTasks.forEach((task) => {
        fragment.appendChild(createTaskCard(task));
      });
    }
    mainContent.appendChild(fragment);
  }

  function createTaskCard(task) {
    const div = document.createElement("div");
    div.classList.add("task-list");
    const spanName = document.createElement("span");
    spanName.classList.add("task-name");
    spanName.textContent = task.name;
    const spanDesc = document.createElement("span");
    spanDesc.classList.add("task-description");
    spanDesc.textContent = task.description;
    const spanDue = document.createElement("span");
    spanDue.classList.add("task-description");
    spanDue.textContent = task.dueDate;
    const editBtn = document.createElement("button");
    editBtn.classList.add("task-edit-btn");
    editBtn.textContent = "edit";
    const button = document.createElement("button");
    button.classList.add("task-delete-btn");
    button.textContent = "delete";
    div.append(spanName, spanDesc, spanDue, editBtn, button);
    return div;
  }
};
