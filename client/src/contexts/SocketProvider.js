import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
const HOST = "http://localhost:3030";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io(HOST, {
      query: { id },
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
