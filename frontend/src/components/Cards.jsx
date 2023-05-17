import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const Cards = ({ member, handleDeleteMember, setOneMember, oneMember }) => {
  const [open, setOpen] = useState(false);

  const handleOpenDetails = (id) => {
    axios
      .get(`http://localhost:4000/api/v1/family/members/${id}`)
      .then(() => {
        const findMember = member.find((data) => data._id === id);
        setOneMember(findMember);
      })
      .catch((error) => console.log(error));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          p: "1rem",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {member.map((data) => {
          const { _id, name, relation } = data;
          return (
            <Card
              key={_id}
              sx={{
                width: "400px",
                boxShadow: "2px 2px 30px rgba(43,23,93,.5)",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {relation}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                <Button size="small" onClick={() => handleOpenDetails(_id)}>
                  View Details
                </Button>
                <CardActions>
                  <Link to={`/edit/${_id}`}>
                    <EditIcon sx={{ color: "yellow", size: "small" }} />
                  </Link>
                  <Link to="/">
                    <DeleteIcon
                      sx={{ color: "red", size: "small" }}
                      onClick={() => handleDeleteMember(_id)}
                    />
                  </Link>
                </CardActions>
              </CardActions>
            </Card>
          );
        })}
      </Box>
      <Modals open={open} handleClose={handleClose} {...oneMember} />
    </>
  );
};

const Modals = ({
  open,
  handleClose,
  name,
  relation,
  location,
  age,
  gender,
  moto,
  description,
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            outline: "none",
            borderRadius: 8,
            width: 400,
            border: "2px solid #e0e0e0",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Details
          </Typography>
          <Typography variant="body1" gutterBottom>
            Name: {name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Age: {age}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Gender: {gender}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Location: {location}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Relation: {relation}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Moto: {moto}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Description: {description}
          </Typography>

          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Cards;
