import React from "react";
import Login from "./Login";
import useLocalStorage from "../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversationsProvider } from "../contexts/ConversationsProvider";
import { SocketProvider } from "../contexts/SocketProvider";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";



const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Berrer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});


// function App() {
//   const [id, setId] = localStorage.getItem('id_token');
//   return (
//     <ApolloProvider client={client}>
//       <SocketProvider id={id}>
//         <ContactsProvider>
//           <ConversationsProvider id={id}>
//             <Dashboard id={id} />
//           </ConversationsProvider>
//         </ContactsProvider>
//       </SocketProvider>
//     </ApolloProvider >
//   );
// }


function App() {
  const [id, setId] = useLocalStorage("id_token");

  const dashboard = (
    <ApolloProvider client={client}>
      <SocketProvider id={id}>
        <ContactsProvider>
          <ConversationsProvider id={id}>
            <Dashboard id={id} />
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider>
    </ApolloProvider>
  );

  const login = (
    <ApolloProvider client={client}>
      <SocketProvider id={id}>
        <ContactsProvider>
          <ConversationsProvider id={id}>
            <Login onIdSubmit={setId} />
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider>
    </ApolloProvider>
  );

  return id ? dashboard : login;
}

export default App;
