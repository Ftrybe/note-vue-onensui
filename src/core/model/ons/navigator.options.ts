import { AnimationOptions } from './animation.options';

export interface NavigatorOptions {

    animation?: 'none' | 'default' | 'slide-ios' | 'slide-md' | 'lift-ios' | 'lift-md' | 'fade-ios' | 'fade-md' | String;

    animationOptions?: AnimationOptions;

    callback?: Function;
}
