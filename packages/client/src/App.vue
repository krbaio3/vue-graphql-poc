<template>
    <v-app>
        <v-layout row v-if="processing" :class="{ blockUI: processing }">
            <v-dialog v-model="processing" fullscreen persistent transition="dialog-transition"
                      :class="{ blockUI: processing }">
                <v-container fill-height :class="{ blockUI: processing }">
                    <v-layout row justify-center align-center>
                        <v-progress-circular indeterminate :size="70" :width="7"
                                             color="secondary"></v-progress-circular>
                    </v-layout>
                </v-container>
            </v-dialog>
        </v-layout>
        <!-- Side Navbar -->
        <SideNavbar :toogleSideNavbar="toogleSideNavbar" :sideNavbar="sideNavbar"
                    :sideNavItems="sideNavItems" :isUser="user"
                    @handleSignOutUser="triggerSignOutUser"></SideNavbar>
        <v-app-bar fixed color="primary" dark>
            <!-- App Title -->
            <v-app-bar-nav-icon @click="toogleSideNavbar"></v-app-bar-nav-icon>
            <v-toolbar-title class="hidden-xs-only">
                <router-link to="/" tag="span" style="cursor: pointer">
                    VueShare
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- Search Input -->
            <v-text-field v-model="searchTerm" @input="triggerSearchPosts" name="search"
                          label="label" id="search" placeholder="Search Post"
                          flex prepend-icon="mdi-magnify"
                          color="accent" single-line hide-details></v-text-field>

            <!-- Search Result Cards -->
            <v-card dark v-if="getSearchResults.length" id="search__card">
              <v-list>
                <v-list-item v-for="(result) in getSearchResults" :key="result._id"
                  @click="goToSearchResult(result._id)" style="cursor:pointer;">
                  <v-list-item-title>
                    {{result.title}} -
                    <span class="font-weight-thin">
                      {{ fDescription(result.description) }}
                    </span>
                  </v-list-item-title>

                  <!-- Show Icon if Result Favorited by User -->
                  <v-list-item-action v-if="checkIfUserFavorite(result._id)">
                    <v-icon>mdi-cards-heart</v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card>

            <v-spacer></v-spacer>
            <!-- Horizontal NavBar Links -->
            <v-toolbar-items class="hidden-xs-only">
                <v-btn text v-for="(item, index) in horizontalNavItems" :key="index"
                       :to="item.link">
                    <v-icon class="hidden-sm-only" left>{{ item.icon }}</v-icon>
                    {{ item.title }}
                </v-btn>
                <!-- Profile Button -->
                <v-btn text to="/profile" v-if="user">
                    <v-icon class="hidden-sm-only" left>mdi-account</v-icon>
                    <v-badge right :color="userFavorites.length > 0 ? 'blue darken-2': ''"
                        :class="{ 'bounce': badgeAnimated }">
                        <span slot="badge" v-if="userFavorites.length > 0">
                          {{userFavorites.length}}
                        </span>
                        <!--slot can be any component-->
                        Profile
                    </v-badge>
                </v-btn>
                <!-- SignOut Button -->
                <v-btn text to="/signout" v-if="user" @click="triggerSignOutUser">
                    <v-icon class="hidden-sm-only" left>mdi-exit-to-app</v-icon>
                    SignOut</v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <main>
            <v-container class="mt-5">
                <transition name="fade">
                    <router-view></router-view>
                </transition>
            </v-container>
        </main>
        <v-alert type="error" v-if="error.isError">
            {{ error.message }}
        </v-alert>
        <SnackbarComponent :isUser="userOb$"></SnackbarComponent>
    </v-app>
</template>

<script lang="ts">


/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Component, Vue, Watch } from 'vue-property-decorator';
import SideNavbar from '@/components/Shared/Side-Navbar.vue';
import SnackbarComponent from '@/components/Shared/Snackbar.vue';
import { Action } from 'vuex-class';
import { mapGetters } from 'vuex';
import { Observable, BehaviorSubject } from 'rxjs';
import { ErrorObject, User } from '@/store/types';
import { store } from '@/store';
import { formatDescription } from './utils/helpers';
import { Post } from './store/modules/posts/types';

// TODO falta al final de la HU48 poner un wacher para que el
//  snackbar se vea una sola vez
//  cuando hagas login.
// TODO Si se hace, hacerlo con vue-rx


