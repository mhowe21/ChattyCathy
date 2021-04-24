import React from "react";
import Login from "./components/Login";
import socketClient from "socket.io-client";
const SERVER = "http://localhost:3030";

function App() {
  let socket = socketClient(SERVER, {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd",
    },
  });
  socket.on("connection", () => {
    console.log("I'm connected");
  });
  return (
    <div>
      <p>Hello React</p>
      <Login />
    </div>
  );
}

export default App;
