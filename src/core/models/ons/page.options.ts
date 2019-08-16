import { NavigatorOptions } from './navigator.options';
import { Prop, Component } from 'vue/types/options';

export interface OnsPageOptions{
    extends: Component;

    onsNavigatorProps? : {};
    
    onsNavigatorOptions?: NavigatorOptions;
}