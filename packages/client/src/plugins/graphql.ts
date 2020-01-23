// tslint:disable: no-console
import Vue from 'vue';
import ApolloClient, { Operation } from 'apollo-boost';
import VueApollo from 'vue-apollo';

// setup ApolloClient
export const defaultClient = new ApolloClient({
  uri: process.env.VUE_APP_GRAPHQL_HTTP,
  // include auth token with requests made to backend
  fetchOptions: {
    credentials: 'include',
  },
  request: (operation: Operation) => {

    // if no token in localStorage, add it
    if (!localStorage.token) {
      localStorage.setItem('token', '');
    }
    // operation adds the token to authorization header, which is sent to backend
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      // tslint:disable-next-line: no-console
      console.error('[networkError]', networkError);
    }
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err?.extensions?.code === 'UNAUTHENTICATED') {
          localStorage.setItem('token', '');
          console.log('Hacer el redirect');
        }
        // tslint:disable-next-line: no-console
        console.dir(err);
      }
    }
  },
});

export const apolloProvider = new VueApollo({ defaultClient });

Vue.use(VueApollo);
