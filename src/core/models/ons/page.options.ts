import { NavigatorOptions } from './navigator.options';
import { Component } from 'vue';

export interface OnsPageOptions{
    extends: Component;

    onsNavigatorProps? : {};
    
    onsNavigatorOptions?: NavigatorOptions;
}