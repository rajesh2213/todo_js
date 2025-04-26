export const toggleDialog = (dialog) => {
  const form = document.querySelector("form");
  dialog.open ? dialog.close() : dialog.showModal();
  form.reset();
};

export const formToJson = (form) => {
  const jsonObj = {};
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name) {
      jsonObj[form.elements[i].name] = form.elements[i].value;
    }
  }
  return jsonObj;
};

export const addToStorage = (formObj) => {
  const projectData = {
    name: "",
    tasks: [],
  };
  if (formObj.projectName) {
    projectData.name = formObj.projectName;
  }
  const storedPorjects = JSON.parse(localStorage.getItem("projects")) || [];
  storedPorjects.push(projectData);
  localStorage.setItem("projects", JSON.stringify(storedPorjects));
};

export const removeStorage = (name) => {
  const storedPorjects = JSON.parse(localStorage.getItem("projects"));
  const updatedProjects = storedPorjects.filter(
    (project) => project.name != name
  );
  console.log(updatedProjects);
  localStorage.setItem("projects", JSON.stringify(updatedProjects));
};
