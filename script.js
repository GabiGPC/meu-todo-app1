let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function formatDate(dateString){

const [year, month, day] = dateString.split("-")

return `${day}/${month}/${year}`

}

function renderTasks(){

const list = document.getElementById("taskList");

list.innerHTML="";

tasks
.filter(task=>{
if(filter==="pending") return !task.completed
if(filter==="completed") return task.completed
return true
})
.forEach((task,index)=>{

const li=document.createElement("li");

const priority=task.priority||"media"

li.classList.add(`priority-${priority}`)

if(task.completed){
li.classList.add("completed")
}

li.innerHTML=`

<div class="task-left">

<span>${task.text}</span>

${task.dueDate ? `<span class="date">Prazo: ${formatDate(task.dueDate)}</span>`:""}

</div>

<div>

<input type="checkbox"
${task.completed ? "checked":""}
onchange="toggleTask(${index})">

<button class="delete-btn"
onclick="deleteTask(${index})">
Excluir
</button>

</div>

`

list.appendChild(li)

})

}

function addTask(){

const input=document.getElementById("taskInput")
const priority=document.getElementById("priority").value
const dueDate=document.getElementById("dueDate").value

const text=input.value.trim()

if(text==="") return

tasks.push({
text:text,
priority:priority,
dueDate:dueDate,
completed:false
})

input.value=""
document.getElementById("dueDate").value=""

saveTasks()

renderTasks()

}

function toggleTask(index){

tasks[index].completed=!tasks[index].completed

saveTasks()

renderTasks()

}

function deleteTask(index){

tasks.splice(index,1)

saveTasks()

renderTasks()

}

function setFilter(type){

filter=type

renderTasks()

}

document.getElementById("themeToggle").onclick=()=>{

document.body.classList.toggle("dark")

localStorage.setItem("theme",
document.body.classList.contains("dark")?"dark":"light")

}

if(localStorage.getItem("theme")==="dark"){
document.body.classList.add("dark")
}

renderTasks()
