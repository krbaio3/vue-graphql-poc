<template>
    <!-- Side Navbar -->
    <v-navigation-drawer app temporary fixed v-model="sideNavbarBoolean">
        <v-toolbar color="accent" dark text>
            <v-app-bar-nav-icon @click="toogleSideNavbar"></v-app-bar-nav-icon>
            <router-link to="/" tag="span" style="cursor: pointer">
                <h1 class="title pl-3">VueShare</h1>
            </router-link>
        </v-toolbar>
        <v-divider></v-divider>
        <!-- Side Navbar -->
        <v-list shaped>
            <v-list-item ripple v-for="(item, index) in sideNavItems" :key="index" :to="item.link">
                <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <!-- SignOut Button -->
            <!-- TODO: Modificar el array que viene del componente padre, es mas facil -->
            <v-list-item ripple v-if="!!isUser" @click="handleSignOutUser">
                <v-list-item-icon>
                    <v-icon>mdi-exit-to-app</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>SignOut</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Emit } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { User } from '../../store/types';

@Component({
    name: 'SideNavbar',
})
export default class SideNavbar extends Vue {
    @PropSync('sideNavbar', { required: true, type: Boolean }) public readonly sideNavbarBoolean!: boolean;
    @Prop({ required: true, type: Function }) public readonly toogleSideNavbar!: boolean;
    @Prop({ required: false, default: false }) public readonly isUser!: User;
    @Prop({ type: Array }) public readonly sideNavItems!: any;
    @Emit('handleSignOutUser')
    private handleSignOutUser() {
      return;
    }
    // @Getter('getCurrentUser')
    // public user!: User;

    // methods
    // private isUser(): boolean {
    //     return !!this.user;
    // }

    // private mounted() {
    //     console.log(this.myUser)
    // }

    // private handleSignOutUser() {
    //   this.$emit('handleSignOutUser');
    // }

}
</script>
