const inputEl = document.querySelector("#input");
const buttonEl = document.querySelector("#delete");
const outputEl = document.querySelector("#list-container");
const form = document.querySelector("form");
const dialogEl = document.getElementById("update-dialog");
const changeEl = document.getElementById("change");
const updateFormEl = document.getElementById("update-form");
const updateInputEl = document.getElementById("update-input");
const searchInputEl = document.getElementById("search-input");
const searchBtnEl = document.getElementById("search-btn"); 
let anjas = "anjas";

// get task
const getTask = () =>{
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  let output;
  const allTasks = tasks.map((task)=>{
    return `
    <li id="item">
        <span>${task.title}</span>
        <button onclick = "updateTask(${task.id})" id="change" >Change</button>
        <button onclick = "removeTask(${task.id})" id="delete">Delete</button>
    </li>
    `
  });
  output = allTasks.join("");
  outputEl.innerHTML = output;
};

// add task
const addTask = (e) => {
  e.preventDefault();
  const task = inputEl.value;
  if (task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push({
      id:Date.now(),
      title:task
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
    inputEl.value = "";
    getTask();
  }
};

// delete task
const removeTask = (id) => {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks = tasks.filter((task)=>{
    return task.id !== id;
  });

  localStorage.setItem("tasks",JSON.stringify(tasks));
  getTask();
};

// update
const updateTask = (id) => {
  dialogEl.showModal();

  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  let taskToUpdate = tasks.find(task => task.id == id);

  updateFormEl.addEventListener("submit",(e)=>{
    e.preventDefault();
    taskToUpdate.title = updateInputEl.value;
    localStorage.setItem("tasks",JSON.stringify(tasks));
    dialogEl.close();
    getTask();
  });
  updateInputEl.value="";
};

// search
const searchTask = (title) => {
  let output;
  let task = "";
  if (searchInputEl.value === "") {
    alert("Please input the title of task");
  } 

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  title = searchInputEl.value.toLowerCase();
  let taskToSearch = tasks.find(task => task.title.toLowerCase() == title);
  if (taskToSearch !== undefined) {
    task = `
    <li id="item">
      <span>${taskToSearch.title}</span>
      <button onclick = "updateTask(${taskToSearch.id})" id="change" >Change</button>
      <button onclick = "removeTask(${taskToSearch.id})" id="delete">Delete</button>
    </li>
    <button onclick = "getTask()">Back</button>
    `
  } else {
    task = "<h1>Task Not Found</h1>";
  }
  outputEl.innerHTML = task;
  searchInputEl.value = "";
}

// event listener
form.addEventListener("submit",addTask);
searchBtnEl.addEventListener("click",searchTask)
getTask();