import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employee from "./components/Employee";

// Define Employee type
type EmployeeType = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
};

// Define AppState type for the state of the App component
type AppState = {
  employees: EmployeeType[];
};

// Define the App component
function App() {
  // Use AppState type for the state
  const [employees, setEmployees] = useState<AppState["employees"]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/user/user");
        if (!response.ok) {
          throw new Error("Could not fetch employees");
        }
        const data: EmployeeType[] = await response.json();
        setEmployees(data);
        console.log(data, "app component");
      } catch (error) {
        console.error(`Error fetching employees: ${error}`);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Pass employees as props to the Employee component */}
          <Route path="/" element={<Employee employees={employees} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
