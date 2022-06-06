const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUl = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

function addTodo(todo) {
  let todoTxt = input.value;

  if (todo) {
    todoTxt = todo.text;
  }

  if (todoTxt) {
    const todoEl = document.createElement("li");

    if (todo && todo.completed) {
      todoEl.classList.toggle("completed");
    }

    todoEl.innerHTML = todoTxt + '<i id="trash" class="fas fa-trash-alt"></i>';

    todoEl.addEventListener("click", (e) => {
      todoEl.classList.toggle("completed");
      LSUpdate();
      if (e.target.matches(".fa-trash-alt")) {
        todoEl.remove();
        LSUpdate();
      }
    });

    todosUl.appendChild(todoEl);

    input.value = "";
  }

  LSUpdate();
}

function LSUpdate() {
  const todoEl = document.querySelectorAll("li");

  const todos = [];

  todoEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}
