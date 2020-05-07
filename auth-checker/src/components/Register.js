import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import styled from "styled-components";

const Button = styled.div`
  width: 15%;
  margin: 0 auto;
  padding: 10px;
  border-radius: 1.5rem;
  background-color: #ffc357;
  box-shadow: 2px 2px #d88144;
  color: #084f93;
  font-size: 1.2rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 200px;
  padding: 10px;
  margin: 10px;
  font-size: 1.2rem;
  border-box: 1px solid, black;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-image: none;
    background-color: #4dd0e1;
  }
  &:disabled {
    background-image: none;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.1);
    cursor: not-allowed;
  }
`;

const Register = props => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: ""
  });

  const handleChanges = e => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    //axiosWithAuth()
    axios
      .post("http://localhost:5008/api/auth/register", newUser)
      .then(res => {
        console.log("register response.data", res.data);
        window.location.href = "/";

        //props.history.push("/");

        // localStorage.setItem("token", res.data.payload);
        // setNewUser(res.data);
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  return (
    <div>
      {console.log(newUser)}
      <h1>Add New User</h1>
      <form>
        <p>
          <Input
            id="username"
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChanges}
          />
        </p>
        <p>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChanges}
          />
        </p>
        <Button onClick={onSubmit}>Create New User</Button>
      </form>
    </div>
  );
};

export default Register;
