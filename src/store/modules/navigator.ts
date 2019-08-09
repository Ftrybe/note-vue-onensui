import { VuexModule, Module, Mutation } from 'vuex-module-decorators';
import store from '../index';
import { Component } from 'vue';
@Module({
    dynamic: true,
    name: 'NavigatorModule',
    store
})
export default class NavigatorModule extends VuexModule {
    stack: any[] = [];
    options = {};
    @Mutation
    push(page: Component){
        this.stack.push(page);
    }

    @Mutation
    pop(){
        if (this.stack.length > 1) {
            this.stack.pop();
          }
    }

    @Mutation
    replace(page: Component){
        this.stack.pop();
          this.stack.push(page);
    }
    
    @Mutation
    reset(page: Component){
        this.stack = [page || this.stack[0]];
    }

    @Mutation
    option(newOptions = {}) {
        this.options = newOptions;
    }
    
}
