import { VuexModule, Module, Mutation, Action, MutationAction } from 'vuex-module-decorators';
import store from '../index';
@Module({
    dynamic: true,
    name: 'UserModule',
    store
})
export default class UserModule extends VuexModule {
    userInfo = window.localStorage.getItem("userinfo");
    isAnonymous: boolean = true;
    @Mutation
    setUserInfo(info:any) {
        window.localStorage.setItem("userinfo",JSON.stringify(info));
        this.userInfo = info;
    }
    @Mutation
    clearUserInfo(){
        window.localStorage.removeItem("userinfo");
        this.userInfo = null;
    }

    @Action
    async init() {
        this.setUserInfo(JSON.parse(localStorage.getItem('userinfo') || ''))
     }
}
