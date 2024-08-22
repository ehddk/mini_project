import "./main";
import "./styles/todo.scss";

const today: Date = new Date();
const year: number = today.getFullYear();
const month: string = String(today.getMonth() + 1).padStart(2, "0");
const day: string = String(today.getDate()).padStart(2, "0");

const currentDateElement = document.getElementById("todo_current_date");
if (currentDateElement) {
  currentDateElement.innerHTML = `${year}년 ${month}월 ${day}일`;
}

const pushButton = document.querySelector("#push") as HTMLButtonElement;
const newTaskInput = document.querySelector(
  "#newtask input"
) as HTMLInputElement;
const tasksContainer = document.querySelector("#tasks") as HTMLElement;

pushButton.onclick = function () {
  const taskValue: string = newTaskInput.value;

  if (taskValue.length === 0) {
    alert("오늘 할일이 없다고 ?! 그럴리가 없는데 !");
  } else {
    const task: HTMLDivElement = document.createElement("div");
    task.classList.add("task");
    task.innerHTML = `
      <span id="taskname">
          ${taskValue}
      </span>
      <div class="task-btn-box">
        <button class="edit">🛠</button>
        <button class="delete">✔</button>
      </div>
    `;
    //빽틱 조심
    tasksContainer.appendChild(task);
    addEventListeners();
    newTaskInput.value = "";
  }
};

// 엔터키 눌러도 할일이 추가되게 하기
newTaskInput.addEventListener("keyup", function (e: KeyboardEvent) {
  if (e.key === "Enter") {
    pushButton.click();
  }
});

function addEventListeners(): void {
  const deleteButtons = document.querySelectorAll(
    ".delete"
  ) as NodeListOf<HTMLButtonElement>;
  const editButtons = document.querySelectorAll(
    ".edit"
  ) as NodeListOf<HTMLButtonElement>;

  deleteButtons.forEach((deleteButton) => {
    deleteButton.onclick = function () {
      const taskElement = deleteButton.closest(".task") as HTMLDivElement;
      if (taskElement) {
        taskElement.remove();
      }
    };
  });

  editButtons.forEach((editButton) => {
    editButton.onclick = function () {
      const taskElement = editButton.closest(".task") as HTMLDivElement;
      if (!taskElement) return;

      const taskNameElement = taskElement.querySelector(
        "#taskname"
      ) as HTMLSpanElement;
      const currentTaskName = taskNameElement.innerText;

      if (!taskElement.classList.contains("editing")) {
        taskElement.classList.add("editing");

        taskNameElement.innerHTML = `
          <input type="text" value="${currentTaskName}" />
          <button class="save">✔</button>
        `;

        const saveButton = taskNameElement.querySelector(
          ".save"
        ) as HTMLButtonElement;
        const taskInput = taskNameElement.querySelector(
          "input"
        ) as HTMLInputElement;

        saveButton.onclick = function () {
          const newTaskName = taskInput.value;
          taskNameElement.innerHTML = newTaskName;
          taskElement.classList.remove("editing");
        };
      }
    };
  });
}

addEventListeners();
