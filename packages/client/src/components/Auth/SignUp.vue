<template>
    <v-container grid-list-xs mt-5 text-center pt-5>
        <!-- SignUp Title -->
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <h1>Get Started Here</h1>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card color="accent" dark>
                    <v-container grid-list-xs>
                        <v-form @submit.prevent="handleSignUpUser" v-model="isFormValid" lazy-validation ref="form">
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field :rules="getUsernameRules" v-model="username" name="usernameField" label="Username" id="usernameField" prepend-icon="mdi-face" type="text" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field :rules="getEmailRules" v-model="email" name="emailField" label="Email" id="emailField" prepend-icon="mdi-email" type="email" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field :rules="getPasswordRules" v-model="password" name="passwordField" label="Password" id="passwordField" prepend-icon="mdi-puzzle" type="password" required ref="passwordField"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field :rules="getPasswordRules" v-model="passwordConfirmation" name="passwordConfirmation" label="Confirm Password" id="passwordConfirmation" prepend-icon="mdi-gavel" type="password" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12 text-center>
                                    <v-btn :disabled="!isFormValid || loading" :loading="loading" type="submit" color="info" tile depressed>SignUp
                                        <template v-slot:loader>
                                                      <span class="custom-loader">
                                                        <v-icon light>mdi-cached</v-icon>
                                                      </span>
                                        </template>
                                    </v-btn>
                                    <h3>
                                      Ya tienes una cuenta?
                                      <router-link to="/signin">SignIn</router-link>
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
import { Component, Vue, Ref, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { Getter, Action } from 'vuex-class';
import { SignInUser } from '../../store/modules/auth/types';
import { ISignUp } from './types';
import { router } from '../../router';
import { Route } from 'vue-router';
import { User } from '../../store/types';


Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate',
    'beforeEnter',
]);

Component.registerHooks(['beforeDestroy']);

const namespace = 'authModule';

@Component({
    name: 'SignUp',
})
export default class SignUp extends Vue {
    private isFormValid: boolean = true;
    private username: string = '';
    private email: string = '';
    private password: string = '';
    private passwordConfirmation: string = '';
    // TODO: Hacer las Rules en Mixins
    private getUsernameRules: any = [
        (username: string) => !!username || 'Username is required',
        (username: string) =>
        username.length < 10 || 'Username cannot be more than 10 characters',
    ];

    private getEmailRules: any = [
        (email: string) => !!email || 'Email is required',
        (email: string) => /.@+./.test(email) || 'Email must be valid',
    ];

    private getPasswordRules: any = [
        (password: string) => !!password || 'Password is required',
        (password: string) =>
        password.length >= 4 || 'Password must be at least 4 characters',
        (confirmation: string) => this.passConfirmation(confirmation),
    ];

    @Ref('form') private readonly formRef!: HTMLFormElement;
    @Getter('GET_LOADING_BTN', { namespace })
    private loading!: boolean;

    @Getter('getCurrentUser')
    private getUser!: () => void;

    @Action('ACT_SIGN_UP_USER', { namespace })
    private triggerSignUpUser!: (signUpUser: ISignUp) => void;

    @Watch('getCurrentUser')
    public onUserChanged(value: User) {
        if (value) {
            this.$router.push({ path: '/' });
        }
    }

    // Method
    private handleSignUpUser() {
        if (this.formRef.validate()) {
            // signup user action
            this.triggerSignUpUser({ username: this.username, password: this.password, email: this.email });
        }
    }

    private passConfirmation(confirmation: string): boolean | string {
        return this.password === confirmation || 'Passwords must match';
    }

}
</script>

<style lang="scss" scoped>

</style>>
