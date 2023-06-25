import React, { useEffect, useState } from "react";
import socketIo from "socket.io-client";
import Message from "./message/message";
import ReactScrollToBottom from "react-scroll-to-bottom";

const ENDPOINT = `http://localhost:4500`;
let socket;

function Chat({ value }) {
  const [id, setid] = useState("");
  const [message, setMessage] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };
  console.log("Mesaage",message)

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      alert("connected");
      setid(socket.id);
    });

    socket.emit("joined", { value });
    socket.on("welcome", (data) => {
      setMessage((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message);
    });
    socket.on("userJoined", (data) => {
      setMessage((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message);
    });
    socket.on("leave", (data) => {
      setMessage((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessage((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message, data.id);
    });

    return () => {
      socket.off();
    };
  }, [message]);

  return (
    <div
      style={{ height: "400px", marginTop: "10%" }}
      className="container bg-dark w-50 d-flex flex-column justify-content-between p-2"
    >
      <div className="text-white text-center" >
        <h1>CCHAT APP</h1>
      </div>
      <ReactScrollToBottom className="overflow-auto">
        {message.map((e, index) => (
          <Message
            key={index}
            message={e.message}
            classs={e.id === id ? `right` : `left`}
            user={e.id === id ? `` : e.user}
          />
        ))}
      </ReactScrollToBottom>
      <div className="p-3">
        <div className="input-group">
          <input
            className="form-control"
            id="chatInput"
            type="text"
            placeholder="Enter Your Message"
          />
          <button onClick={send} className="btn border">
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
