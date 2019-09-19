import { VuexModule, Module } from 'vuex-module-decorators';
import store from '../index';
@Module({
    dynamic: true,
    name: 'UserModule',
    store
})
export default class UserModule extends VuexModule {
   isLogin:boolean = false;
}
