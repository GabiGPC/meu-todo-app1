let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";
let currentParentId = null;


// =====================
// SALVAR
// =====================
function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}


// =====================
// FORMATAR DATA
// =====================
function formatDate(dateString){
const [year, month, day] = dateString.split("-")
return `${day}/${month}/${year}`
}


// =====================
// RENDER
// =====================
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

// prioridade
const priority=task.priority||"media"
li.classList.add(`priority-${priority}`)

// status
if(task.completed){
li.classList.add("completed")
}

// subtarefa visual
if(task.parentId){
li.style.marginLeft = "20px";
li.style.opacity = "0.95";
}

li.innerHTML=`

<div class="task-left">

<span>${task.text}</span>

${task.parentId ? `<small class="subtask">↳</small>` : ""}

${task.dueDate ? `<span class="date">Prazo: ${formatDate(task.dueDate)}</span>`:""}

</div>

<div>

<button onclick="setParentTask(${task.id})">
Subtarefa
</button>

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


// =====================
// ADD TASK
// =====================
function addTask(){

const input=document.getElementById("taskInput")
const priority=document.getElementById("priority").value
const dueDate=document.getElementById("dueDate").value

const text=input.value.trim()

if(text==="") return

tasks.push({
id: Date.now(),
text:text,
priority:priority,
dueDate:dueDate,
completed:false,
parentId: currentParentId
})

currentParentId = null;

input.value=""
document.getElementById("dueDate").value=""

saveTasks()
renderTasks()

}


// =====================
// TOGGLE
// =====================
function toggleTask(index){
tasks[index].completed=!tasks[index].completed;
saveTasks();
renderTasks();
}


// =====================
// DELETE
// =====================
function deleteTask(index){
tasks.splice(index,1);
saveTasks();
renderTasks();
}


// =====================
// FILTER
// =====================
function setFilter(type){
filter=type
renderTasks()
}


// =====================
// SET PARENT
// =====================
function setParentTask(taskId){
currentParentId = taskId;
alert("Nova tarefa será vinculada a esta");
}


// =====================
// DARK MODE
// =====================
document.getElementById("themeToggle").onclick=()=>{
document.body.classList.toggle("dark")

localStorage.setItem("theme",
document.body.classList.contains("dark")?"dark":"light")
}

if(localStorage.getItem("theme")==="dark"){
document.body.classList.add("dark")
}


// =====================
// INIT
// =====================
renderTasks();
