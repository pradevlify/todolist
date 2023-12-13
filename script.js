//i writed wrapper input as todoinput id

const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#todoinput");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");

//to add task
const addTask = () => {
  document.querySelector(".para").style.display = "none";
  const taskName = newTaskInput.value.trim();
  error.style.display = "none";
  if (!taskName) {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }

  //generated task via input
  const task = `<div class='task'> 
<input type="checkbox" class="task-check"/>
<span class="taskname">${taskName}</span>

<button class="edit">
<i class="fa-solid fa-pen-to-square"></i>
</button>

<button class="delete">
<i class="fa-solid fa-trash"></i>
</button>
</div> `;

  tasksContainer.insertAdjacentHTML("beforeend", task);

  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.onclick = () => {
      button.parentNode.remove();
    };
  });

  const editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((editBtn) => {
    editBtn.onclick = (e) => {
      let targetElement = e.target;

      if (!e.target.className == "edit") {
        targetElement = e.target.parentElement;
        console.log(targetElement);
      }
      newTaskInput.value = targetElement.previousElementSibling?.innerText;

      targetElement.parentNode.remove();
    };
  });

  const tasksCheck = document.querySelectorAll(".task-check");
  tasksCheck.forEach((checkBox) => {
    checkBox.onchange = () => {
      checkBox.nextElementSibling.classList.toggle("completed");
    };
  });

  newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);

window.onload = () => {
  newTaskInput.value = "";
};

function saveData() {
  localStorage.setItem("data", tasksContainer.innerHTML);
}
function getData() {
  tasksContainer.innerHTML = localStorage.getItem("data");
}
