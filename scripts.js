//zmienne wyszukują elementu id w kodzie HTML
const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUl = document.getElementById("todos");

//Analiza ciągu znaków JSON
const todos = JSON.parse(localStorage.getItem("todos"));

//sprawdzenie czy są jakieś dane z analizy ciągu znaków JSON zmienna todos
if (todos) {
  //każde wyszukane dane ze zmiannej to do zamienia na zmienna todo
  todos.forEach((todo) => {
    //wywołanie funcji addTodo ze zmienna todo
    addTodo(todo);
  });
}

//nasłuchuje zdarzenia zatwierdzenia formularza
form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});
//funkcja dodawania zadania
function addTodo(todo) {
  let todoTxt = input.value;
  // jeżeli jest zmienna todo jeżeli tak to dodaje do zmiennej todoTxt ciąg znaków ze zmiennej todo
  if (todo) {
    todoTxt = todo.text;
  }
  //jeżeli w zmiennej todoTxt jest ciąg znaków
  if (todoTxt) {
    //towrzy li w zmiennej todoEl
    const todoEl = document.createElement("li");
    //jezeli w zmiennej todo ii todo.compledted jest ciąg znaków dodaje do zmiennej todoEl klase o nazwie compledted
    if (todo && todo.completed) {
      todoEl.classList.toggle("completed");
    }
    //dodaje kod html w li ikona śmietnika
    todoEl.innerHTML = todoTxt + '<i id="trash" class="fas fa-trash-alt"></i>';
    //nasłuchuje kliknięcia w element
    todoEl.addEventListener("click", (e) => {
      todoEl.classList.toggle("completed");
      //wywołanie funcji LSUpdate()
      LSUpdate();
      //jeżeli klinięto w śmietnik
      if (e.target.matches(".fa-trash-alt")) {
        //kasuje zadanie
        todoEl.remove();
        //wywołanie funcji LSUpdate()
        LSUpdate();
      }
    });
    //dodaje do zminnej todosUl ciąg znaków z todoEl
    todosUl.appendChild(todoEl);
    //czyści input w formularzu
    input.value = "";
  }
  //wywołanie funcji LSUpdate()
  LSUpdate();
}
//funckja dodająca dane do local storage
function LSUpdate() {
  //zmienna pobierające wszystkie li z kodu html (zapytanie)
  const todoEl = document.querySelectorAll("li");
  //zmienna tablica
  const todos = [];
  //dla każdego elemenu li
  todoEl.forEach((todoEl) => {
    //przygotowanie danych za zapisu dane do localstorage text, compledted
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });
  //zapis w LS
  localStorage.setItem("todos", JSON.stringify(todos));
}
//po klinięciu w button dodaje do body klase dark-mode
function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}
