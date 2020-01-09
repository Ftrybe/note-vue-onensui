import { VuexModule, Module, Mutation, Action, MutationAction, getModule } from 'vuex-module-decorators';
import store from '../index';
import { UserService } from '@/core/services/user.service';
import UserModule from './user';
@Module({
    dynamic: true,
    name: 'AuthModule',
    store
})
export default class AuthModule extends VuexModule {
    token = localStorage.getItem("token");

    @Mutation
    setToken(value:string){
        this.token = value;
        localStorage.setItem("token",value);
    }
    @Mutation
    clearToken(){
        localStorage.removeItem("token");
        this.token = null;
    }
    @Action
    async login(value:string){ 
        this.setToken(value);
        new UserService().getCurrentUser().then(rsp=>{
            getModule(UserModule).setUserInfo(rsp.data.data);
        });
    };

    @Action 
    async logout(){
        this.clearToken();
        getModule(UserModule).clearUserInfo();
    }
}
