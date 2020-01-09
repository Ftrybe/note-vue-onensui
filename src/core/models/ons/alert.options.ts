export interface AlertOptions {
    // Notification message.
    message?: string;
    // Notification message in HTML.
    messageHTML?: string;
    // Labels for the buttons. Default is "OK".
    buttonLabels?: string | Array<string>;
    // Index of primary button. Default is the last one.
    primaryButtonIndex?: number;
    // Whether the dialog is cancelable or not. 
    // Default is false. If the dialog is cancelable it can be closed by clicking the background or pressing the Android back button.
    cancelable?: boolean;
    // Animation name. Available animations are none and fade. Default is fade.
    animation?: string;
    // The <v-ons-alert-dialog> component’s ID.
    id?: string;
    // Dialog title. Default is "Alert".
    title?: string;
    // The <v-ons-alert-dialog> component’s class.
    class?: string;
    // Modifier for the dialog.
    modifier?: string;
    // Function that executes after dialog has been closed.
    callback?: any;
    // Color of the background mask. Default is “rgba(0, 0, 0, 0.2)” (“rgba(0, 0, 0, 0.3)” for Material).
    maskColor?: string;

}