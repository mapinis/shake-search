import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

ReactDOM.render(
  <ApolloProvider client={new ApolloClient({ uri:'http://192.168.235.224:8000/graphql' })}>
    <App />
  </ApolloProvider>
, document.getElementById('root'));

registerServiceWorker();
