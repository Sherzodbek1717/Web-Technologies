// third party libs
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));

// node libs
const fs = require("fs");
const PORT = 8080;

app.set("view engine", "pug");
app.set("views", "./views");
app.use("/static", express.static("public")); // assets
app.use(express.urlencoded({ extended: false }));

// localhost:8080
app.get("/", (req, res) => {

  console.log(req.query.added);

  fs.readFile("./data/medicines.json", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);

    res.render("home", { todos: todos, success: req.query.added });
  });
});

app.post("/add", (req, res) => {
  const formData = req.body;

  if (formData.todo.trim() == "") {
    fs.readFile("./data/medicines.json", (err, data) => {
      if (err) throw err;
      const todos = JSON.parse(data);
      res.render("home", { error: true, todos: todos });
    });
  } else {
    fs.readFile("./data/medicines.json", (err, data) => {
      if (err) throw err;

      const todos = JSON.parse(data);

      const todo = {
        id: id(),
        description: formData.todo,
        done: false,
      };

      todos.push(todo);

      fs.writeFile("./data/medicines.json", JSON.stringify(todos), (err) => {
        if (err) throw err;

        res.redirect("/?added=true");
      });
    });
  }
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("This app is running on port " + PORT);
});

app.get("/:id/delete", (req, res) => {
  const id = req.params.id;

  fs.readFile("./data/medicines.json", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);

    const filteredTodos = todos.filter((todo) => todo.id != id);

    fs.writeFile("./data/medicines.json", JSON.stringify(filteredTodos), (err) => {
      if (err) throw err;
      res.render("home", { todos: filteredTodos, delete: true });
    });
  });
});

app.get("/:id/update", (req, res) => {
  const id = req.params.id;

  fs.readFile("./data/medicines.json", (err, data) => {
    if (err) throw err;

    const todos = JSON.parse(data);
    const todo = todos.filter((todo) => todo.id == req.params.id)[0];

    const todoIdx = todos.indexOf(todo);
    const splicedTodo = todos.splice(todoIdx, 1)[0];

    splicedTodo.done = true;

    todos.push(splicedTodo);

    fs.writeFile("./data/medicines.json", JSON.stringify(todos), (err) => {
      if (err) throw err;

      res.render("home", { todos: todos });
    });
  });
});

function id() {
  return "_" + Math.random().toString(36).substr(2.9);
}

// all notes section

// app.get("/all_medicines", (req, res) => {
//   const notes = [
//     "some awesome medicine 1",
//     "Some awesome medicine 2",
//     " Some awesome medicine 3",
//   ];
//   res.render("all_medicines");
// });


const medicines = ["some awesome medicine 1", "some awesome medicine 2"]

app.get("/medicines", (req, res) => {
  res.render("medicines", { medicines: medicines });
});

