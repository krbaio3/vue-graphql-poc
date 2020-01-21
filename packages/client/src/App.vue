<template>
    <v-app>
        <v-layout row v-if="processing" :class="{blockUI: processing}">
            <v-dialog v-model="processing" fullscreen persistent transition="dialog-transition" :class="{blockUI: processing}">
                <v-container fill-height :class="{blockUI: processing}">
                    <v-layout row justify-center align-center>
                        <v-progress-circular indeterminate :size="70" :width="7" color="secondary"></v-progress-circular>
                    </v-layout>
                </v-container>
            </v-dialog>
        </v-layout>
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
            <v-text-field name="search" label="label" id="search" placeholder="Search Post" flex prepend-icon="mdi-magnify" color="accent" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>
            <!-- Horizontal NavBar Links -->
            <v-toolbar-items class="hidden-xs-only">
                <v-btn text v-for="(item, index) in horizontalNavItems" :key="index" :to="item.link">
                    <v-icon class="hidden-sm-only" left>{{ item.icon }}</v-icon>
                    {{ item.title }}
                </v-btn>
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
            {{error.message}}
        </v-alert>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import colors from 'vuetify/es5/util/colors';
import HelloWorld from '@/components/HelloWorld.vue';
import SideNavbar from '@/components/Shared/Side-Navbar.vue';
import { Getter } from 'vuex-class';
import { mapGetters } from 'vuex';
import { ErrorObject } from './store/types';

@Component({
    name: 'App',
    components: {
        HelloWorld,
        SideNavbar,
    },
    computed: {
        ...mapGetters({
            error: 'getError',
            processing: 'processing',
        }),
    },
})
export default class App extends Vue {
    public sideNavbar: boolean = false;
    public error!: ErrorObject;

    // methods
    public toogleSideNavbar(): boolean {
        this.sideNavbar = !this.sideNavbar;
        return this.sideNavbar;
    }
    public get horizontalNavItems() {
        return [
            { icon: 'mdi-chat', title: 'Post', link: '/posts' },
            { icon: 'mdi-lock-open', title: 'Sign In', link: '/signin' },
            { icon: 'mdi-pencil', title: 'Sign Up', link: '/signup' },
        ];
    }
    public get sideNavItems() {
        return [
            { icon: 'mdi-chat', title: 'Post', link: '/posts' },
            { icon: 'mdi-lock-open', title: 'Sign In', link: '/signin' },
            { icon: 'mdi-pencil', title: 'Sign Up', link: '/signup' },
        ];
    }

}
</script>

<style lang="scss" scoped>
.blockUI {
    position: absolute;
    // background-color: rgba(168, 168, 168, 0.6);
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
</style>
