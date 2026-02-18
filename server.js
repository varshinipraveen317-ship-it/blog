const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/blogDB")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });

const express = require("express");
const cors = require("cors");

const BlogModel = require("./model");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ADD BLOG
app.post("/add", async (req, res) => {
  try {
    const blog = new BlogModel(req.body);
    await blog.save();
    res.json({ message: "Blog added successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET BLOGS
app.get("/get", async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE BLOG
app.delete("/delete/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE BLOG
app.put("/update/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});