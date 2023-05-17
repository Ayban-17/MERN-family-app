import { Box, TextField, Button } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
const EditMember = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({});
  const [memberData, setMemberData] = useState(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const getMemberToEdit = async (id) => {
    try {
      const member = await axios.get(
        `http://localhost:4000/api/v1/family/members/${id}`
      );
      const data = await member.data;
      setMemberData(data);
    } catch (error) {
      console.log("The error is " + error);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(`http://localhost:4000/api/v1/family/members/${id}`, formData)
      .then(() => (window.location = "/"))
      .catch((err) => console.log("The error is " + err));
  };
  useEffect(() => {
    getMemberToEdit(id);
  }, [id]);

  return (
    memberData && (
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
                defaultValue={memberData.name}
                onChange={handleInputChange}
              />
              <TextField
                required
                label="Relation"
                onChange={handleInputChange}
                name="relation"
                defaultValue={memberData.relation}
              />
              <TextField
                required
                label="Location"
                onChange={handleInputChange}
                name="location"
                defaultValue={memberData.location}
              />
              <TextField
                required
                label="Age"
                type="number"
                name="age"
                defaultValue={memberData.age}
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
                defaultValue={memberData.gender}
              />
              <TextField
                required
                label="Moto"
                onChange={handleInputChange}
                name="moto"
                defaultValue={memberData.moto}
              />
              <TextField
                required
                label="Description"
                name="description"
                defaultValue={memberData.description}
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
    )
  );
};

export default EditMember;
