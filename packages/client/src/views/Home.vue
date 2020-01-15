<template>
  <v-container class="mt-5">
    <h1>Home</h1>
    <ApolloQuery :query="getPostsQuery">
      <template slot-scope="{result: { loading, data } }">
        <div v-if="loading">
          ...Loadig
        </div>
        <div v-else>
          {{data}}
        </div>
      </template>
    </ApolloQuery>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import { gql } from 'apollo-boost';
@Component({
  name: 'home',
})
export default class Home extends Vue {

  private getPostsQuery() {
   return gql `
          {
            getPosts {
            _id
            title
            imageUrl
            description
          }
        }`;
      }
}
</script>
