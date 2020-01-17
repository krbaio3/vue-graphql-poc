import Vue from 'vue';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

// setup ApolloClient
export const defaultClient = new ApolloClient({
  uri: process.env.VUE_APP_GRAPHQL_HTTP,
});

export const apolloProvider = new VueApollo({ defaultClient });

Vue.use(VueApollo);
