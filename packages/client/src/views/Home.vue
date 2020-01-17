<template>
  <v-container
    class="mt-6 text-center"
    v-if="getPosts"
    @click="handleGetCarouselPost"
  >
  Click Me
    <!-- <v-flex xs12>
      <v-carousel
        v-bind="{'cycle': true}"
        interval="3000"
      >
        <v-carousel-item
          v-for="(post) in getPosts"
          :key="post._id"
          :src="post.imageUrl"
        >
          <h1
            id="carousel__title"
          >{{post.title}}</h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex> -->
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import { gql } from 'apollo-boost';
import { Action } from 'vuex-class';

const namespace: string = 'postsModule';

@Component({
  name: 'Home',
})
export default class AddPost extends Vue {
  @Action('getPost', {namespace}) public handleGetCarouselPost!: () => void;
  private getPosts = {};

  // private handleGetCarouselPost() {
    // reach out to Vuex store, fire action that gets posts for carousel
  // }
}
</script>
<style lang="scss" scoped>
#carousel__title{
  position: absolute;
  background-color: rgba(0,0,0, 0.5);
  color: white;
  border-radius: 5px 5px 0 0;
  padding: 0.5em;
  margin: 0 auto;
  bottom: 50px;
  left: 0;
  right: 0;
}
</style>
