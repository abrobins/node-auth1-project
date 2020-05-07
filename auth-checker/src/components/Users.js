import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Styled from "styled-components";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const Cards = Styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;
const Card = Styled.div`
  margin: 2rem 6rem;
  padding: 1rem;
  background-color: #ffc357;
  box-shadow: 2px 2px #d88144;
  border-radius: 1.5rem;
`;

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/api/users", { withCredentials: true })
      .then(res => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <Cards>
        {users.map(user => (
          <Card>
            <h3>Username: {user.username}</h3>
          </Card>
        ))}
      </Cards>
    </div>
  );
};

export default Users;
