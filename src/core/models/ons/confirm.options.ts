import { AlertOptions } from './alert.options';

export interface ConfirmOptions extends AlertOptions {
    //Labels for the buttons. Default is ["Cancel", "OK"].
    buttonLabels?: Array<string>;
}
