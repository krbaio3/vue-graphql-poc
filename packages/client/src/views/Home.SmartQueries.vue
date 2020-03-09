<template>
  <v-container class="mt-5">
    <h1>Home</h1>
    <ApolloQuery :query="getPostsQuery">
      <template slot-scope="{result: { loading, error, data, networkStatus } }">
        <!-- NetworkStatus -->
        <div v-if="networkStatus" class="networkStatus apollo">
            Network Status: {{networkStatus}}
        </div>
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>
        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred</div>
        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <ul
            v-for="(post) in data.getPosts"
            :key="post._id"
          >
            <li>
              - {{post._id}}
              - {{post.title}}
              - {{post.imageUrl}}
              - {{post.description}}
            </li>
          </ul>
        </div>
        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { gql } from 'apollo-boost';
@Component({
  name: 'home',
})
export default class Home extends Vue {
  // eslint-disable-next-line class-methods-use-this
  private getPostsQuery() {
    return gql`
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
