import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const EmployeeTable = ({ employees }) => {
  return (
    <div className="p-4">
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id}>
              <td>{index + 1}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <Link to={`/edit/${employee.id}`} className="btn btn-primary">
                  EDIT
                </Link>
                <button className="btn btn-danger">DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
