class Task {
  constructor(name, description, priority) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.status = "нове";
  }
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let draggedTaskIndex = null;
let currentTaskIndex = null;

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskLists = document.querySelectorAll(".task-list");
  taskLists.forEach((list) => {
    const status = list.getAttribute("data-status");
    const filteredTasks = tasks.filter((task) => task.status === status);

    list.innerHTML = filteredTasks
      .map((task, index) => {
        const taskIndex = tasks.indexOf(task);
        return `
          <div class="task" 
               draggable="true" 
               data-priority="${task.priority}" 
               data-index="${taskIndex}" 
               onclick="showDetails(${taskIndex})">
            <strong>${task.name}</strong><br>
            <p>${task.description}</p>
          </div>`;
      })
      .join("");

    list.querySelectorAll(".task").forEach((task) => {
      task.addEventListener("dragstart", () => {
        draggedTaskIndex = task.dataset.index;
      });
      task.addEventListener("dragend", () => {
        draggedTaskIndex = null;
      });
    });
  });

  saveToLocalStorage();
}

function sortTasks(status, order) {
  tasks = tasks.sort((a, b) => {
    const priorities = { високий: 1, середній: 2, низький: 3 };
    if (a.status === status && b.status === status) {
      return order === "asc"
        ? priorities[a.priority] - priorities[b.priority]
        : priorities[b.priority] - priorities[a.priority];
    }
    return 0;
  });

  renderTasks();
}

//TODO:-------------------------------------
const popupCreate = document.getElementById("popup-create");
const popupOverlay = document.getElementById("popup-overlay");

function openCreatePopup() {
  popupCreate.style.display = "block";
  popupOverlay.style.display = "block";
}

function closeCreatePopup() {
  popupCreate.style.display = "none";
  popupOverlay.style.display = "none";
}

function createTask() {
  const name = document.getElementById("createTitle").value;
  const description = document.getElementById("createDescription").value;
  const priority = document.getElementById("createPriority").value;
  tasks.push(new Task(name, description, priority, "нове"));
  closeCreatePopup();
  renderTasks();
}

//TODO:-------------------------------------

function addTask(name, description, priority) {
  tasks.push(new Task(name, description, priority));
  renderTasks();
}

function showDetails(index) {
  const task = tasks[index];
  currentTaskIndex = index;

  document.getElementById("popupName").value = task.name;
  document.getElementById("popupDescription").value = task.description;
  document.getElementById("popupPriority").value = task.priority;
  document.getElementById("popupStatus").value = task.status;

  document.getElementById("popup").style.display = "block";
}

function saveTask() {
  const task = tasks[currentTaskIndex];
  task.name = document.getElementById("popupName").value;
  task.description = document.getElementById("popupDescription").value;
  task.priority = document.getElementById("popupPriority").value;
  task.status = document.getElementById("popupStatus").value;

  renderTasks();
  closePopup();
}

function deleteTask() {
  if (currentTaskIndex !== null) {
    tasks.splice(currentTaskIndex, 1);
    renderTasks();
    closePopup();
  }
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

document.querySelectorAll(".task-list").forEach((list) => {
  list.addEventListener("dragover", (e) => e.preventDefault());
  list.addEventListener("drop", (e) => {
    e.preventDefault();
    const status = list.dataset.status;
    const draggedIndex = parseInt(draggedTaskIndex, 10);

    if (!isNaN(draggedIndex)) {
      tasks[draggedIndex].status = status;
      renderTasks();
    }
  });
});

renderTasks();
