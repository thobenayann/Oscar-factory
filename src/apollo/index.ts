// Création de notre client Apollo
import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
} from "@apollo/client";
  
import { setContext } from '@apollo/client/link/context';

// création du client
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_OSCAR_API_URL,
});


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const user = localStorage.getItem('user');

  if (!user || !JSON.parse(user).token) {
    return {
      headers,
    };
  }

  else {
    const newHeaders = {
      ...headers,
      Authorization: `Bearer ${JSON.parse(user).token}` ,
    }

    return {
      headers: newHeaders
    };
  }

});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// export
export default client;