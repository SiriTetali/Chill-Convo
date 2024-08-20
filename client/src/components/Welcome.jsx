import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    async function fetchData() {
      setUserName(
        await JSON.parse(
          localStorage.getItem(process.env.PULSE_APP_LOCALHOST_KEY)
        ).username
      );
    }
    fetchData();
  }, []);
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1 className="desktop-hide">
        Welcome
      </h1>
      <h1 className="mobile-hide">
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  color: Black;
  flex-direction: column;
  img {
    height: 20rem;
    @media screen and (max-height: 600px) {
      display: none;
    }
  }
  span {
    color: #4e0eff;
  }
  h3{
    @media screen and (max-width: 600px) {
      font-size: 1rem;
    }
    @media screen and (max-width: 350px) {
      font-size: 0.7rem;
    }
  }
  .desktop-hide{
    @media screen and (min-width: 600px) {
      display: none;
    }
  }
  .mobile-hide{
    @media screen and (max-width: 600px) {
      display: none;
    }
}
`;