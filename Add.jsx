import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Add = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });

  const inputHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (location.state != null) {
      setInputs(location.state);
    }
  }, [location.state]);

  const addData = () => {

    if (location.state != null) {
      axios
        .put(`http://localhost:3001/update/${location.state._id}`, inputs)
        .then(() => {
          alert("Updated Successfully");
          navigate("/");
        })
        .catch((err) => console.log(err));

    } else {
      axios
        .post("http://localhost:3001/add", inputs)
        .then((res) => {
          alert(res.data.message);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "600px",
        }}
      >
        <TextField
          placeholder="Title"
          name="title"
          value={inputs.title}
          onChange={inputHandler}
        />

        <TextField
          placeholder="Content"
          name="content"
          value={inputs.content}
          onChange={inputHandler}
          multiline
          rows={4}
        />

        <TextField
          placeholder="Image URL"
          name="img_url"
          value={inputs.image}
          onChange={inputHandler}
        />

        <Button
          variant="contained"
          color="secondary"
          onClick={addData}
        >
          {location.state ? "Update Blog" : "Add Blog"}
        </Button>
      </Box>
    </Box>
  );
};

export default Add;