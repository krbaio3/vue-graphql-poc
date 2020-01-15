<template>
  <v-container
    grid-list-xs
    class="mt-5"
  >
    <h1>AddPost</h1>
    <div v-if="$apollo.loading">Loading...</div>
    <ul
      v-else
      v-for="(post) in getPosts"
      :key="post._id"
    >
      <li>
        - {{post.title}}
        - {{post.imageUrl}}
        - {{post.description}}
      </li>
    </ul>
  </v-container>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { gql } from 'apollo-boost';

  @Component({
    name: 'AddPost',
    apollo: {
      getPosts: {
        query: gql `
          {
            getPosts {
            _id
            title
            imageUrl
            description
          }
        }`,
      },
    },
  })
  export default class AddPost extends Vue {
    private getPosts = {};
  }
</script>

<style lang="scss" scoped>

</style>
