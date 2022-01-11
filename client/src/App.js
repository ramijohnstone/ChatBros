import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Header from "./header.js";
import "./App.css";

let socket;
const CONNECTION_PORT = "localhost:3002/";

function App() {
  // Avant la connection
  const [loggedIn, setLoggedIn] = useState(false);
  const [salle, setSalle] = useState("");
  const [userNom, setUserNom] = useState("");

  // Apres le login
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on("message-reçu", data => {
      setMessageList([...messageList, data]);
    });
  });
  const connectionSalle = () => {
    setLoggedIn(true);
    socket.emit("rejoin-salle", salle);
  };

  const envoiMessage = async () => {
    let messageContent = {
      salle: salle,
      contient: {
        perssone: userNom,
        message: message
      }
    };

    await socket.emit("envoi-message", messageContent);
    setMessageList([...messageList, messageContent.contient]);
    setMessage("");
  };

  return (
    <div className="App">
      <Header />
      {!loggedIn ? (
        <div className="logIn">
          <div className="inputs">
            <input
              type="text"
              placeholder="Nom..."
              onChange={e => {
                setUserNom(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Salle..."
              onChange={e => {
                setSalle(e.target.value);
              }}
            />
          </div>
          <button onClick={connectionSalle}>BoxChat</button>
        </div>
      ) : (
        <div className="chatBox">
          <div className="nom">{userNom}</div>
          <div className="messages">
            {messageList.map((val, key) => {
              return (
                <div
                  className="messageBox"
                  id={val.perssone == userNom ? "You" : "Other"}
                >
                  <div className="messageSeul">
                    {val.perssone}: {val.message}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="messageInputs">
            <input
              type="text"
              placeholder="Message..."
              onChange={e => {
                setMessage(e.target.value);
              }}
            />
            <button onClick={envoiMessage}>Envoi</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
