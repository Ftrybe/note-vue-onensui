declare module 'vue-touch' {
    import Vue,{ PluginFunction } from 'vue';
    export const install: PluginFunction<{}>;
    export function VueTouch (): any;
}