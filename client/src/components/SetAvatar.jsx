import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
    };

    useEffect(() => {
        async function fetchData() {
            if (!localStorage.getItem(process.env.PULSE_APP_LOCALHOST_KEY)) {
                if (!navigate) return;
                navigate("/login");
            }
        }
        fetchData();
    }, [navigate]);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        } else {
            const user = await JSON.parse(
                localStorage.getItem(process.env.PULSE_APP_LOCALHOST_KEY)
            );

            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });

            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem(
                    process.env.PULSE_APP_LOCALHOST_KEY,
                    JSON.stringify(user)
                );
                navigate("/");
            } else {
                toast.error("Error setting avatar. Please try again.", toastOptions);
            }
        }
    };

    useEffect(() => {
        async function fetchData() {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(
                    `https://api.multiavatar.com/4645646/${Math.round(Math.random() * 1000)}`
                );
                // const buffer = new Buffer.from(string[image.data, encoding]);
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return (
        <>
            {isLoading ? (
                <Container>
                    <img src={loader} alt="loader" className="loader" />
                </Container>
            ) : (
                <Container>
                    <div className="title-container">
                        <h1 className="mobile-hide">Pick an Avatar as your profile picture</h1>
                        <h1 className="desktop-hide">Pick an Avatar</h1>
                    </div>
                    <div className="avatars">
                        {avatars.map((avatar, index) => {
                            return (
                                <div
                                    className={`avatar ${selectedAvatar === index ? "selected" : ""
                                        }`}
                                    key={uuidv4()}
                                >
                                    <img
                                        src={`data:image/svg+xml;base64,${avatar}`}
                                        alt="avatar"
                                        key={avatar}
                                        onClick={() => setSelectedAvatar(index)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <button onClick={setProfilePicture} className="submit-btn">
                        Set as Profile Picture
                    </button>
                    <ToastContainer />
                </Container>
            )}
        </>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  @media screen and (max-width: 600px) {
    gap: 1rem;
  }
  background-color: white;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: black;
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
  }
  .avatars {
    display: flex;
    @media screen and (max-width: 600px) {
        flex-direction: column;
      }
    gap: 2rem;
    @media screen and (max-width: 600px) {
        gap: 0.3rem;
      }
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
        @media screen and (max-width: 600px) {
            height: 5rem;
          }
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    @media screen and (max-width: 600px) {
        margin: 0rem 1.5rem;
        font-size: 0.7rem;
      }
    &:hover {
      background-color: #4e0eff;
      transition: 0.3s ease-in-out;
    }
  }
`;