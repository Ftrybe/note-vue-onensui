import { Action, Module, Mutation, VuexModule, getModule } from 'vuex-module-decorators';
import store from '../index';
import { UserService } from '@/core/services/user.service';
const key = "user";
@Module({
    dynamic: true,
    name: 'UserModule',
    store
})
class User extends VuexModule {

    userInfo = window.localStorage.getItem(key);
    @Mutation
    setUserInfo(info: any) {
        window.localStorage.setItem(key, JSON.stringify(info));
        this.userInfo = info;
    }

    @Mutation
    clearUserInfo() {
        window.localStorage.removeItem(key);
        this.userInfo = null;
    }

    @Action
    async init() {
        this.setUserInfo(JSON.parse(localStorage.getItem(key) || ''));
    }

    @Action
    async getCurrentInfo() {
        const rsp = await new UserService().getCurrentUser();
        const user = rsp.data.data;
        this.setUserInfo(user);
    }
}
export const UserModule = getModule(User);