import { VuexModule, Module, Mutation, Action, MutationAction } from 'vuex-module-decorators';
import store from '../index';
@Module({
    dynamic: true,
    name: 'UserModule',
    store
})
export default class UserModule extends VuexModule {
    isLogin: boolean = false;
    isAnonymous: boolean = true;
    @Mutation
    changeState() {
        this.isLogin = !this.isLogin;
    }

    @Action({ commit: 'changeState' })
    async change() { }

}
