let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index)=>{

    const li = document.createElement("li");

    // adiciona classe da prioridade
    li.classList.add(`priority-${task.priority}`);

    if(task.completed){
      li.classList.add("completed");
    }

    li.innerHTML = `
      <div class="task-left">
        <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${index})">
        <span>${task.text}</span>
      </div>

      <button class="delete-btn" onclick="deleteTask(${index})">
        Excluir
      </button>
    `;

    list.appendChild(li);

  });

}

function addTask(){

  const input = document.getElementById("taskInput");
  const priority = document.getElementById("priority").value;

  const text = input.value.trim();

  if(text === "") return;

  tasks.push({
    text: text,
    priority: priority,
    completed: false
  });

  input.value = "";

  saveTasks();
  renderTasks();

}

function toggleTask(index){

  tasks[index].completed = !tasks[index].completed;

  saveTasks();
  renderTasks();

}

function deleteTask(index){

  tasks.splice(index,1);

  saveTasks();
  renderTasks();

}

.priority-alta{
border-left:6px solid #ff4d4d;
}

.priority-media{
border-left:6px solid #ffc107;
}

.priority-baixa{
border-left:6px solid #28a745;
}

renderTasks();
