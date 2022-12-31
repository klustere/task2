window.addEventListener("load", () => {
  console.log("page loaded");

  todos = JSON.parse(localStorage.getItem("todos")) || [];

  const newTodoForm = document.querySelector("#new-todo-form");

  newTodoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const todo = {
      title: event.target.elements.title.value,
      description: event.target.elements.description.value,
      deadline: event.target.elements.deadline.value,
      done: false,
    };

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

    event.target.reset();

    displayTodos();
  });
  displayTodos();
});

function displayTodos() {
  const taskCounter = document.querySelector("#task-counter");
  let incompleteTasks = 0;
  todos.forEach((todo) => {
    if (todo.done == false) incompleteTasks += 1;
  });
  let emoji = null;
  if (incompleteTasks == 0) emoji = "😊";
  else if (incompleteTasks <= 2) emoji = "🙂";
  else if (incompleteTasks <= 4) emoji = "😶";
  else if (incompleteTasks <= 8) emoji = "🥵";
  taskCounter.innerHTML =
    incompleteTasks +
    " tasks remaining " +
    '<span class="emoji">' +
    emoji +
    "</span>";

  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const todoItemMain = document.createElement("div");
    todoItemMain.classList.add("todo-item-main");

    const todoItemInfo = document.createElement("div");
    todoItemInfo.classList.add("todo-item-info");
    todoItemInfo.classList.add("hidden");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    todoItemMain.appendChild(checkbox);

    const title = document.createElement("div");
    if (todo.title.length >= 25)
      title.innerHTML = todo.title.slice(0, 22) + "...";
    else title.innerHTML = todo.title;
    title.classList.add("itemTitle");
    todoItemMain.appendChild(title);

    const editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.innerHTML = "More";
    todoItemMain.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.innerHTML = "Delete";
    todoItemMain.appendChild(deleteButton);

    const description = document.createElement("p");
    description.innerHTML = "Description: " + todo.description;

    const due = document.createElement("p");
    due.innerHTML = "Due: " + todo.deadline;

    todoItemInfo.appendChild(description);
    todoItemInfo.appendChild(due);

    todoItem.appendChild(todoItemMain);
    todoItem.appendChild(todoItemInfo);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
      checkbox.checked = true;
    }

    checkbox.addEventListener("change", (event) => {
      todo.done = event.target.checked;

      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) todoItem.classList.add("done");
      else todoItem.classList.remove("done");

      // displayTodos();
    });

    editButton.addEventListener("click", (event) => {
      console.log(todoItemInfo.classList);
      if (todoItemInfo.classList.contains("hidden")) {
        console.log("contains hidden");
        todoItemInfo.classList.remove("hidden");
        editButton.innerHTML = "Less";
      } else {
        console.log("does not contain hidden");
        todoItemInfo.classList.add("hidden");
        editButton.innerHTML = "More";
      }

      // displayTodos();
    });

    deleteButton.addEventListener("click", (event) => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      displayTodos();
    });
  });
}

const clearTaskBtn = document.querySelector("#clear-task");
clearTaskBtn.addEventListener("click", (event) => {
  todos = todos.filter((t) => t.done == false);
  localStorage.setItem("todos", JSON.stringify(todos));
  displayTodos();
});
