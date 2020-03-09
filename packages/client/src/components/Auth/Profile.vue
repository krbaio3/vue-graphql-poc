<template>
    <v-container grid-list-xs class="mt-5 text-center">
      <!-- User details Card -->
      <v-flex sm6 offset-sm3>
          <v-card class="white--text" color="secondary">
              <v-layout row wrap mt-md-2>
                  <v-flex xs5>
                      <v-card>
                          <v-img class="align-center" height="125px"
                            :src="getCurrentUser.avatar" contain>
                          </v-img>
                      </v-card>
                  </v-flex>
                  <v-flex xs7>
                      <v-card-title primary-title>
                          <div>
                              <div class="headline">{{getCurrentUser.username}}</div>
                              <div>Joined: {{getCurrentUser.joinDate | formatDate}}</div>
                              <div class="hidden-xs-only font-weight-regular">
                                  Post Favorites: {{getCurrentUser.favorites.length}}
                              </div>
                              <div class="hidden-xs-only font-weight-regular">
                                  Post Added: {{userPost.length}}
                              </div>
                          </div>
                      </v-card-title>
                  </v-flex>
              </v-layout>
          </v-card>
      </v-flex>
      <!-- Post Favorited by User -->
      <v-container grid-list-xs v-if="!getUserFavorites.length">
        <v-layout row wrap>
            <v-flex xs12>
                <h2>You have no favorites currently. Go and add some!</h2>
            </v-flex>
        </v-layout>
      </v-container>
      <v-container grid-list-xs mt-3 v-else>
        <v-flex xs12>
            <h2 class="font-weight-light">
                Favorited
                <span class="font-weight-regular">{{getUserFavorites.length}}</span>
            </h2>
        </v-flex>
        <v-layout row wrap>
            <v-flex xs12 sm6 v-for="(favorite) in getUserFavorites" :key="favorite._id">
                <v-card class="mt-3 ml-1 mr-2" hover>
                    <v-img height="30vh" :src="favorite.imageUrl" contain></v-img>
                    <v-card-text>
                        {{favorite.title}}
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
      </v-container>
      <!-- Post created by user -->
      <v-container grid-list-xs v-if="!userPost.length">
        <v-layout row wrap>
            <v-flex xs12>
                <h2>You have no posts currently. Go and add some!!</h2>
            </v-flex>
        </v-layout>
      </v-container>
      <v-container grid-list-xs class="mt-3" v-else>
        <v-flex xs12>
          <h2 class="font-weight-light">Your Posts:
              <span class="font-weight-regular">({{userPost.length}})</span>
          </h2>
        </v-flex>
        <v-layout row wrap>
          <v-flex xs12 sm6 v-for="(post) in userPost" :key="post._id" >
              <v-card class="mt-3 ml-1 mr-2" hover>
                <v-btn @click.stop="loadPost(post)"
                  color="info" floating fab small dark>
                  <v-icon>mdi-lead-pencil</v-icon>
                </v-btn>
                <v-btn @click.stop="handleDeleteUserPost(true, post, false)"
                  color="error" floating fab small dark>
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
                <v-card>
                  <v-img class="align-center" height="30vh" :src="post.imageUrl">
                  </v-img>
                </v-card>
                <v-card-text>
                  {{post.title}}
                </v-card-text>
              </v-card>
            </v-flex>
            <v-dialog v-model="deletePostDialog" max-width="290">
              <v-card>
                <v-card-title class="headline">Delete Post User</v-card-title>
                <v-card-text>
                  Are you sure want to delete this post?
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn  @click="handleDeleteUserPost(false, null, false)"
                    color="green darken-1" text>
                    Disagree
                  </v-btn>
                  <v-btn @click="handleDeleteUserPost(true, null, true)"
                    color="green darken-1" text>
                    Agree
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog xs12 sm6 offset-sm3 v-model="editPostDialog"
              persistent transition="dialog-transition">
              <v-card>
                <v-card-title class="headline grey lighten-2">
                  Update Post
                </v-card-title>
                <v-card-text>
                  <v-form v-model="updateFormValid" lazy-validation ref="update"
                    @submit.prevent="handleUpdateUserPost">

                    <!-- Title Input -->
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-text-field
                          :rules="getTitleRules"
                          v-model="title"
                          name="titleField"
                          label="title"
                          id="titleField"
                          type="text"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>

                    <!-- Img URL Input -->
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-text-field
                          :rules="getImageRules"
                          v-model="image"
                          name="imageField"
                          label="image"
                          id="imageField"
                          type="text"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>

                    <!-- Img Preview -->
                    <v-layout row wrap>
                      <v-flex xs12>
                        <img v-if="image !== ''" :src="image" :alt="nameImgURL" height="300px" />
                        <img v-else src="../../assets/no-img.jpg" height="300px" />
                      </v-flex>
                    </v-layout>

                    <!-- Categories Select -->
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-select
                          :items="itemList"
                          :rules="getCategoriesRules"
                          v-model="categories"
                          multiple
                          label="Categories"
                        ></v-select>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-textarea
                          :rules="getDescRules"
                          v-model="description"
                          label="Description"
                          type="text"
                          required
                        ></v-textarea>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12 text-center>
                      </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        :disabled="!updateFormValid"
                        type="submit"
                        class="success--text"
                        text>
                        Update
                      </v-btn>
                      <v-btn
                        class="error--text"
                        text
                        @click="checkStateDialog()">
                        Cancel
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                    <!-- <post-form :getPost="searchPostById('5e4532d2848567382e629f5f')"
                      :getTitleRules="getTitleRules"
                      :getImageRules="getImageRules"
                      :getDescRules="getDescRules"
                      :getCategoriesRules="getCategoriesRules"
                      :itemList="itemList"
                      :isFormValid="updateFormValid"
                    ></post-form> -->
                </v-card-text>
              </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script lang="ts">

