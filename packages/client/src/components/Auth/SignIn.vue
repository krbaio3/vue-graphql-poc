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
                        <v-form @submit.prevent="handleSignInUser" v-model="isFormValid" lazy-validation ref="form">
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field :rules="getUsernameRules" v-model="username" name="usernameField" label="Username" id="usernameField" prepend-icon="mdi-face" type="text" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field :rules="getPasswordRules" v-model="password" name="passwordField" label="Password" id="passwordField" prepend-icon="mdi-puzzle" type="password" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12 text-center>
                                    <v-btn :disabled="!isFormValid || loading" :loading="loading" type="submit" color="accent" tile depressed>SignIn
                                        <template v-slot:loader>
                                                                  <span class="custom-loader">
                                                                    <v-icon light>mdi-cached</v-icon>
                                                                  </span>
                                        </template>
                                    </v-btn>
                                    <h3>
                                      Ya tienes una cuenta?
                                      <router-link to="/signup">SignUp</router-link>
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { SignInUser } from '../../store/modules/auth/types';
import { mapGetters } from 'vuex';
import { User } from '../../store/types';
import { router } from '../../router';

const namespace = 'authModule';

@Component({
    name: 'SignIn',
    computed: {
        ...mapGetters(['getCurrentUser']),
    },
})
export default class SignIn extends Vue {
    public password: string = '';
    public username: string = '';
    public isFormValid: boolean = true;
    // Parar a un Mixin esta parte
    public getUsernameRules = [
        (username: string) => !!username || 'Username is required',
        (username: string) => username.length < 10 || 'Username must be less than 10 characters',
    ];
    public getPasswordRules = [
        (password: string) => !!password || 'Password is required',
        (password: string) => password.length > 4 || 'Password must be at least 4 characters',
    ];
    // fin de mixin
    @Getter('GET_LOADING_BTN', { namespace })
    public loading!: boolean;

    @Action('ACT_SIGN_IN_USER', { namespace })
    public actSignInUser!: (signUserData: SignInUser) => Promise < any > ;

    // TODO cambiarlo por un Subscribe de vuex-class-component
    @Watch('getCurrentUser')
    public onUserChanged(value: User) {
        if (value) {
            this.$router.push({ path: '/' });
        }
    }

    // methods
    public handleSignInUser() {
        if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
            this.actSignInUser({ username: this.username, password: this.password }).then((data) => {
                router.push({ path: '/' });
            }).catch((error) => console.error(error),
            );
        }
    }
}
</script>

<style lang="scss" scoped>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
}

@-moz-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}

@-webkit-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}

@-o-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}

@keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>>
