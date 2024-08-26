import "./main";
import "./styles/home.scss";

const todoEle = document.getElementById("todo_task");
const todo_task = localStorage.getItem("todo");
const todos = todo_task ? JSON.parse(todo_task) : [];
const today = new Date();
let year = today.getFullYear();
let month = (today.getMonth() + 1).toString(); // 월을 01이 아니라 1처럼 2자리로 표시
let date = today.getDate().toString(); // 일도 마찬가지.
let today_date = year + "-" + month + "-" + date; // 2024-8-22일처럼 나오게 조합
const filteredTodos = todos.find(
  (item: { year: any; month: any; day: any }) => {
    let Date = `${item.year}-${item.month}-${item.day}`;
    return Date === today_date; //오늘 날짜랑 내가 조합한 날짜랑 같은 것만 나오게 return
  }
);

const eventList = filteredTodos?.events;

const titles = eventList?.map((event: any) => `<li>${event.title}</li>`);

todoEle &&
  (todoEle.innerHTML =
    titles?.length > 0
      ? titles.join("\n") // title이 있을 때
      : "등록된 할 일이 없습니다."); // title이 없을 때
