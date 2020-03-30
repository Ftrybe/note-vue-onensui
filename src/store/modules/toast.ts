import { VuexModule, Module, Mutation } from 'vuex-module-decorators';
import store from '../index';
@Module({
    dynamic: true,
    name: 'ToastModule',
    store
})
export default class ToastModule extends VuexModule {

   @Mutation
   errorTip(message:string){}
}
