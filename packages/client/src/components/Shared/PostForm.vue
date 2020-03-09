
<template>
  <v-container>
    <v-form @submit.prevent="handlerAddPost" v-model="isFormValid" lazy-validation ref="form">
        <!-- Title Input -->
        <v-layout row wrap>
            <v-flex xs12>
                <v-text-field :rules="getTitleRules" v-model="getPost.title" name="titleField"
                  label="title" id="titleField" type="text" required></v-text-field>
            </v-flex>
        </v-layout>
        <!-- Img URL Input -->
        <v-layout row wrap>
            <v-flex xs12>
                <v-text-field :rules="getImageRules" v-model="getPost.imageUrl" name="imageField"
                  label="image" id="imageField" type="text" required></v-text-field>
            </v-flex>
        </v-layout>
        <!-- Img Preview -->
        <v-layout row wrap>
            <v-flex xs12>
                <img v-if="getPost.imageUrl !== ''" :src="getPost.imageUrl"
                  :alt="getPost.nameImgURL" height="300px" />
                <img v-else src="../../assets/no-img.jpg" height="300px" />
            </v-flex>
        </v-layout>
        <!-- Categories Select -->
        <v-layout row wrap>
            <v-flex xs12>
                <v-select :items="itemList" :rules="getCategoriesRules" v-model="getPost.categories"
                  multiple label="Categories"></v-select>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12>
                <v-textarea :rules="getDescRules" v-model="getPost.description" label="Description"
                  type="text" required></v-textarea>
            </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 text-center>
            <v-btn :disabled="!isFormValid || loading" :loading="loading" type="submit"
              color="info" tile depressed>
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
  </v-container>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Ref,
  Prop,
  PropSync,
} from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { Getter } from 'vuex-class';
import { User } from '../../store/types';
import { Message } from '../Post/types';
import { Post } from '../../store/modules/posts/types';

// TODO: Terminar de codificarlo. Debe de valer para Post y Profile

// Pasar como variable en componente
const namespace = 'postModule';

@Component({
  name: 'PostForm',
  computed: {
    ...mapGetters(['getCurrentUser']),
  },
})
export default class PostForm extends Vue {
    @Getter('GET_LOADING_POST', { namespace })
    private loading!: void;

    @Prop({ required: true })
    private readonly getPost!: Post;

    @Prop({ required: true })
    private readonly getTitleRules!: [];

    @Prop({ required: true })
    private readonly getImageRules!: [];

    @Prop({ required: true })
    private readonly getDescRules!: [];

    @Prop({ required: true })
    private readonly getCategoriesRules!: [];

    @Prop({ required: true })
    private readonly itemList!: string[];

    @Ref()
    private readonly form!: HTMLFormElement;

    @PropSync('isFormValid', { type: Boolean })
    private isFormValidSync!: boolean;

    private isFormValid = true;

    private messageBody = '';

    private getCurrentUser!: User;

    private image = '';

    private categories: string[] = [];

    private description = '';

    private checkIfOwnMessage(message: Message) {
      // eslint-disable-next-line no-underscore-dangle
      return this.getCurrentUser && this.getCurrentUser._id === message.messageUser._id;
    }

    private handlerAddPost() {
      this.$log.debug(this.isFormValidSync);
    }
}
</script>

<style scoped>

</style>
