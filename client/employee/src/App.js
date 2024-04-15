import { useEffect, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/user/user");
      if (!response.ok) {
        throw new Error("Could not fetch data correctly");
      }
      const data = await response.json();
      console.log(`data`, data);
      const userData = data.users;
      console.log(`userData`, userData);
      setEmployees(userData);
    } catch (error) {
      console.error(`Error while fetching employees ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(`employees`, employees);

  return (
    <div>
      {/* {isLoading && <p>Loading employees</p>}
      {!isLoading && employees.length > 0 ? (
        <div>
          {employees.map((user) => (
            <div key={user.id}>
              <p>{user.users.firstName}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>
          {employees.length === 0 ? "No employees found" : "Data Present..."}
        </p>
      )} */}

      {isLoading && <p>Loading Data....</p>}

      {employees.length > 0 ? (
        employees.map((user) => (
          <div key={user.id}>
            <p className="text-primary">{user.firstName}</p>
          </div>
        ))
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

export default App;
