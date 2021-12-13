import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import ChangeAcct from "../components/changeAcct/changeAcct";
import Navbar from "../components/NavBar/Navbar";
import Message from "../components/Message/Message";
import DrinkCont from "../components/DrinkCont/DrinkCont";

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
      return () => {};
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
        localStorage.removeItem(`username`);
        localStorage.setItem(`username`, res.data);
        setMessage(`Successfully changed info, ${res.data}`);
      }
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
  const [drinkArr, setDrinkArr] = useState([]);
  let isloaded = localStorage.getItem(`likedDrinks`);
  useEffect(() => {
    getUname();
    let arr;
    let drinkArr = [];
    (async () => {
      if (localStorage.getItem(`likedDrinks`)) {
        arr = localStorage.getItem(`likedDrinks`).split(`,`);
      } else {
        try {
          let likedidList = await axios.get(`/api/user/like/list`);
          arr = likedidList.data;
          localStorage.setItem("likedDrinks", likedidList.data);
        } catch (error) {
          setMessage(error.response.data);
          return () => {};
        }
      }
      for (let drinkid of arr) {
        let res = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkid}`
        );
        if (res.data.drinks !== undefined) {
          drinkArr.push(res.data.drinks[0]);
        } else {
          return () => {};
        }
      }
      setDrinkArr(drinkArr);
      return () => {};
    })();
  }, [isloaded, getUname]);
  return (
    <>
      <Navbar title="Profile Page" />
      <div className="usercontent" style={{ marginTop: "5em" }}>
        <ChangeAcct onSubmit={changeInfo} onClick={deleteAcct} />
        <h2 style={{ marginTop: "1em" }}>
          {drinkArr.length > 0
            ? `Liked Drinks`
            : "Like Some Drinks to See Some here!"}
        </h2>
        <DrinkCont drinkArr={drinkArr} setMessage={setMessage} />
        <Message message={message} />
      </div>
    </>
  );
};

export default User;
