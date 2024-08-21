import "./main";
import "./styles/todo.scss";

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

document.getElementById(
  "todo_current_date"
).innerHTML = `${year}년 ${month}월 ${day}일`;

document.querySelector("#push").onclick = function () {
  const taskValue = document.querySelector("#newtask input").value;

  if (taskValue.length == 0) {
    alert("오늘 할일이 없다고 ?! 그럴리가 없는데 !");
  } else {
    const task = document.createElement("div");
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

    document.querySelector("#tasks").appendChild(task);

    addEventListeners();

    document.querySelector("#newtask input").value = "";
  }
};

// 엔터키 눌러도 할일이 추가되게 하기
document
  .querySelector("#newtask input")
  .addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      document.querySelector("#push").click();
    }
  });

function addEventListeners() {
  let current_tasks = document.querySelectorAll(".delete");
  let edit_buttons = document.querySelectorAll(".edit");

  for (let i = 0; i < current_tasks.length; i++) {
    // Delete functionality
    current_tasks[i].onclick = function () {
      this.closest(".task").remove();
    };
  }

  for (let i = 0; i < edit_buttons.length; i++) {
    // Edit functionality
    edit_buttons[i].onclick = function () {
      const taskElement = this.closest(".task");
      const taskNameElement = taskElement.querySelector("#taskname");
      const currentTaskName = taskNameElement.innerText;

      if (!taskElement.classList.contains("editing")) {
        taskElement.classList.add("editing");

        taskNameElement.innerHTML = `
          <input type="text" value="${currentTaskName}" />
          <button class="save">✔</button>
        `;

        taskNameElement.querySelector(".save").onclick = function () {
          const newTaskName = taskNameElement.querySelector("input").value;
          taskNameElement.innerHTML = newTaskName;
          taskElement.classList.remove("editing");
        };
      }
    };
  }

  // let tasks = document.querySelectorAll("#taskname");
  // for (let i = 0; i < tasks.length; i++) {
  //   tasks[i].onclick = function () {
  //     this.classList.toggle("completed");
  //   };
  // }
  //수정필요( line-through 기능)
}

addEventListeners();

//타이머 스크립트

let workTittle = document.getElementById("work");
let breakTittle = document.getElementById("break");

let workTime = 25;
let breakTime = 5;

let seconds = "00";

// display
window.onload = () => {
  document.getElementById("minutes").innerHTML = workTime;
  document.getElementById("seconds").innerHTML = seconds;

  workTittle.classList.add("active");
};

// start timer
function start() {
  // change button
  document.getElementById("start").style.display = "none";
  document.getElementById("reset").style.display = "block";

  // change the time
  seconds = 59;

  let workMinutes = workTime - 1;
  let breakMinutes = breakTime - 1;

  breakCount = 0;

  let timerFunction = () => {
    document.getElementById("minutes").innerHTML = workMinutes;
    document.getElementById("seconds").innerHTML = seconds;

    seconds = seconds - 1;

    if (seconds === 0) {
      workMinutes = workMinutes - 1;
      if (workMinutes === -1) {
        if (breakCount % 2 === 0) {
          workMinutes = breakMinutes;
          breakCount++;

          workTittle.classList.remove("active");
          breakTittle.classList.add("active");
        } else {
          workMinutes = workTime;
          breakCount++;

          breakTittle.classList.remove("active");
          workTittle.classList.add("active");
        }
      }
      seconds = 59;
    }
  };

  setInterval(timerFunction, 1000); // 1000 = 1s
}
