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
app.use(express.json());

// localhost:8080

const soldItems = ["Item 1", "Item 2", "Item 3"];


app.get("/soldItems", (req, res) => {
  const soldItems = ["Item 1", "Item 2", "Item 3"];
  res.render("soldItems", { soldItems: soldItems });
});


app.get("/", (req, res) => {
  console.log(req.query.added);

  fs.readFile("./data/medicines.json", (err, data) => {
    if (err) throw err;
    const medicines = JSON.parse(data);

    res.render("page1", { medicines: medicines, success: req.query.added });
  });
});

app.post("/add", (req, res) => {
  const formData = req.body;

  if (formData.medicine.trim() == "") {
    fs.readFile("./data/medicines.json", (err, data) => {
      if (err) throw err;
      const medicines = JSON.parse(data);
      res.render("page1", { error: true, medicines: medicines });
    });
  } else {
    fs.readFile("./data/medicines.json", (err, data) => {
      if (err) throw err;

      const medicines = JSON.parse(data);

      const medicine = {
        id: id(),
        description: formData.medicine,
        done: false,
      };

      medicines.push(medicine);

      fs.writeFile(
        "./data/medicines.json",
        JSON.stringify(medicines),
        (err) => {
          if (err) throw err;

          res.redirect("/?added=true");
        }
      );
    });
  }
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("This app is running on port " + PORT);
});

app.get("/:id/remove", (req, res) => {
  const id = req.params.id;

  fs.readFile("./data/medicines.json", (err, data) => {
    if (err) throw err;
    const medicines = JSON.parse(data);

    const filteredMedicines = medicines.filter((medicine) => medicine.id != id);

    fs.writeFile(
      "./data/medicines.json",
      JSON.stringify(filteredMedicines),
      (err) => {
        if (err) throw err;
        res.render("page1", { medicines: filteredMedicines, remove: true });
      }
    );
  });
});

app.get("/:id/update", (req, res) => {
  const id = req.params.id;

  fs.readFile("./data/medicines.json", (err, data) => {
    if (err) throw err;

    const medicines = JSON.parse(data);
    const medicine = medicines.filter(
      (medicine) => medicine.id == req.params.id
    )[0];

    const medicineIdx = medicines.indexOf(medicine);
    const splicedMedicine = medicines.splice(medicineIdx, 1)[0];

    splicedMedicine.done = true;

    medicines.push(splicedMedicine);

    fs.writeFile("./data/medicines.json", JSON.stringify(medicines), (err) => {
      if (err) throw err;

      res.render("page1", { medicines: medicines });
    });
  });
});

function id() {
  return "_" + Math.random().toString(36).substr(2.9);
}

const medicines = ["some awesome medicine 1", "some awesome medicine 2"];

app.get("/medicines", (req, res) => {
  res.render("medicines", { medicines: medicines });
});

<<<<<<< HEAD
function goHome() {
  window.location.href = "/";
}
=======
// delete button for all medicines

// app.get("/:id/delete", (req, res) => {
//   const id = req.params.id;

//   fs.readFile("./data/medicines.json", (err, data) => {
//     if (err) throw err;
//     const medicines = JSON.parse(data);

//     const filteredMedicines = medicines.filter((medicine) => medicine.id != id);

//     fs.writeFile(
//       "./data/medicines.json",
//       JSON.stringify(filteredMedicines),
//       (err) => {
//         if (err) throw err;
//         res.render("medicines", { medicines: filteredMedicines, delete: true });
//       }
//     );
//   });
// });

// let medicines = getAll ("medicines")

//
>>>>>>> b5cff34647a77cc9d989eaa9ea2874acc1140656
