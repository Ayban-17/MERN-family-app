import axios from "axios";
import Cards from "../components/Cards";
import { useQuery } from "react-query";

const FAMILY_MEMBERS_QUERY_KEY = "familyMembers";

const Home = ({ member, handleDeleteMember, setOneMember, oneMember }) => {
  const { isLoading, error } = useQuery(FAMILY_MEMBERS_QUERY_KEY, () =>
    axios
      .get("https://family-app-l7m7.onrender.com/api/v1/family/members")
      .then((response) => response.data)
  );

  if (isLoading) {
    return <div>Loading...</div>;
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
