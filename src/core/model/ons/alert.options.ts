export interface AlertOptions {
    message?: string;
    messageHTML?: string;
    buttonLabel?: string;
    buttonLabels?: string[];
    primaryButtonIndex?: number;
    cancelable?: boolean;
    animation?: string;
    title?: string;
    modifier?: string;
    callback?: any;
    id?: string;
}