const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const appointmentService = require("./Services/AppointmentService");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/agendamento", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/cadastro", (req, res) => {
  res.render("create");
});
app.post("/create", async (req, res) => {
  let dados = req.body;
  if (
    dados.name != "" &&
    dados.email != "" &&
    dados.time != "" &&
    dados.date != ""
  ) {
    let status = await appointmentService.Create(req.body);
    if (status) {
      res.redirect("/");
    } else {
      res.send("Ocorreu uma falha!");
    }
  } else {
    res.send("Por favor preencha os campos E-mail, Nome Data e Hora...");
  }
});
app.listen(8080, () => {});
