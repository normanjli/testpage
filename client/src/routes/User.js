import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import ChangeAcct from "../components/changeAcct/changeAcct";
import Navbar from "../components/NavBar/Navbar";
const User = () => {
  const [message, setMessage] = useState(``);
  const navigate = useNavigate();
  const getUname = useCallback(() => {
    if (localStorage.getItem(`username`) !== null) {
      setMessage(`Welcome ${localStorage.getItem(`username`)}`);
    } else {
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
        if (res.data !== `success`) {
          localStorage.removeItem(`username`);
          localStorage.setItem(`username`, res.data);
        }
        setMessage(`Successfully changed info, ${res.data}`);
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
    if (
      window.confirm(
        `Are you sure you want to delete your Account, ${localStorage.getItem(
          `username`
        )}? Your account data will be unrecoverable`
      )
    ) {
      try {
        let res = await axios.delete(`/api/user/delete`, { data });
        setMessage(res.data);
        localStorage.removeItem(`username`);
        setTimeout(() => navigate(`/`, { replace: true }), 1000);
      } catch (error) {
        setMessage(error.response.data);
      }
    }
  };
  useEffect(() => getUname(), [getUname]);
  return (
    <>
      <Navbar title="Profile Page" />
      <div
        style={{ height: "fit-content", textAlign: `center`, marginTop: "5em" }}
      >
        <h2>{message}</h2>
      </div>
      <ChangeAcct onSubmit={changeInfo} onClick={deleteAcct} />
    </>
  );
};

export default User;
