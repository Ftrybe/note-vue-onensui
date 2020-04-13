import { Component } from "vue";

export interface Router {
    // 要跳转的页面
    page: Component;
    // 页面标题
    title: string;
    // 动画选择
    animation: 'none' | 'default' | 'slide-ios' | 'slide-md' | 'lift-ios' | 'lift-md' | 'fade-ios' | 'fade-md' | String;
    // 只显示返回按钮，true后backLabel无效
    backButton: boolean;
    // 上一页面名称
    backLabel: string;
    // 自定义传输数据
    data: any;

    // 自定义导航属性，使用后title,backButton,backLabel,data都将无效
    props: any;
    // 是否替换当前页面
    replace:boolean;
}
