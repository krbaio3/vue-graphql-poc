<template>
  <v-container grid-list-xs class="mt-5">
    <h1>Profile</h1>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  // Component.registerHooks([
  //   'beforeRouteEnter',
  // ]);

  @Component({
    name: 'Profile',
  })
  export default class Profile extends Vue {}

</script>

<style lang="scss" scoped>

</style>>
