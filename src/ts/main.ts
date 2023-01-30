import { addTodo, changeTodo, removeAllTodos } from "./functions";
import { Todo } from "./models/Todo";

let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

export function clearButton() {
  document.getElementById("clearTodos")?.addEventListener("click", () => {
    exports.clearTodos(todos);
  });
}

export function newForm() {
  (document.getElementById("newTodoForm") as HTMLFormElement)?.addEventListener(
    "submit",
    (e: SubmitEvent) => {
      e.preventDefault();

      let todoText: string = (
        document.getElementById("newTodoText") as HTMLInputElement
      ).value;

      exports.createNewTodo(todoText, todos);
    }
  );
}

export function createNewTodo(todoText: string, todos: Todo[]) {
  let result = addTodo(todoText, todos);

  if (result.success) {
    createHtml(todos);
  } else {
    displayError(result.error, true);
  }
}

export function createHtml(todos: Todo[]) {
  localStorage.setItem("todos", JSON.stringify(todos));

  let todosContainer: HTMLUListElement = document.getElementById(
    "todos"
  ) as HTMLUListElement;

  todosContainer.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    let li: HTMLLIElement = document.createElement("li");

    if (todos[i].done) {
      li.classList.add("todo__text--done");
    }

    li.classList.add("todo__text");
    li.innerHTML = todos[i].text;
    li.addEventListener("click", () => {
      toggleTodo(todos[i]);
    });

    todosContainer.appendChild(li);
  }
}

export function toggleTodo(todo: Todo) {
  changeTodo(todo);
  exports.createHtml(todos);
}

export function displayError(error: string, show: boolean) {
  let errorContainer: HTMLDivElement = document.getElementById(
    "error"
  ) as HTMLDivElement;

  errorContainer.innerHTML = error;

  if (show) {
    errorContainer.classList.add("show");
  } else {
    errorContainer.classList.remove("show");
  }
}

export function clearTodos(todos: Todo[]) {
  removeAllTodos(todos);
  createHtml(todos);
}

document.getElementById("sortTodos")?.addEventListener("click", () => {
  sortTodos(todos);
});

export function sortTodos(todos: Todo[]) {
  todos.sort((a, b) => {
    if (a.text < b.text) return -1;
    if (a.text > b.text) return 1;
    return 0;
  });
  createHtml(todos);
}

//createHtml(todos);
clearButton();
newForm();