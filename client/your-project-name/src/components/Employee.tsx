import React, { useEffect, useState } from "react";

interface Props {
  employees: EmployeeTypes[];
}

interface EmployeeTypes {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
}

const Employee: React.FC<Props> = ({ employees }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if employees is null or empty
    if (!employees || employees.length === 0) {
      setIsLoading(true); // Set loading state to true
    } else {
      setIsLoading(false); // Set loading state to false once data is available
    }
  }, [employees]); // Run effect whenever employees prop changes

  // Render loading message if loading state is true
  if (isLoading) {
    return <p>Loading Employee Data....</p>;
  }

  console.log(`employees employeecomponent`, employees);
  // Render employee data once loading is complete
  return (
    <>
      {employees &&
        employees.map((employee) => (
          <div key={employee.id}>
            <p>{employee.firstName}</p>
          </div>
        ))}
    </>
  );
};

export default Employee;
