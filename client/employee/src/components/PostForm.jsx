import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const PostForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  function routeToHome() {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/user/user/create_user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, lastName, userName, email }),
        }
      );
      if (response.ok) {
        navigate("/");
      }
      if (!response.ok) {
        throw new Error("Failed to post data");
      }
      // Handle success, such as displaying a success message
      console.log("Data posted successfully");
    } catch (error) {
      console.error("Error posting data:", error);
      // Handle error, such as displaying an error message to the user
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="mb-3">Post Employee Data</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              UserName:
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-around ">
            <div>
              {" "}
              <button
                type="submit"
                className="btn btn-success"
                onSubmit={handleSubmit}
              >
                Post Data
              </button>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary ms-5 "
                onClick={routeToHome}
              >
                Go To Home
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
