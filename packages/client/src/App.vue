<template>
  <v-app>
    <!-- Side Navbar -->
    <v-navigation-drawer
      app
      temporary
      fixed
      v-model="sideNavbar"
    >
    </v-navigation-drawer>
    <v-app-bar
      fixed
      color="primary"
      dark
    >
      <!-- App Title -->
      <v-app-bar-nav-icon @click="toogleSideNavbar"></v-app-bar-nav-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link
          to="/"
          tag="span"
          style="cursor: pointer"
        >
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
          <v-icon
            class="hidden-sm-only"
            left
          >{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <main>
      <v-container class="mt-4">
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import colors from 'vuetify/es5/util/colors';
import HelloWorld from '@/components/HelloWorld.vue';
@Component({
    name: 'App',
    components: {
        HelloWorld,
    },
})
export default class App extends Vue {

    public sideNavbar: boolean = false;
    public toogleSideNavbar(): void {
        this.sideNavbar = !this.sideNavbar;
    }
    public get horizontalNavItems() {
        return [
            { icon: 'mdi-chat', title: 'Post', link: '/post' },
            { icon: 'mdi-lock-open', title: 'Sign In', link: '/signin' },
            { icon: 'mdi-pencil', title: 'Sign Up', link: '/signup' },
        ];
    }
}
</script>
