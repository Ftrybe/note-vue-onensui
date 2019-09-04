declare module 'vue-onsenui' {
    import { PluginFunction } from "vue";
    import { AlertOptions } from "@/core/models/ons";
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
        
        notification: Notification;

        orientation: Orientation;

        modifier: Modifier;
        
        GestureDetector: any;

       defaultPageLoader: PageLoader;

    }
    interface Notification {

        alert(message: string | AlertOptions, options?: AlertOptions): Promise<HTMLElement>;

        confirm(message: string | AlertOptions, options?: AlertOptions): Promise<HTMLElement>;

        prompt(message: string | AlertOptions, options?: AlertOptions): Promise<HTMLElement>;

        toast(...args: any[]): any;
   }
   interface Orientation {

        on(eventName: string, listener: Function): void;

        once(eventName: string, listener: Function): void;

        off(eventName: string, listener?: Function): void;

        isPortrait(): boolean;

        isLandscape(): boolean;
   }
   interface Platform {

        select(platform: string): void;

        isWebView(): boolean;

        isIOS(): boolean;

        isAndroid(): boolean;

        isAndroidPhone(): boolean;

        isAndroidTablet(): boolean;

        isUIWebView(): boolean;

        isIOSSafari(): boolean;

        isWKWebView(): boolean;

        isIPhone(): boolean;

        isIPhoneX(): boolean;

        isIPad(): boolean;

        isBlackBerry(): boolean;

        isOpera(): boolean;

        isFirefox(): boolean;

        isSafari(): boolean;

        isChrome(): boolean;

        isIE(): boolean;

        isIOS7above(): boolean;

        isEdge(): boolean;

        isWP(): boolean;
   }
   interface Modifier {

        add(element: HTMLElement, ...modifier: string[]): void;

        remove(element: HTMLElement, ...modifier: string[]): void;

        contains(element: HTMLElement, modifier: string): boolean;

        toggle(element: HTMLElement, modifier: string, force?: boolean): void;
   }
   class PageLoader {

       constructor(...args: any[]);

       internalLoader: Function;

       load(options: { page: any, parent: Element, params?: Object }, done: Function): void;
   }

}