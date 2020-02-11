<template>
    <v-container grid-list-xl class="mt-5" v-if="infiniteScrollPosts" fluid>
        <!-- <pre>{{infiniteScrollPosts}}</pre> -->
        <v-row dense>
            <v-col v-for="(post) in infiniteScrollPosts.posts" :key="post._id" cols="6">
                <v-card hover @click.native="goToPost(post._id)">
                    <v-img class="white--text align-end" lazy height="30vh" :src="post.imageUrl">
                        <!-- <v-card-title>{{post.title}}</v-card-title> -->
                    </v-img>
                    <v-card-actions>
                        <v-card-title primary>
                            <div>
                                <div class="headline">{{post.title}}</div>
                                <span class="grey--text">
                                  {{post.likes}} likes -
                                    {{post.messages === null ? 0 : post.messages.lenght}}
                                      comments
                                </span>
                            </div>
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn icon color="primary" text @click="showPostCreator=!showPostCreator">
                            <v-icon>{{`mdi-chevron-${showPostCreator ? 'down' : 'up'}`}}</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <!-- Post Creator Tile -->
                    <v-slide-y-transition>
                        <v-card-text v-show="showPostCreator" class="grey lighten-4">
                            <v-list-item>
                                <v-list-item-avatar>
                                    <v-img :src="post.createdBy.avatar"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title class="font-weight-bold text-capitalize">
                                        {{post.createdBy.username}}</v-list-item-title>
                                    <v-list-item-subtitle class="font-weight-thin">
                                        Added {{post.createdDate | formatDate}}
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn text icon ripple>
                                        <v-icon color="grey lighten-1">mdi-information</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-card-text>
                    </v-slide-y-transition>
                </v-card>
            </v-col>
        </v-row>
        <v-layout colum v-if="showMoreEnabled">
            <v-flex xs12>
                <v-layout justify-center row>
                    <v-btn text-lg-center color="info" class="mt-5" @click="showMore">
                        Fetch More
                    </v-btn>
                </v-layout>
            </v-flex>
        </v-layout>

    </v-container>
    <v-container grid-list-xl v-else class="mt-10">
        <v-alert type="error" :value="true" border="top" icon="mdi-close" dark elevation="20">
            No hay Posts que mostrar
        </v-alert>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import gqlInfiniteScrollPosts from './queries/infiniteScrollPosts.graphql';
import { Post } from '../../store/modules/posts/types';

const pageSize = 2;

@Component({
  name: 'Posts',
  apollo: {
    infiniteScrollPosts: {
      query: gqlInfiniteScrollPosts,
      variables: {
        pageNum: 1,
        pageSize,
      },
    },
  },
})
export default class Posts extends Vue {
    private pageNum = 1;

    private showMoreEnabled = true;

    private showPostCreator = false;

    private infiniteScrollPosts: { post: Post | null } = { post: null };

    // ////////

    private showMore() {
      this.pageNum += 1;
      this.$apollo.queries.infiniteScrollPosts.fetchMore({
        variables: {
          // incremento de pageNum en 1
          pageNum: this.pageNum,
          pageSize,
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          const { posts, hasMore } = fetchMoreResult.infiniteScrollPosts;
          this.showMoreEnabled = hasMore;
          return {
            infiniteScrollPosts: {
              // eslint-disable-next-line no-underscore-dangle
              __typename: prevResult.infiniteScrollPosts.__typename,
              posts: [
                ...prevResult.infiniteScrollPosts.posts,
                ...posts,
              ],
              hasMore,
            },
          };
        },
      });
    }

    private infiniteScroll() {
      // nada mas entrar, arranca apollo, moverlo a un ciclo de vida created
      window.onscroll = () => {
        // eslint-disable-next-line max-len
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          // Do something, anything!
          this.showMore();
        }
      };
    }

    private goToPost(id: string) {
      this.$router.push({ path: `/post/${id}` });
    }
}
</script>

<style lang="scss" scoped>

</style>>
