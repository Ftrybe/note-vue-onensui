declare module 'vue-touch' {
    import { PluginFunction } from 'vue';
    export const install: PluginFunction<{}>;
    interface VueTouch {
    }
  
    export const VueTouch: VueTouch
}