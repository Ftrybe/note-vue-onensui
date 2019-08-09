declare module 'vue-onsenui' {
    import { PluginFunction } from "vue";
    export const install: PluginFunction<{}>;
    export function VueOnsen(): any;

    interface Onsenui{
        isReady(): boolean;

        isWebView(): boolean;

        ready(callback: Function): void;

        setDefaultDeviceBackButtonListener(listener: Function): void;

        disableDeviceBackButtonHandler(): void;

        enableDeviceBackButtonHandler(): void;

        enableAutoStatusBarFill(): void;

        disableAutoStatusBarFill(): void;
        
        mockStatusBar(): void;

        disableAnimations(): void;

        enableAnimations(): void;

        disableAutoStyling(): void;

        enableAutoStyling(): void;

        disableIconAutoPrefix(): void;

        forceUIWebViewScrollFix(): void;
    
        platform: Platform;
    }
    interface Platform{
        isAndroid(): boolean;
    }
    module "vue/types/vue" {
        interface Vue {
          $ons: Onsenui;
        }
    }
}