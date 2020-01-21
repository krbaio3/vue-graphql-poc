<template>
    <v-container grid-list-xs mt-5 text-center pt-5>
        <!-- <h1>SignIn</h1> -->

        <!-- SignIn Title -->
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <h1>Wellcome Back!</h1>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card color="secondary" dark>
                    <v-container grid-list-xs>
                        <v-form @submit.prevent="handleSignInUser">
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field v-model="username" name="usernameField" label="Username" id="usernameField" prepend-icon="mdi-face" type="text" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field v-model="password" name="passwordField" label="Password" id="passwordField" prepend-icon="mdi-puzzle" type="password" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12 text-center>
                                    <v-btn type="submit" color="accent" tile depressed>SignIn</v-btn>
                                    <h3>Ya tienes una cuenta?
                                        <router-link to="/singup">SignUp</router-link>
                                    </h3>
                                    <!-- <v-btn type="submit" color="accent" tile depressed>SignIn</v-btn> -->
                                </v-flex>
                            </v-layout>
                        </v-form>

                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { SignInUser } from '../../store/modules/auth/types';

const namespace = 'authModule';

@Component({
    name: 'SignIn',
})
export default class SignIn extends Vue {
    @Action('ACT_SIGN_IN_USER', { namespace })
    public actSignInUser!: (signUserData: SignInUser) => void;

    private password: string = '';
    private username: string = '';

    // methods
    public handleSignInUser() {
      this.actSignInUser({username: this.username, password: this.password});
    }
}
</script>

<style lang="scss" scoped>

</style>>
