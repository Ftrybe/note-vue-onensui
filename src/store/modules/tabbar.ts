import { VuexModule, Module, Mutation , Action} from 'vuex-module-decorators';
import store from '../index';
import { Component } from 'vue';
@Module({
    dynamic: true,
    name: 'TabbarModule',
    store
})
export default class TabbarModule extends VuexModule {
    index: number = 1;
    @Mutation
    set(index: number){
        this.index = index;
    }   
}
