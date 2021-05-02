import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
const HOST = `${window.location.hostname}:9352/socket.io/?EIO=4&transport=websocket`;

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io(HOST, {
      query: { id },
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
