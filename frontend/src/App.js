import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddMember from "./pages/AddMember";
import EditMember from "./pages/EditMember";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [member, setMember] = useState([]);
  const [oneMember, setOneMember] = useState(null);

  const handleGetData = async () => {
    try {
      const family = await axios.get(
        "http://localhost:4000/api/v1/family/members"
      );
      const data = await family.data;
      setMember(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteMember = async (id) => {
    axios
      .delete(`http://localhost:4000/api/v1/family/members/${id}`)
      .then((res) => {
        const newData = member.filter((data) => data._id !== id);
        console.log(res.data);
        setMember(newData);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                member={member}
                handleDeleteMember={handleDeleteMember}
                oneMember={oneMember}
                setOneMember={setOneMember}
              />
            }
          />
          <Route path="/add" element={<AddMember />} />
          <Route path="/edit/:id" element={<EditMember />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
