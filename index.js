"use strict";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to override request method based on _method field.
function methodOverride(req, res, next) {
  // Check if the request method is POST.
  if (req.method === "POST") {
    // Check if _method field exists in request body.
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // Override request method with the value of _method field.
      req.method = req.body._method.toUpperCase();
      // Remove _method field from request body.
      delete req.body._method;
    }
  }

  // Move to the next middleware.
  next();
}

// Mount the middleware.
app.use(methodOverride);

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

app.get("/edit/:postId", (req, res) => {
  // Get postId from the url.
  const postId = req.params.postId;

  // Check if any post title matches the desired title.
  const post = posts.find((post) => post.title === postId);
  if (!post) {
    res.status(404).send("Post not found!");
    return;
  }

  res.render("edit.ejs", { post });
});

app.post("/edit/:postId", (req, res) => {
  // Get postId from the url.
  const postId = req.params.postId;
  const updatedTitle = req.body["title"];
  const updatedContent = req.body["content"];

  // Find the post to edit.
  const postIndex = posts.findIndex((post) => post.title === postId);
  if (postIndex === -1) {
    res.status(404).send("Post not found");
    return;
  }

  // Update the post.
  posts[postIndex].title = updatedTitle;
  posts[postIndex].content = updatedContent;

  res.redirect("/view");
});

app.delete("/delete/:postId", (req, res) => {
  const postId = req.params.postId;

  // Find the post to delete.
  const postIndex = posts.findIndex((post) => post.title === postId);
  if (postIndex === -1) {
    res.status(404).send("Post not found");
    return;
  }

  // Remove the item from the array
  posts.splice(postIndex, 1);

  res.redirect("/view");
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
  {
    title: "Where does it come from?",
    content:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum'(The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.",
  },
  {
    title: "Why do we use it?",
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  },
  {
    title: "Where can I get some?",
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
  },
];
