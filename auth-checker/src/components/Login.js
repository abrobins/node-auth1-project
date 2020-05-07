import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Button = styled.div`
  width: 15%;
  margin: 0 auto;
  border-radius: 1.5rem;
  background-color: #ffc357;
  box-shadow: 2px 2px #d88144;
  color: #084f93;
  font-size: 1.5rem;
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

// const Input = styled.input`
// width: 100%;
// margin: 45px;
// padding:20px;
// `
const Login = props => {
  console.log(props);
  const [user, setUser] = useState({ username: "", password: "" });
  const handleChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    console.log("user", user);
    // setUser({ username: "", email: "", password: "" });
    axios
      .post("http://localhost:5008/api/auth/login", user, {
        withCredentials: true
      })
      .then(res => {
        console.log("Log in data", res.data);
        localStorage.setItem("token", res.data.token);
        window.location.href = "/";
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div className="App">
      {console.log(user)}
      <h1> Log In</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          name="username"
          value={user.username}
          onChange={handleChange}
        />

        <br />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <br />
        <Button onClick={handleSubmit}>Submit!</Button>
        <p>
          If you do not have a user account, please{" "}
          <Link to="/register">register</Link>
        </p>
      </form>
    </div>
  );
  //   handleSubmit: (user) => {
  //   console.log("Submitted!",user)
  //   axios.post("http://anytime-fitness-be.herokuapp.com/api/auth/login",user)
  //   .then(res => {
  //     console.log("Log in data",res.data);
  //   })
  //   .catch(error => {console.log(error)})
  // }
};
export default Login;
