import React from "react";
import "./App.css";
import App from "./App.js";

function Boutton() {
  return (
    <div>
      <button onClick={<App envoiMessage />}>Envoi</button>
    </div>
  );
}
export default Boutton;
