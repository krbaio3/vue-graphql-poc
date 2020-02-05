<template>
  <v-container grid-list-xs mt-5 text-center pt-5>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="accent" dark>
          <v-container grid-list-xs>
            <v-form
              v-model="isFormValid"
              lazy-validation
              ref="form"
              @submit.prevent="handleSignUpUser"
            >
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="username"
                    :rules="getUsernameRules"
                    name="usernameField"
                    label="Username"
                    id="usernameField"
                    prepend-icon="mdi-face"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    :rules="getEmailRules"
                    v-model="email"
                    name="emailField"
                    label="Email"
                    id="emailField"
                    prepend-icon="mdi-email"
                    type="email"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="password"
                    :rules="getPasswordRules"
                    name="passwordField"
                    label="Password"
                    id="passwordField"
                    prepend-icon="mdi-puzzle"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    :rules="getPasswordRules"
                    v-model="passwordConfirm"
                    name="passwordConfirmField"
                    label="Password Confirm"
                    id="passwordConfirmField"
                    prepend-icon="mdi-puzzle"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 text-center>
                  <v-btn type="submit" color="info" tile depressed
                    >SignUp</v-btn
                  >
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import { User } from '../../store/types';
import { Action, Getter } from 'vuex-class';

Component.registerHooks(['beforeDestroy']);

const namespace = 'authModule';

@Component({
  name: 'SignUp',
})
export default class SignUp extends Vue {
  private username: string = '';
  private email: string = '';
  private password: string = '';
  private passwordConfirm: string = '';
  private isFormValid: boolean = true;

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

  @Action('ACT_SIGN_UP_USER', { namespace })
  private triggerSignUpUser!: () => void;
  @Getter('getCurrentUser')
  private getUser!: () => void;
  @Watch('getUser')
  private onUserChanged(user: User) {
    if (user) {
      this.$router.push({ path: '/' });
    }
  }

  //////////////////////

  private handleSignUpUser() {
    const userObj: Partial<User> = {
      email: this.email,
      password: this.password,
      username: this.username,
    };

    this.triggerSignUpUser();
  }

  private passConfirmation(confirmation: string) {
    return confirmation === this.password || 'Passwords must match';
  }
}
</script>

<style lang="scss" scoped>
</style>>
