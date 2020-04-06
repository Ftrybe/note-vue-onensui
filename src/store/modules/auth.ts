import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '../index';
import {MemorandumTagModule} from './memorandum-tag';
import {UserModule} from './user';
const key = "user_token";
@Module({
    dynamic: true,
    name: 'AuthModule',
    store
})
class Auth extends VuexModule {
    token = localStorage.getItem(key);

    @Mutation
    setToken(value: string) {
        this.token = value;
        localStorage.setItem(key, value);
    }
    @Mutation
    clearToken() {
        localStorage.removeItem(key);
        this.token = null;
    }
    @Action
    async login(value: string) {
        this.setToken(value);
        MemorandumTagModule.getTagList();
        await UserModule.getCurrentInfo();
    };

    @Action
    async logout() {
        this.clearToken();
        UserModule.clearUserInfo();
        MemorandumTagModule.clear();
    }
}
export const AuthModule  = getModule(Auth);
