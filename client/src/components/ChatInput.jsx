import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const handleEmojiPickerhideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (event, emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
    };

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    };

    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
            <form className="input-container" onSubmit={(event) => sendChat(event)}>
                <input
                    type="text"
                    placeholder="Message"
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                />
                <button type="submit">
                    <IoMdSend />
                </button>
            </form>
        </Container>
    );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: white;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1.5rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: black;
    gap: 1rem;
    .emoji {
      position: relative;
      @media screen and (max-width: 650px) {
        right: 0.75rem;
      }
      svg {
        font-size: 1.5rem;
        color: rgb(222, 222, 222);
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: white;
        box-shadow: 0 5px 10px grey;
        border-color: black;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: white;
          width: 5px;
          &-thumb {
            background-color: black;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(2);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: black;
        }
        .emoji-group:before {
          color: black;
          background-color: white;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: rgb(237, 237, 237);
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: black;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      @media screen and (min-width: 0px) and (max-width: 800px) {
        font-size: 1rem;
      }
      &::selection {
        color: white;
        background-color: grey;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;