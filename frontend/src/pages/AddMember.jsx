import { Box, TextField, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const styles = {
  input: {
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    WebkitAppearance: "textfield",
    "&[type=number]": {
      WebkitAppearance: "textfield",
    },
  },
};

const initialFormData = {
  name: "",
  relation: "",
  location: "",
  age: "",
  gender: "",
  moto: "",
  description: "",
};

const AddMember = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/api/v1/family/members", formData)
      .then(() => (window.location = "/"))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          p: "2rem",
          display: "flex",
          justifyContent: "center",
          "& .MuiTextField-root": { m: 1, width: "400px" },
        }}
      >
        <Box
          sx={{
            border: "3px solid",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            width: "fit-content",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              p: "2rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              required
              label="Full Name"
              name="name"
              onChange={handleInputChange}
            />
            <TextField
              required
              label="Relation"
              onChange={handleInputChange}
              name="relation"
            />
            <TextField
              required
              label="Location"
              onChange={handleInputChange}
              name="location"
            />
            <TextField
              required
              label="Age"
              type="number"
              name="age"
              sx={{ ...styles }}
              onChange={handleInputChange}
            />
          </Box>
          <Box
            sx={{
              p: "2rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              required
              label="Gender"
              onChange={handleInputChange}
              name="gender"
            />
            <TextField
              required
              label="Moto"
              onChange={handleInputChange}
              name="moto"
            />
            <TextField
              required
              label="Description"
              name="description"
              onChange={handleInputChange}
            />

            <Button
              type="submit"
              variant="outlined"
              sx={{
                width: "400px",
                alignSelf: "center",
                my: "8px",
                height: "55px",
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default AddMember;
