import "./main";
import "./styles/home.scss";

const todoText = document.querySelector('.todo-task');
todoText.textContent = localStorage.getItem('todo');