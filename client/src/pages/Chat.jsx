import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

export default function Chat() {
    const navigate = useNavigate();
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        async function fetchData() {
            if (!localStorage.getItem(process.env.ChillConvo_APP_LOCALHOST_KEY)) {
                if (!navigate) return;
                navigate("/login");
            } else {
                setCurrentUser(
                    await JSON.parse(
                        localStorage.getItem(process.env.ChillConvo_APP_LOCALHOST_KEY)
                    )
                );
            }
        }
        fetchData();
    }, [navigate]);
    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser]);

    useEffect(() => {
        async function fetchData() {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    setContacts(data.data);
                } else {
                    if (!navigate) return;
                    navigate("/setAvatar");
                }
            }
        }
        fetchData();
    }, [currentUser, navigate]);
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
        setMenuClassName("hidden");
        setNavClassName("nav");
    };

    const [navClassName, setNavClassName] = useState("nav");
    const [menuClassName, setMenuClassName] = useState("");
    const menu = () => {
        if (navClassName === "nav") {
            setNavClassName("change");
            setMenuClassName("icon");
        }
        else {
            setNavClassName("nav");
            if (currentChat) setMenuClassName("hidden");
            else setMenuClassName("");
        }
        setContacts(contacts);
    }
    return (
        <>
            <Container>
                <div className="container">
                    <div className="navigation">
                        <div className={menuClassName} id="menu" onClick={() => menu()}>
                            <div id="bar1" className="bar"></div>
                            <div id="bar2" className="bar"></div>
                            <div id="bar3" className="bar"></div>
                        </div>
                        <div className={navClassName}>
                            <Contacts contacts={contacts} menu={menu} changeChat={handleChatChange} />
                        </div>
                    </div>
                    <div className="all-contacts">
                        <Contacts contacts={contacts} changeChat={handleChatChange} />
                    </div>
                    {currentChat === undefined ? (
                        <Welcome />
                    ) : (
                        <ChatContainer menu={menu} currentChat={currentChat} socket={socket} />
                    )}
                </div>
            </Container>
        </>
    );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: black;

  .hidden{
    display: none;
  }

  .navigation{
    transition: 0.5s fade-in;
    @media screen and (min-width: 800px) {
        display: none;
    }
   }

  .all-contacts{
    @media screen and (min-width: 0px) and (max-width: 800px) {
        display: none;
    }
   }

  #menu{
    width: 35px;
    height: 30px;
    margin: 30px 0 20px 20px;
    position: absolute;
    cursor: pointer;
    z-index: 2;
   }

  .bar{
    height: 5px;
    width: 100%;
    background-color: black;
    display: block;
    border-radius: 5px;
    transition: 0.3s ease;
   }

  #bar1{
    transform: translateY(-4px);
   }

  #bar3{
    transform: translateY(+4px);
   }

  .nav {
    padding: 0px;
    margin: 0 20px;
    display: none;
    }

   .icon .bar {
    background-color: black;
    }

   .icon #bar1 {
    transform: translateY(+4px) rotate(-45deg);
    }

    .icon #bar2 {
        opacity: 0;
    }

    .icon #bar3 {
        transform: translateY(-6px) rotate(+45deg);
    }

   .change {
    background-color: blue;
    height: 100vh;
    position: absolute;
    z-index: 1;
    width: 100vw;
    }

  .container {
    height: 100vh;
    width: 100vw;
    background-color: white;
    @media screen and (min-width: 800px) and (max-width: 1080px) {
        display: grid;
        grid-template-columns: 35% 65%;
    }
    @media screen and (min-width: 800px) {       
        display: grid;
        grid-template-columns: 25% 75%;
      }
  }
`;