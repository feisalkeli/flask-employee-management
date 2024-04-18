import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditEmployee from "./EditEmployee";
const EditForm = () => {
  const { employeeid } = useParams();
  console.log(employeeid, "myid");

  const [singleEmployee, setSingleEmployee] = useState([]);

  const fetchSingleEmployeeData = async () => {
    const response = await fetch(
      `http://127.0.0.1:5000/user/user/${employeeid}`
    );
    if (!response) {
      throw new Error("Could not fetch a single employee");
    }
    const data = await response.json();
    setSingleEmployee(data);
    console.log(`singleEmployee`, singleEmployee);
  };

  useEffect(() => {
    fetchSingleEmployeeData();
  }, []);
  return (
    <>
      <EditEmployee singleEmployee={singleEmployee} />
    </>
  );
};

export default EditForm;
