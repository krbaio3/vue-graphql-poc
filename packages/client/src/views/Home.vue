<template>
    <v-container class="mt-6 text-center">
        <v-flex xs12>
            <v-carousel v-if="getPosts.length > 0" v-bind="{'cycle': true}" interval="3000">
                <v-carousel-item v-for="(post) in getPosts" :key="post._id" :src="post.imageUrl"
                  @click.native="goToPost(post._id)">
                    <h1 id="carousel__title">{{post.title}}</h1>
                </v-carousel-item>
            </v-carousel>
        </v-flex>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { Post } from '../store/modules/posts/types';

const namespace = 'postModule';

@Component({
  name: 'Home',
})
export default class AddPost extends Vue {
    @Action('ACT_POST', { namespace })
    public handleGetCarouselPost!: () => void;

    @Getter('GET_POST', { namespace })
    public handleGetPosts!: Post[];
    // private getPosts = {};

    // private handleGetCarouselPost() {
    // reach out to Vuex store, fire action that gets posts for carousel
    // }

    private goToPost(id: string) {
      this.$router.push({ path: `/post/${id}` });
    }

    public get getPosts() {
      return this.handleGetPosts;
    }

    private created() {
      this.handleGetCarouselPost();
    }
}
</script>

<style lang="scss" scoped>
#carousel__title {
    position: absolute;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 5px 5px 0 0;
    padding: 0.5em;
    margin: 0 auto;
    bottom: 50px;
    left: 0;
    right: 0;
}
</style>
