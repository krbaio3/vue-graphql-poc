<template>
    <v-container grid-list-xl class="mt-5" v-if="getPost" flexbox text-lg-center>
        <!-- <pre>{{getPost}}</pre> -->
        <!-- Post Card -->
        <v-layout row wrap>
            <v-flex xs12>
                <v-card hover>
                    <v-card-title primary-title>
                        <h1 class="text-capitalize">{{getPost.title}}</h1>
                        <v-btn text icon color="info" v-if="getCurrentUser"
                          @click="handlerToogleLike">
                            <v-icon large :color="checkIfPostLiked(getPost._id) ? 'red' : 'grey'">
                              mdi-cards-heart
                            </v-icon>
                        </v-btn>
                        <h3 class="ml-3 font-weight-thin">{{getPost.likes}} LIKES</h3>
                        <v-spacer></v-spacer>
                        <v-icon @click="goToPreviousPage" color="info" large>
                            mdi-keyboard-backspace
                        </v-icon>
                    </v-card-title>

                    <v-tooltip right>
                        <span>Click to enlarge image</span>
                        <template v-slot:activator="{ on }">
                                <v-img class="white--text align-end" v-on="on"
                                  :src="getPost.imageUrl"
                                  @click="toogleImageDialog">
                                </v-img>
                        </template>
                      <span>Right tooltip</span>
                    </v-tooltip>
                    <!-- Post Image Dialog -->
                    <v-dialog
                      v-model="dialog"
                      transition="dialog-transition"
                    >
                      <v-card>
                        <v-img class="white--text align-end"
                          height="80vh" :src="getPost.imageUrl">
                        </v-img>
                      </v-card>
                    </v-dialog>

                    <v-card-text>
                      <span v-for="(category, index) in getPost.categories" :key="index">
                      <v-chip
                        class="mb-3"
                        color="accent"
                        text-color="white"
                      >{{ category }}</v-chip>
                      </span>
                      <h3>{{getPost.description}}</h3>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

      <!-- Messages Section -->
      <div class="mt-3">
        <!-- message Input -->
        <div class="mb-3" v-if="getCurrentUser">
          <v-flex xs12>
            <v-form @submit.prevent="handlerAddPostMessage" v-model="isFormValid"
              ref="form" lazy-validation>
              <v-layout row wrap>
                <v-flex xs12>
                  <!-- Search Input -->
                  <v-text-field v-model="messageBody" clearable
                          label="Add Message" :rules="messageRules"
                          placeholder="Message" flex append-outer-icon="mdi-send"
                          prepend-icon="mdi-email"
                          @click:append-outer="handlerAddPostMessage"
                          color="accent" single-line>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <!-- Messages -->
              <v-layout row wrap>
                <v-flex xs12>
                  <v-list subheader two-line>
                    <v-subheader>
                      Messages ({{getPost.messages.length}})
                    </v-subheader>
                    <template v-for="(message) in getPost.messages">
                        <v-divider :key="message.id">
                        </v-divider>
                        <v-list-item inset :key="message.title">
                            <v-list-item-avatar>
                                <img :src="message.messageUser.avatar">
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{message.messageBody}}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{message.messageUser.username}}
                                    <span class="grey--text text--lighten-1 hidden-xs-only">
                                                          {{message.messageDate | formatDate}}
                                                        </span>
                                </v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action class="hidden-xs-only">
                                <v-icon :color="checkIfOwnMessage(message) ? 'accent' : 'grey'">
                                    mdi-chat
                                </v-icon>
                            </v-list-item-action>
                        </v-list-item>
                    </template>
                  </v-list>
                </v-flex>
              </v-layout>
            </v-form>
          </v-flex>
        </div>
      </div>
    </v-container>
    <v-container grid-list-xl v-else class="mt-10">
        <v-alert type="error" :value="true" border="top" icon="mdi-close" dark elevation="20">
            No hay Posts que mostrar
        </v-alert>
    </v-container>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Ref,
} from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { Getter } from 'vuex-class';
import gqlGetPost from './queries/GetPost.graphql';
import gqlAddPostMessage from './queries/AddPostMessage.graphql';
import gqlLikePost from './queries/LikePost.graphql';
import gqlUnlikePost from './queries/UnlikePost.graphql';
import { User } from '../../store/types';
import { Message } from './types';
import { Post } from '../../store/modules/posts/types';
// import { Post } from '../../store/modules/posts/types';

