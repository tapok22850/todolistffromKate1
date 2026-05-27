"use strict";

let addTask = document.querySelector(".adTask");
let allTasks = document.querySelector("#allTasks");
let completedTasks = document.querySelector("#completedTasks");
let task = document.querySelector("#task");

let saved = localStorage.getItem("tasks");
let tasks;

if (saved !== null) {
    tasks = JSON.parse(saved);
} else {
    tasks = [];
}

for (let i = 0; i < tasks.length; i++) {
    let status = tasks[i];
    
    let newTask = document.createElement("div");
    
    if (status.completed === true) {
        newTask.className = "completed";
    } else {
        newTask.className = "new";
    }
    
    newTask.dataset.id = status.id;
    newTask.innerText = status.text;
    
    let closeBtn = document.createElement("span");
    closeBtn.innerHTML = "✖";
    closeBtn.classList.add("close");
    

    closeBtn.addEventListener("click", function() {
        if (status.completed === true) {
            status.completed = false;
            newTask.className = "new";
            allTasks.appendChild(newTask);
        } else {
            status.completed = true;
            newTask.className = "completed";
            completedTasks.appendChild(newTask);
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });
    
    newTask.appendChild(closeBtn);
    
    if (status.completed === true) {
        completedTasks.appendChild(newTask);
    } else {
        allTasks.appendChild(newTask);
    }
}


addTask.addEventListener("click", function() {

    let text = task.value.trim();
    if (text === "") return;
    let id = Date.now();
    let newTaskObj = { id: id, text: text, completed: false };
    let newTask = document.createElement("div");
    newTask.className = "new";
    newTask.dataset.id = id;
    newTask.innerText = text;
    let closeBtn = document.createElement("span");
    closeBtn.innerHTML = "✖";
    closeBtn.classList.add("close");

    closeBtn.addEventListener("click", function() {
        if (newTaskObj.completed === true) {
            newTaskObj.completed = false;
            newTask.className = "new";
            allTasks.appendChild(newTask);
        } else {
            newTaskObj.completed = true;
            newTask.className = "completed";
            completedTasks.appendChild(newTask);
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });
    
    newTask.appendChild(closeBtn);
    allTasks.appendChild(newTask);
    task.value = "";

    localStorage.setItem("tasks", JSON.stringify(tasks));
});