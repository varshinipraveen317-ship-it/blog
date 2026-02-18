import React, { useEffect, useState } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);  // State to store blogs
  const navigate = useNavigate();

  // ---------------------------
  // Fetch blogs from backend
  // ---------------------------
  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((response) => {
        console.log("Fetched blogs:", response.data); // Check backend data
        setBlogs(response.data);
      })
      .catch((error) => {
        console.log("Error fetching blogs:", error);
      });
  }, []);

  // ---------------------------
  // Delete a blog
  // ---------------------------
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)  // Use backticks for template string
      .then(() => {
        // Remove deleted blog from UI
        const updatedBlogs = blogs.filter((blog) => blog._id !== id);
        setBlogs(updatedBlogs);
      })
      .catch((error) => {
        console.log("Error deleting blog:", error);
      });
  };

  // ---------------------------
  // Navigate to Add/Edit page
  // ---------------------------
  const handleUpdate = (blog) => {
    navigate("/add", { state: blog });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card>
              {/* Blog Image */}
              <CardMedia
                component="img"
                height="200"
                image={blog.img_url || blog.image} // fallback if backend uses "image"
                alt={blog.title}
              />

              {/* Blog Details */}
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {blog.category}
                </Typography>

                <Typography variant="h6" gutterBottom>
                  {blog.title}
                </Typography>

                <Typography variant="body1" style={{ marginTop: "10px" }}>
                  {blog.content || "No content available"} {/* Show placeholder if empty */}
                </Typography>

                {/* Buttons */}
                <div style={{ marginTop: "15px" }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(blog._id)}
                    style={{ marginRight: "10px" }}
                  >
                    DELETE
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(blog)}
                  >
                    UPDATE
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;