@Component({
  name: 'App',
  components: {
    SideNavbar,
    SnackbarComponent,
  },
  computed: {
    ...mapGetters({
      error: 'getError',
      processing: 'processing',
      user: 'getCurrentUser',
      userFavorites: 'getUserFavorites',
      getSearchResults: 'postModule/GET_SEARCH_RESULTS',
    }),
  },
  subscriptions() {
    const user$ = new Observable((subscribe) => {
      subscribe.next(this.$store.state.user);
    });
    const message$ = new BehaviorSubject(store.state.user);
    return {
      user$,
      message$,
    };
  },
})
export default class App extends Vue {
    public sideNavbar = false;

    public error!: ErrorObject;

    public badgeAnimated = false;

    public user!: User;

    public userFavorites!: [];

    public searchTerm = '';
    // public userOb$ = new BehaviorSubject<any>(this.$store.state.user);
    // public user$!: Observable<User>;

    @Action('ACT_SIGN_OUT', { namespace: 'authModule' })
    private handleSignOutUser!: () => Promise <void> ;

    @Action('ACT_SEARCH_POST', { namespace: 'postModule' })
    private handleSearchPost!: (searchTerm: string) => Promise <Post[] | ''>;

    @Action('ACT_CLEAR_SEARCH_POST', { namespace: 'postModule' })
    private handleSetSearchPost!: (searchTerm: string) => void;

    @Watch('userFavorites')
    private OnUserFavorites(value: Post[]) {
      if (value) {
        this.badgeAnimated = true;
        setTimeout(() => {
          this.badgeAnimated = false;
        }, 1000);
      }
    }

    // Computed Properties
    public get horizontalNavItems() {
      //
      let items = [
        { icon: 'mdi-comment-text', title: 'Post', link: '/posts' },
        { icon: 'mdi-lock-open', title: 'Sign In', link: '/signin' },
        { icon: 'mdi-pencil', title: 'Sign Up', link: '/signup' },
      ];

      if (this.user) {
        items = [
          { icon: 'mdi-comment-text', title: 'Post', link: '/posts' },
        ];
      }
      return items;
    }

    public get sideNavItems() {
      let items = [
        { icon: 'mdi-comment-text', title: 'Post', link: '/posts' },
        { icon: 'mdi-lock-open', title: 'Sign In', link: '/signin' },
        { icon: 'mdi-pencil', title: 'Sign Up', link: '/signup' },
      ];

      if (this.user) {
        items = [
          { icon: 'mdi-comment-text', title: 'Post', link: '/posts' },
          { icon: 'mdi-star-circle', title: 'Create Post', link: '/posts/add' },
          { icon: 'mdi-account', title: 'Profile', link: '/profile' },
        ];
      }
      return items;
    }

    // methods
    public toogleSideNavbar(): boolean {
      this.sideNavbar = !this.sideNavbar;
      return this.sideNavbar;
    }

    private triggerSignOutUser() {
      this.handleSignOutUser().then(() => {
        if (this.sideNavbar) {
          this.sideNavbar = false;
        }
      });
    }

    private triggerSearchPosts() {
      if (this.searchTerm !== '') {
        this.handleSearchPost(this.searchTerm).then((data) => {
          console.log(data);
        });
      }
    }

    // // Computed
    public get userOb$() {
      return this.$store.getters.getCurrentUser;
    }

    private goToSearchResult(id: string) {
      this.searchTerm = '';
      this.$router.push({ path: `/post/${id}` });
      this.handleSetSearchPost(this.searchTerm);
    }

    // eslint-disable-next-line class-methods-use-this
    private fDescription(desc: string): string {
      return formatDescription(desc);
    }

    private checkIfUserFavorite(id: string): boolean {
      // eslint-disable-next-line no-underscore-dangle
      return this.userFavorites && this.userFavorites.some((fav: Post) => fav._id === id);
    }
}
</script>

<style lang="scss" scoped>


.blockUI {
    position: absolute; // background-color: rgba(168, 168, 168, 0.6);
}

.errorFix {
    position: absolute;
    bottom: 0;
    width: 100%;
}

.fade-enter-active,
.fade-leave-active {
    transition-property: opacity;
    transition-duration: 0.25s;
}

.fade-enter-active {
    transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0; // transform: translateX(-25px);
}
// user favorite animation
.bounce {
  animation: bounce 1s both;
}

// search results card
#search__card {
  position: absolute;
  width: 100vw;
  z-index: 8;
  top: 100%;
  left: 0;
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -20px, 0);
  }
  70% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}
</style>
