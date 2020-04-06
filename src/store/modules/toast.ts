import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators';
import store from '../index';
@Module({
    dynamic: true,
    name: 'ToastModule',
    store
})
class Toast extends VuexModule {

   @Mutation
   errorTip(message:string){}
}
export const ToastModule = getModule(Toast);