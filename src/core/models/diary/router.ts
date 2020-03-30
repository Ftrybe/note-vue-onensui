import { Component } from "vue";

export interface Router {
    page: Component;
    title: string;
    animation: string;
    backButton: boolean;
    backLabel: string;
    props: any;
    data: any;
    replace:boolean;
}
