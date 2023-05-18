import axios from "axios";
import Cards from "../components/Cards";
import { useQuery } from "react-query";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { Bars } from "react-loader-spinner";

const FAMILY_MEMBERS_QUERY_KEY = "familyMembers";

const Home = ({ member, handleDeleteMember, setOneMember, oneMember }) => {
  const { isLoading, error } = useQuery(FAMILY_MEMBERS_QUERY_KEY, () =>
    axios
      .get("https://family-app-l7m7.onrender.com/api/v1/family/members")
      .then((response) => response.data)
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: 100,
          maxWidth: "100wvw",
          minHeight: 200,
          height: "80vh",
        }}
        className="loader-container"
      >
        <Bars type="BallTriangle" color="#00BFFF" height={100} width={80} />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <Cards
        member={member}
        handleDeleteMember={handleDeleteMember}
        setOneMember={setOneMember}
        oneMember={oneMember}
      />
    </div>
  );
};

export default Home;
