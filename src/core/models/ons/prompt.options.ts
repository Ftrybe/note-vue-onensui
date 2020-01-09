import { AlertOptions } from './alert.options';
export interface PromptOptions extends AlertOptions{
    // Placeholder for the text input.
    placeholder?:string;
    // Default value for the text input.
    defaultValue?:string;
    // Type of the input component (password, date…). Default is text.
    inputType?:string;
    // Autofocus the input component. Default is true. In Cordova, 
    // KeyboardDisplayRequiresUserAction in config.xml must be false to activate this feature.
    autofocus?:boolean;
    // Submit automatically when enter is pressed. Default is true.
    submitOnEnter?:string;
}
