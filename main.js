let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasks = document.querySelector(".tasks");

// an Empty array to store tasks
let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
// shows tasks on page from local storage
getDataFromLocalStorage();
// add Tasks
submit.onclick = function () {
  if (input.value !== "") {
    addTasksToArray(input.value); //add task to Array of tasks
    input.value = ""; // Empty input field
  }
};

// delete from local storage and page
tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
    if (arrayOfTasks.length === 0) {
      tasks.innerHTML = "";
    }
  }
  if (e.target.classList.contains("task")) {
    toggleStatusWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
  if (e.target.classList.contains("clear")) {
    tasks.innerHTML = "";
    localStorage.clear();
  }
});
//********/

function addTasksToArray(taskText) {
  // task data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(task); //push tasks to the array
  addElementsToPageFrom(arrayOfTasks);
  // add tasks to local storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

/********/

// function to add elements to the
function addElementsToPageFrom(arrayOfTasks) {
  tasks.innerHTML = ""; // Empty main div
  clearAll();
  //for each element in the array we create it's components
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    // if task is done we add done className to it
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // create delete button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasks.appendChild(div);
  });
}
// function to add the array of tasks to local storage
function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
// function to show tasks on page when page is reloaded
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let task = JSON.parse(data);
    addElementsToPageFrom(task);
  }
}
// function to delete task from local storage
function deleteTaskWith(task) {
  arrayOfTasks = arrayOfTasks.filter((e) => e.id != task); // filters the clicked Id name
  addDataToLocalStorageFrom(arrayOfTasks); // update array that is added to local storage
}

function toggleStatusWith(task) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == task) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}
function clearAll() {
  if (arrayOfTasks.length > 0) {
    let clear = document.createElement("span");
    clear.className = "clear";
    clear.appendChild(document.createTextNode("Clear All"));
    tasks.appendChild(clear);
  }
}
