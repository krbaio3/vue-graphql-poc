<template>
    <v-snackbar v-model="showing" color="success" :timeout="5000" bottom centered>
        <v-icon class="mr-3">mdi-check-circle</v-icon>
        <h3>You are now signed in!</h3>
        <v-btn dark text @click="showing = false">Close</v-btn>
    </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import { Getter, namespace } from 'vuex-class';
import { User } from '@/store/types';
import { from } from 'rxjs';
import { Subscription } from 'apollo-client/util/Observable';
import { Observable } from 'apollo-link';

@Component({
    name: 'Snackbar',
})
export default class SanckBarComponent extends Vue {
    @Prop({ required: false, default: false })
    public readonly isUser!: User;
    private showing: boolean = false;
    private subscription$!: Subscription;
    private myObservable$ = Vue.observable({
        user: this.$store.state.user,
    });

    private created() {
        // console.log(this.isUser.username);
        // FALLA usar vue-rx
        if (this.myObservable$ !== null && this.myObservable$.user.username !== '') {
            return this.showing = true;
        }
        return this.showing = false;
    }

    @Watch('isUser')
    private onUserChanged(val: User, oldVal: User) {
        if (oldVal === null || oldVal.username === '') {
            this.showing = true;
        }
    }

    private subscriptions() {
        console.log('entra en subscriptions');
    }
}
</script>

<style scoped>

</style>
