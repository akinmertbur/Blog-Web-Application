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
  const titleOfPost = req.body["title"];
  const contentOfPost = req.body["content"];

  // Check whether title and blog post entered.
  if (titleOfPost && contentOfPost) {
    // Create object for the post.
    const postObj = { title: titleOfPost, content: contentOfPost };

    // Push the post object to the posts array.
    posts.push(postObj);
  }
  res.redirect("/");
});

app.get("/view", (req, res) => {
  res.render("index.ejs", {
    posts: posts,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const posts = [
  {
    title: "What is Lorem Ipsum?",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];
