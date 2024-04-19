"use strict";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/create", (req, res) => {
  const title = req.body["title"];
  const content = req.body["content"];
  res.render("index.ejs", {
    title: title,
    content: content,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
