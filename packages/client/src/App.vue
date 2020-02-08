<template>
    <v-app>
        <v-layout row v-if="processing" :class="{ blockUI: processing }">
            <v-dialog v-model="processing" fullscreen persistent transition="dialog-transition" :class="{ blockUI: processing }">
                <v-container fill-height :class="{ blockUI: processing }">
                    <v-layout row justify-center align-center>
                        <v-progress-circular indeterminate :size="70" :width="7" color="secondary"></v-progress-circular>
                    </v-layout>
                </v-container>
            </v-dialog>
        </v-layout>
        <!-- Side Navbar -->
        <SideNavbar :toogleSideNavbar="toogleSideNavbar" :sideNavbar="sideNavbar" :sideNavItems="sideNavItems" :isUser="user" @handleSignOutUser="triggerSignOutUser"></SideNavbar>
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
                <!-- Profile Button -->
                <v-btn text to="/profile" v-if="user">
                    <v-icon class="hidden-sm-only" left>mdi-account</v-icon>
                    <v-badge right color="blue darken-2">
                        <span slot="badge">1</span>
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
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import SideNavbar from '@/components/Shared/Side-Navbar.vue';
import SnackbarComponent from '@/components/Shared/Snackbar.vue';
import { Getter, Action, namespace } from 'vuex-class';
import { mapGetters } from 'vuex';
import { ErrorObject, User } from './store/types';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { switchMap, observeOn } from 'rxjs/operators';
import { store } from './store';

// TODO falta al final de la HU48 poner un wacher para que el snackbar se vea una sola vez cuando hagas login.
// TODO Si se hace, hacerlo con vue-rx



@Component({
    name: 'App',
    components: {
        HelloWorld,
        SideNavbar,
        SnackbarComponent,
    },
    computed: {
        ...mapGetters({
            error: 'getError',
            processing: 'processing',
            user: 'getCurrentUser',
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
    public sideNavbar: boolean = false;
    public error!: ErrorObject;
    public user!: User;
    // public userOb$ = new BehaviorSubject<any>(this.$store.state.user);
    // public user$!: Observable<User>;

    @Action('ACT_SIGN_OUT', { namespace: 'authModule' })
    private handleSignOutUser!: () => Promise < any > ;

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
        this.handleSignOutUser().then(() => this.sideNavbar ? this.sideNavbar = false : void(0));
    }

    //// Computed
    public get userOb$() {
      return this.$store.getters.getCurrentUser;
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
</style>
