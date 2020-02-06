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

    @Watch('isUser')
    private onUserChanged(val: User, oldVal: User) {
        if ((val !== null && val.username !== '') && (oldVal !== null && oldVal.username !== val.username)) {
            this.showing = true;
        }
    }
    private get onUser() {
        if (this.isUser !== null || (this.isUser as User).username === '') {
            this.showing = true;
        }
        return this.isUser;
    }
}
</script>

<style scoped>

</style>
