import NavigatorModule from "../store/modules/navigator";
import { getModule } from "vuex-module-decorators";
import { Component } from 'vue';
import {Router} from '@/core/models/diary/router'

export class RouterUtils {

    public static forward( router:Router | {page: Component, animation?: string,title?:string,backLabel?:string,backButton?:boolean,props?:any}) {
       const navigator: NavigatorModule = getModule(NavigatorModule);
        navigator.option({
            animation: router.animation,
            callback: () => navigator.option({})
        });

        navigator.push({
            extends: router.page,
            onsNavigatorOptions: {
                animation: router.animation
            },
            onsNavigatorProps: router.props? router.props:{
                toolbarInfo: {
                    backLabel: router.backLabel,
                    title: router.title,
                    backButton: router.backButton
                  }
            }
        });
    }
}
