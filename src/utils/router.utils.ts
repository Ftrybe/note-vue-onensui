import NavigatorModule from "../store/modules/navigator";
import { getModule } from "vuex-module-decorators";
import { Component } from 'vue';
import {Router} from '@/core/models/diary/router'
import { OnsPageOptions } from '@/core/models/ons/page.options';

export class RouterUtils {

    public static forward( router:Router | {page: Component, animation?: string,title?:string,backLabel?:string,backButton?:boolean,props?:any,data?:any,replace?:boolean}) {
        const navigator: NavigatorModule = getModule(NavigatorModule);
        navigator.option({
            animation: router.animation,
            callback: () => navigator.option({})
        });
        const onsNavigatorOptions  = {
            extends: router.page,
            onsNavigatorOptions: {
                animation: router.animation
            },
            onsNavigatorProps: router.props? router.props:{
                toolbarInfo: {
                    backLabel: router.backLabel,
                    title: router.title,
                    backButton: router.backButton
                  },
                data: router.data
            }
        };
        if(router.replace){
            navigator.replace(onsNavigatorOptions);
        }else{
            navigator.push(onsNavigatorOptions);
        }
    }
}
