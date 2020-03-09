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
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Component, Vue, Prop, PropSync, Emit,
} from 'vue-property-decorator';
import { User } from '../../store/types';

@Component({
  name: 'SideNavbar',
})
export default class SideNavbar extends Vue {
    @PropSync('sideNavbar', { required: true, type: Boolean }) public readonly sideNavbarBoolean!: boolean;

    @Prop({ required: true, type: Function }) public readonly toogleSideNavbar!: boolean;

    @Prop({ required: false, default: false }) public readonly isUser!: User;

    @Prop({ type: Array }) public readonly sideNavItems!: string[];

    @Emit('handleSignOutUser')
    // eslint-disable-next-line class-methods-use-this
    // eslint-disable-next-line no-empty-function
    // eslint-disable-next-line class-methods-use-this
    private handleSignOutUser() {}
}
</script>
