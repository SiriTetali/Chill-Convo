import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { loginRoute } from "../utils/APIRoutes";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
    };
    const [values, setValues] = useState({ username: "", password: "" });
    useEffect(() => {
        if (localStorage.getItem(process.env.ChillConvo_APP_LOCALHOST_KEY)) {
            if (!navigate) return;
            navigate("/");
        }
    }, [navigate]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { password, username } = values;
            const { data } = await axios.post(loginRoute, { username, password });
            if (data.status === false) toast.error(data.msg, toastOptions)
            else if (data.status === true) {
                localStorage.setItem(process.env.ChillConvo_APP_LOCALHOST_KEY, JSON.stringify(data.user));
                navigate("/");
            }
        }
    };
    const handleValidation = () => {
        const { password, username } = values;
        if (password === "" || username === "") { toast.error("Username and Password Required", toastOptions); return false; }
        return true;
    };
    const handleChange = (event) => { setValues({ ...values, [event.target.name]: event.target.value }) };
    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>ChillConvo</h1>
                    </div>
                    <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)} min="3" />
                    <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
                    <button type="submit">Log In</button>
                    <span>Don't have an account? <Link to="/register">Register</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: white;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 2rem;
  }
  h1 {
    color: black;
    text-transform: uppercase;
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: white;
  border-radius: 2rem;
  padding: 3rem 5rem;
}
input {
  background-color: transparent;
  padding: 1rem;
  border: 0.1rem solid #4e0eff;
  border-radius: 0.4rem;
  color: black;
  width: 100%;
  font-size: 1rem;
  &:focus {
    border: 0.1rem solid #997af0;
    outline: none;
  }
}
button {
  background-color: #997af0;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #4e0eff;
    transition: 0.3s ease-in-out;
  }
}
span {
  margin: auto;
  color: black;
  text-transform: uppercase;
  a {
    color: #4e0eff;
    text-decoration: none;
    font-weight: bold;
  }
  @media screen and (min-width: 0px) and (max-width: 450px) {
    font-size: 0.7rem;
  }
  @media screen and (min-width: 0px) and (max-width: 355px) {
    font-size: 0.5rem;
  }
}
`;