import React from "react";
import Cards from "../components/Cards";

const Home = ({ member, handleDeleteMember, setOneMember, oneMember }) => {
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
