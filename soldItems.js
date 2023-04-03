let fs = require("fs");
let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  let soldItems = getData();
  let total = 0;
  soldItems.forEach((c) => (total += Number(c.amount)));
  res.render("soldItems", { soldItems: soldItems, total: total >= 0 ? total : 0 });
});

router
  .route("/create")
  .get((req, res) => {
    res.render("create");
  })
  .post((req, res) => {
    let soldItems = getData();

    soldItems.push({
      id: Math.random().toString(16).slice(2),
      name: req.body.name,
      price: req.body.price,
    });

    saveData(soldItems);
    res.redirect("/soldItems");
  });

router.delete("/delete", (req, res) => {
  let soldItems = getData();

function remove(soldItems, id) {
  return soldItems.filter((item) => item.id !== id);
}


  saveData(newSoldItems);

  res.json({ deleted: true });
});

function getData() {
  return JSON.parse(fs.readFileSync(`./data/soldItems.json`));
}

function saveData(soldItems) {
  fs.writeFileSync(`./data/soldItems.json`, JSON.stringify(soldItems));
}

function remove(soldItems, id) {
  return soldItems.filter((calorie) => calorie.id != id);
}

module.exports = router;
