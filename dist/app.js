
const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list-container");
const addBtn = document.querySelector("#add-btn");


const createTaskElement = (taskText) => {
  const li = document.createElement("li");
  li.className = `
    relative flex items-center pl-12 py-3 text-lg cursor-pointer rounded-md
    before:content-[''] before:absolute before:left-3 before:top-2 before:w-7 before:h-7
    before:rounded-full before:bg-[url('unchecked.png')] before:bg-cover before:bg-center
  `;
  li.innerHTML = `
    ${taskText}
    <span class="absolute right-2 top-1 w-8 h-8 flex items-center justify-center rounded-full text-xl text-gray-600 hover:bg-gray-200">&times;</span>
  `;
  return li;
};


const addTask = () => {
  const taskText = inputBox.value.trim();
  if (!taskText) return alert("⚠️ You must write something!");

  const li = createTaskElement(taskText);
  listContainer.appendChild(li);
  inputBox.value = "";
  saveData();
};

const saveData = () => {
  const tasksHTML = listContainer.innerHTML;
  tasksHTML
    ? localStorage.setItem("tasks", tasksHTML)
    : localStorage.removeItem("tasks");
};


const showTasks = () => {
  const saved = localStorage.getItem("tasks");
  listContainer.innerHTML = saved && saved.trim().startsWith("<") ? saved : "";
};


listContainer.addEventListener("click", (e) => {
  const target = e.target;
  if (target.tagName === "LI") {
    target.classList.toggle("line-through");
    target.classList.toggle("text-gray-500");

   
    if (target.classList.contains("line-through")) {
      target.classList.replace("before:bg-[url('unchecked.png')]", "before:bg-[url('checked.png')]");
    } else {
      target.classList.replace("before:bg-[url('checked.png')]", "before:bg-[url('unchecked.png')]");
    }
    saveData();
  } else if (target.tagName === "SPAN") {
    target.parentElement.remove();
    saveData();
  }
});


addBtn.addEventListener("click", addTask);


inputBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addTask();
});


document.addEventListener("DOMContentLoaded", showTasks);
