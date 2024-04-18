import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeText from "./components/WelcomeText";
import EmployeeTable from "./components/EmployeeTable";
import EditForm from "./components/EditForm";
import PostForm from "./components/PostForm";

function App() {
  const [employees, setEmployees] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/user/user");
      if (!response.ok) {
        throw new Error("Could not fetch data correctly");
      }
      const data = await response.json();
      const userData = data.users;
      setEmployees(userData);
    } catch (error) {
      console.error(`Error while fetching employees ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeText />} />
        <Route path="/" element={<EmployeeTable employees={employees} />} />
        <Route path="/edit/:employeeid" element={<EditForm />} />
        <Route path="/post" element={<PostForm />} />
      </Routes>
    </Router>
  );
}

export default App;
