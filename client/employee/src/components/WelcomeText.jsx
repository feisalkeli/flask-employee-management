import React from "react";
import { useNavigate } from "react-router-dom";
const WelcomeText = () => {
  const navigate = useNavigate();

  function routeToPostPageForm() {
    navigate("/post");
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col text-center mt-5">
          <div className="fw-bold fs-4">
            Welcome to the HR Management system
          </div>
          <div className="mt-3">
            <p className="fw-bold">Add Employee</p>
            <button
              type="button"
              className="btn btn-primary ms-3"
              onClick={routeToPostPageForm}
            >
              Add New Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeText;
