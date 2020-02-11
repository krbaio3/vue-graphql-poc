<template>
  <v-container grid-list-xs mt-5 text-center pt-5>
    <!-- AddPost Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="primary--text">Add Post</h1>
      </v-flex>
    </v-layout>
    <!-- Add postForm -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-form @submit.prevent="handleAddPost" v-model="isFormValid" lazy-validation ref="form">
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
              <img :src="imageUrl" :alt="nameImgURL" height="300px" />
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
              <v-btn :disabled="!isFormValid || loading" :loading="loading" type="submit" color="info" tile depressed>
                Submit
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>
              <!-- <v-btn type="submit" color="accent" tile depressed>SignIn</v-btn> -->
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">




import { Vue, Component, Ref } from 'vue-property-decorator';
import { gql } from 'apollo-boost';
import { Getter, Action } from 'vuex-class';
import { mapGetters } from 'vuex';
import { User } from '../../store/types';

const namespace = 'postsModule';

@Component({
  name: 'AddPost',
  computed: {
    ...mapGetters({user: 'getCurrentUser'})
  }
})
export default class AddPost extends Vue {
  private getPosts = {};
  private itemList: string[] = ['Art', 'Education', 'Travel', 'Photography', 'Technology'];
  private categories: string[] = [];
  private description: string = '';
  private isFormValid: boolean = true;
  private title: string = '';
  private image: string = '';
  private imageUrl: string = 'https://cdn.vuetifyjs.com/images/logos/v-alt.svg';
  private nameImgURL: string = '';
  private user!: User;
  private getTitleRules = [
    (title: string) => !!title || 'Title is required',
    (title: string) => title.length < 20 || 'Title must have less 20 characters',
  ];
  private getImageRules = [(img: string) => !!img || 'Image is required'];
  private getDescRules = [
    (desc: string) => !!desc || 'Description is required',
    (desc: string) => desc.length <= 200 || 'Description at least less 200 characters',
  ];
  private getCategoriesRules = [(categories: string) => categories.length >= 1 || 'At least one category is required'];
  @Getter('GET_LOADING_POST', { namespace })
  private loading!: void;
  @Action('ACT_ADD_POST', {namespace})
  private addPost!: () => void;
  @Ref()
  private readonly form!: HTMLFormElement;

  // ////////

  private handleAddPost(): void {

    const obj = {
      item: this.categories,
      description: this.description,
      title: this.title,
      image: this.image,
      imageUrl: this.imageUrl,
      creatorID: this.user._id,
    };

    if (this.form.validate()) {
      console.log(obj)
      debugger
      this.addPost();
    }

  }
}
</script>

<style lang="scss" scoped></style>
