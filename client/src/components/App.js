import React from "react";
import Login from "./Login";
import useLocalStorage from "../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversationsProvider } from "../contexts/ConversationsProvider";
import { SocketProvider } from "../contexts/SocketProvider";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

// const client = new ApolloClient({
//   uri: "https://nx9zvp49q7.lp.gql.zone/graphql",
//   cache: new InMemoryCache({}),
// });

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
  cache: new InMemoryCache({}),
});

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
  const loginPage = (
    <ApolloProvider client={client}>
      <Login onIdSubmit={setId} />
    </ApolloProvider>
  );

  return id ? dashboard : loginPage;
}

export default App;
