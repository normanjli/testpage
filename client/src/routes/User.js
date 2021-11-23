import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import ChangeAcct from "../components/changeAcct";
const User = () => {
  const [message, setMessage] = useState(`Getting User Info...`);
  const navigate = useNavigate();
  const getUname = useCallback(async () => {
    try {
      let res = await axios.get(`/api/user`, { withCredentials: true });
      setMessage(`Welcome ${res.data}`);
    } catch (res) {
      setMessage(
        `Please login first! Automatically redirecting you to login page...`
      );
      setTimeout(() => navigate("/login", { replace: true }), 5000);
    }
  }, [navigate]);
  const changeInfo = async (data) => {
    try {
      setMessage(`Trying to change Account info...`);
      let res = await axios.put(
        `/api/user/change`,
        { data },
        { withCredentials: true }
      );
      if (+res.status === 200) {
        setMessage(`Successfully changed info`);
      }
      return;
    } catch (error) {
      if (error.response.status === 401) {
        setMessage(`Enter the correct old Password`);
      } else {
        setMessage(
          `Could not update User Info (CODE:${error.response.status}). Try again`
        );
      }
    }
  };
  const deleteAcct = async (data) => {
    if (window.confirm(`Are you sure you want to delete your Account?`)) {
      try {
        let res = await axios.delete(`/api/user/delete`, {
          withCredentials: true,
        });
        if (res.status !== 200) {
          throw res.status;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => getUname(), [getUname]);
  return (
    <div>
      <div style={{ height: 3 + `em`, textAlign: `center` }}>
        <h1>{message}</h1>
      </div>
      <ChangeAcct onSubmit={changeInfo} onClick={deleteAcct} />
    </div>
  );
};

export default User;
