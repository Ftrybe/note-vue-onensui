import { AlertOptions } from './alert.options';

export interface ToastOptions extends AlertOptions {
    // Animation name. Available animations are none, fade, ascend, lift and fall. Default is ascend for Android and lift for iOS.
    animation?: string;
    // If true, the toast skips the notification queue and is shown immediately. Defaults to false.
    force?: boolean;
    // Number of miliseconds where the toast is visible before hiding automatically.
    timeout?: number;
}