// const postId = '5e4532d2848567382e629f5f';

@Component({
  name: 'Post',
  apollo: {
    getPost: {
      query: gqlGetPost,
      variables() {
        return {
          postId: this.postId,
        };
      },
    },
  },
  computed: {
    ...mapGetters(['getCurrentUser']),
  },

})
export default class Posts extends Vue {
    @Prop({ type: String, required: true }) readonly postId!: string;

    @Ref()
    private readonly form!: HTMLFormElement;

    @Getter('getUserFavorites')
    private userFavorites!: Post[];

    private dialog = false;

    private messageBody = '';

    private getCurrentUser!: User;

    private isFormValid = true;

    private goToPreviousPage() {
      this.$router.go(-1);
    }

    private postLiked = false;

    private checkIfOwnMessage(message: Message) {
      // eslint-disable-next-line no-underscore-dangle
      return this.getCurrentUser && this.getCurrentUser._id === message.messageUser._id;
    }

    private checkIfPostLiked() {
      // eslint-disable-next-line no-underscore-dangle
      if (this.userFavorites && this.userFavorites.some((fave) => fave._id === this.postId)) {
        this.postLiked = true;
        return true;
      }
      this.postLiked = false;
      return false;
    }

    private toogleImageDialog() {
      if (window.innerWidth > 500) {
        this.dialog = !this.dialog;
      }
    }

    private handlerToogleLike() {
      if (this.postLiked) {
        this.handlerUnlikePost();
      } else {
        this.handlerLikePost();
      }
    }

    public messageRules = [
      (message: string) => !!message || 'Message is required',
      (message: string) => {
        if (message != null) {
          return message.length < 50 || 'Message must be less than 50 characters';
        }
        return 'Message must be less than 50 characters';
      },
    ]

    private handlerAddPostMessage() {
      if (this.form.validate()) {
        const variables = {
          messageBody: this.messageBody,
          // eslint-disable-next-line no-underscore-dangle
          userId: this.getCurrentUser._id,
          postID: this.postId,
        };

        this.$apollo.mutate({
          mutation: gqlAddPostMessage,
          variables,
          update: (cache, { data: { addPostMessage } }) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data: any = cache.readQuery({
              query: gqlGetPost,
              variables: {
                postId: this.postId,
              },
            });

            data.getPost.messages.unshift(addPostMessage);
            cache.writeQuery({
              query: gqlGetPost,
              variables: {
                postId: this.postId,
              },
              data,
            });
          },
        }).then(({ data }) => {
          this.form.reset();
          console.log(data);
        }).catch((error) => console.error(error));
      }
    }

    private handlerLikePost() {
      const variables = {
        postId: this.postId,
        username: this.getCurrentUser.username,
      };
      this.$apollo.mutate({
        mutation: gqlLikePost,
        variables,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        update: (cache, { data: { likePost } }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any = cache.readQuery({
            query: gqlGetPost,
            variables: {
              postId: this.postId,
            },
          });
          data.getPost.likes += 1;
          cache.writeQuery({
            query: gqlGetPost,
            variables: {
              postId: this.postId,
            },
            data,
          });
        },
      }).then(({ data }) => {
        const updatedUser = { ...this.getCurrentUser, favorites: data.likePost.favorites };
        this.$store.commit('setCurrentUser', updatedUser);
      }).catch((error) => console.error(error));
    }

    private handlerUnlikePost() {
      const variables = {
        postId: this.postId,
        username: this.getCurrentUser.username,
      };
      this.$apollo.mutate({
        mutation: gqlUnlikePost,
        variables,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        update: (cache, { data: { unlikePost } }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any = cache.readQuery({
            query: gqlGetPost,
            variables: {
              postId: this.postId,
            },
          });
          data.getPost.likes -= 1;
          cache.writeQuery({
            query: gqlGetPost,
            variables: {
              postId: this.postId,
            },
            data,
          });
        },
      }).then(({ data }) => {
        const updatedUser = { ...this.getCurrentUser, favorites: data.unlikePost.favorites };
        this.$store.commit('setCurrentUser', updatedUser);
      }).catch((error) => console.error(error));
    }
}
</script>

<style lang="scss" scoped>

</style>>
