document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  const container = document.createElement("div");
  container.id = "container";
  container.style.cssText = `
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #f9f9f9;
`;
  body.appendChild(container);

  const header = document.createElement("h1");
  header.textContent = "Список завдань";
  header.style.cssText = `
  text-align: center;
  color: #333;
`;
  container.appendChild(header);

  const projectForm = document.createElement("form");
  projectForm.id = "project-form";
  projectForm.style.cssText = `
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

  const projectInput = document.createElement("input");
  projectInput.type = "text";
  projectInput.id = "project-input";
  projectInput.placeholder = "Введіть назву проєкту";
  projectInput.style.cssText = `
  flex-grow: 1;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

  const addProjectButton = document.createElement("button");
  addProjectButton.type = "submit";
  addProjectButton.textContent = "Додати проєкт";
  addProjectButton.style.cssText = `
  padding: 10px 20px;
  border: none;
  background-color: #28a745;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
`;
  addProjectButton.addEventListener(
    "mouseenter",
    () => (addProjectButton.style.backgroundColor = "#218838")
  );
  addProjectButton.addEventListener(
    "mouseleave",
    () => (addProjectButton.style.backgroundColor = "#28a745")
  );

  projectForm.appendChild(projectInput);
  projectForm.appendChild(addProjectButton);
  container.appendChild(projectForm);

  const projectSelector = document.createElement("select");
  projectSelector.id = "project-selector";
  projectSelector.style.cssText = `
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
  container.appendChild(projectSelector);

  const taskForm = document.createElement("form");
  taskForm.id = "task-form";
  taskForm.style.cssText = `
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

  const taskInput = document.createElement("input");
  taskInput.type = "text";
  taskInput.id = "task-input";
  taskInput.placeholder = "Введіть нове завдання";
  taskInput.style.cssText = `
  flex-grow: 1;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

  const addButton = document.createElement("button");
  addButton.type = "submit";
  addButton.textContent = "Додати";
  addButton.style.cssText = `
  padding: 10px 20px;
  border: none;
  background-color: #007BFF;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
`;
  addButton.addEventListener(
    "mouseenter",
    () => (addButton.style.backgroundColor = "#0056b3")
  );
  addButton.addEventListener(
    "mouseleave",
    () => (addButton.style.backgroundColor = "#007BFF")
  );

  taskForm.appendChild(taskInput);
  taskForm.appendChild(addButton);
  container.appendChild(taskForm);

  const filterOptions = document.createElement("select");
  filterOptions.id = "filter-options";
  filterOptions.style.cssText = `
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "Всі завдання";

  const completedOption = document.createElement("option");
  completedOption.value = "completed";
  completedOption.textContent = "Виконані завдання";

  const pendingOption = document.createElement("option");
  pendingOption.value = "pending";
  pendingOption.textContent = "Невиконані завдання";

  filterOptions.appendChild(allOption);
  filterOptions.appendChild(completedOption);
  filterOptions.appendChild(pendingOption);
  container.appendChild(filterOptions);

  const taskList = document.createElement("ul");
  taskList.id = "task-list";
  taskList.style.cssText = `
  list-style: none;
  padding: 0;
`;
  container.appendChild(taskList);

  let projects = JSON.parse(localStorage.getItem("projects")) || {};
  let currentProject = localStorage.getItem("currentProject") || null;
  const savedFilter = localStorage.getItem("filter") || "all";
  filterOptions.value = savedFilter;

  let promptShown = false;

  function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  function saveCurrentProject() {
    localStorage.setItem("currentProject", currentProject);
  }

  function saveFilter() {
    localStorage.setItem("filter", filterOptions.value);
  }

  function renderProjects() {
    projectSelector.innerHTML = "";
    Object.keys(projects).forEach((projectName) => {
      const option = document.createElement("option");
      option.value = projectName;
      option.textContent = projectName;
      projectSelector.appendChild(option);
    });

    if (!currentProject && Object.keys(projects).length > 0) {
      currentProject = Object.keys(projects)[0];
      saveCurrentProject();
    }

    projectSelector.value = currentProject;
    renderTasks();
  }

  function renderTasks() {
    taskList.innerHTML = "";
    const filter = filterOptions.value;
    const tasks = projects[currentProject] || [];

    if (Object.keys(projects).length > 0 && tasks.length > 0) {
      const allTasksCompleted = tasks.every((task) => task.completed);

      if (allTasksCompleted && !promptShown) {
        const confirmDelete = confirm(
          "Всі завдання в цьому проекті виконані. Ви хочете видалити цей проект?"
        );
        if (confirmDelete) {
          deleteProject(currentProject);
          return;
        }
        promptShown = true;
      }
    }

    const filteredTasks = tasks.filter((task) => {
      if (filter === "all") return true;
      return filter === "completed" ? task.completed : !task.completed;
    });

    filteredTasks.forEach(renderTask);
  }

  function renderTask(task) {
    const li = document.createElement("li");
    li.className = "task-item";
    li.dataset.id = task.id;
    li.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
  `;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", toggleTaskStatus);

    const span = document.createElement("span");
    span.textContent = task.name;
    if (task.completed) {
      span.style.cssText = `
      text-decoration: line-through;
      color: gray;
    `;
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.style.cssText = `
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
  `;
    deleteButton.addEventListener(
      "mouseenter",
      () => (deleteButton.style.backgroundColor = "#a71d2a")
    );
    deleteButton.addEventListener(
      "mouseleave",
      () => (deleteButton.style.backgroundColor = "#dc3545")
    );
    deleteButton.addEventListener("click", deleteTask);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  }

  function addTask(e) {
    e.preventDefault();
    if (!currentProject) return;

    const taskName = taskInput.value.trim();
    if (!taskName) return;

    const task = {
      id: Date.now().toString(),
      name: taskName,
      completed: false,
    };

    projects[currentProject].push(task);
    saveProjects();
    renderTasks();
    taskInput.value = "";
  }

  function addProject(e) {
    e.preventDefault();
    const projectName = projectInput.value.trim();
    if (!projectName || projects[projectName]) return;

    projects[projectName] = [];
    currentProject = projectName;
    saveProjects();
    saveCurrentProject();
    renderProjects();
    projectInput.value = "";
  }

  function toggleTaskStatus(e) {
    const taskId = e.target.parentElement.dataset.id;
    const task = projects[currentProject].find((t) => t.id === taskId);
    if (task) {
      task.completed = e.target.checked;
      saveProjects();
      renderTasks();
    }
  }

  function deleteTask(e) {
    const taskId = e.target.parentElement.dataset.id;
    projects[currentProject] = projects[currentProject].filter(
      (t) => t.id !== taskId
    );
    saveProjects();
    renderTasks();
  }

  function deleteProject(projectName) {
    delete projects[projectName];
    saveProjects();
    renderProjects();
  }

  function changeProject(e) {
    currentProject = e.target.value;
    saveCurrentProject();
    renderTasks();
  }

  projectSelector.addEventListener("change", changeProject);
  filterOptions.addEventListener("change", () => {
    saveFilter();
    renderTasks();
  });
  taskForm.addEventListener("submit", addTask);
  projectForm.addEventListener("submit", addProject);

  renderProjects();
});
