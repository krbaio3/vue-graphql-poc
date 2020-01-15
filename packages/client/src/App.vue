<template>
  <v-app>
    <!-- Side Navbar -->
    <SideNavbar :toogleSideNavbar="toogleSideNavbar" :sideNavbar="sideNavbar" :sideNavItems="sideNavItems"></SideNavbar>
    <!-- <v-navigation-drawer app temporary fixed v-model="sideNavbar">
      <v-toolbar color="accent" dark text>
        <v-app-bar-nav-icon @click="toogleSideNavbar"></v-app-bar-nav-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          <h1 class="title pl-3">VueShare</h1>
        </router-link>
      </v-toolbar>
      <v-divider></v-divider> -->
      <!-- Side Navbar -->
      <!-- <v-list shaped>
        <v-list-item ripple v-for="(item, index) in sideNavItems" :key="index" :to="item.link">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
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
      <v-text-field
        name="search"
        label="label"
        id="search"
        placeholder="Search Post"
        flex
        prepend-icon="mdi-magnify"
        color="accent"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <!-- Horizontal NavBar Links -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          text
          v-for="(item, index) in horizontalNavItems"
          :key="index"
          :to="item.link"
        >
          <v-icon class="hidden-sm-only" left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <main>
      <v-container class="mt-5">
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import colors from 'vuetify/es5/util/colors';
import HelloWorld from '@/components/HelloWorld.vue';
import SideNavbar from '@/components/Shared/Side-Navbar.vue';

@Component({
  name: 'App',
  components: {
    HelloWorld,
    SideNavbar,
  },
})
export default class App extends Vue {
  public sideNavbar: boolean = false;
  public toogleSideNavbar(): boolean {
    this.sideNavbar = !this.sideNavbar;
    return this.sideNavbar;
  }
  public get horizontalNavItems() {
    return [
      { icon: 'mdi-chat', title: 'Post', link: '/post' },
      { icon: 'mdi-lock-open', title: 'Sign In', link: '/signin' },
      { icon: 'mdi-pencil', title: 'Sign Up', link: '/signup' },
    ];
  }
  public get sideNavItems() {
    return [
      { icon: 'mdi-chat', title: 'Post', link: '/post' },
      { icon: 'mdi-lock-open', title: 'Sign In', link: '/signin' },
      { icon: 'mdi-pencil', title: 'Sign Up', link: '/signup' },
    ];
  }

  public created() {
    console.log('entra')
    console.log(process.env)
  }
}
</script>
