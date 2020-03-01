<template>
  <v-container grid-list-xs class="mt-5 text-center">
    <!-- User details Card -->
    <v-flex sm6 offset-sm3>
      <v-card class="white--text" color="secondary">
        <v-layout row wrap>
          <v-flex xs5>
            <v-card>
              <v-img
                class="white--text align-end"
                height="125px"
                :src="getCurrentUser.avatar"
                contain>
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
                  Post Added: {{getCurrentUser.favorites.length}}
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
  </v-container>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

// Component.registerHooks([
//   'beforeRouteEnter',
// ]);

  @Component({
    name: 'Profile',
    computed: {
      ...mapGetters(['getCurrentUser', 'getUserFavorites']),
    },
  })
export default class Profile extends Vue {}

</script>

<style lang="scss" scoped>

</style>>