import { Component, Vue, Ref } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { Action, Getter } from 'vuex-class';
import { Post, AddPost, MyPost } from '../../store/modules/posts/types';
import { User } from '../../store/types';
import PostForm from '../Shared/PostForm.vue';
import {
  getTitleRules, getImageRules, getDescRules, getCategoriesRules, itemList,
} from '../../utils/helpers';


// FIXME: Refactorizar por completo.

// const postId = '5e4532d2848567382e629f5f';
const namespace = 'postModule';

@Component({
  name: 'Profile',
  components: {
    postForm: PostForm,
  },
  computed: {
    ...mapGetters({ userPost: 'postModule/GET_USER_POST', getPosts: 'postModule/GET_POST' }),
    ...mapGetters(['getCurrentUser', 'getUserFavorites']),
  },
})
export default class Profile extends Vue {
  @Action('ACT_USER_POSTS', { namespace })
  private dispatchGetUserPost!: (userId: string) => Promise < Post[] | [] >;

  @Action('ACT_UPDATE_USER_POST', { namespace })
  private dispatchUpdateUserPost!: (post: Partial<Post>) => Promise<boolean>;

  @Action('ACT_DELETE_USER_POST', { namespace })
  private dispatchDeleteUserPost!: (postId: string) => Promise<Post>;

  // borrar
  @Action('ACT_ADD_POST', { namespace })
  private addPost!: (addPost: AddPost) => Promise<Post>;

  @Getter('GET_LOADING_POST', { namespace })
  private loading!: void;

  @Ref()
  private readonly update!: HTMLFormElement;

  public isFormValid = true;

  private itemList = itemList;

  private getTitleRules = getTitleRules;

  private getImageRules = getImageRules;

  private getDescRules = getDescRules;

  private getCategoriesRules = getCategoriesRules;

  private updateFormValid = true;

  private editPostDialog = false;

  private deletePostDialog = false;

  private title = '';

  private image = '';

  private nameImgURL = '';

  private description = '';

  private postId = '';

  private removePost = '';

  private categories: string[] = [];

  private myPost: Partial<MyPost> = {};

  private getCurrentUser!: User;

  private userPost!: Post[];


  private messageBody = '';

  // ////////
  private searchPostById(id: string): Post | undefined {
    // eslint-disable-next-line no-underscore-dangle
    return this.userPost.find((post) => post._id === id);
  }

  private checkStateDialog() {
    // eslint-disable-next-line no-return-assign
    return this.editPostDialog = !this.editPostDialog;
  }

  private created() {
    // eslint-disable-next-line no-underscore-dangle
    this.dispatchGetUserPost(this.getCurrentUser._id);
  }

  private handleUpdateUserPost() {
    // REFACTOR: Cambiar el metodo de mostrado de datos, que sea mediante el objeto myPost
    this.myPost = {
      _id: this.postId,
      title: this.title,
      imageUrl: this.image,
      categories: this.categories,
      description: this.description,
      // eslint-disable-next-line no-underscore-dangle
      userId: this.getCurrentUser._id,
    };
    if (this.update.validate()) {
      this.dispatchUpdateUserPost(this.myPost).then((data) => {
        if (data) {
          this.editPostDialog = false;
        }
      });
    }
  }

  private handleDeleteUserPost(showModal: boolean, post?: Post, remove?: boolean) {
    this.deletePostDialog = showModal;

    if (post !== null) {
      // eslint-disable-next-line no-underscore-dangle
      this.removePost = (post as Post)._id;
    }
    if (this.removePost !== '' && remove) {
      this.dispatchDeleteUserPost(this.removePost).then(() => {
        this.deletePostDialog = false;
        this.removePost = '';
      });
    }
    // this.createPost(post);
  }

  private loadPost(post: Post) {
    this.checkStateDialog();
    this.createPost(post);
  }

  private createPost({
    _id, title, categories, description, imageUrl,
  }: Post) {
    this.postId = _id;
    this.title = title;
    this.image = imageUrl;
    this.nameImgURL = '';
    this.categories = categories;
    this.description = description;
  }
}
</script>

<style lang="scss" scoped>


</style>>
