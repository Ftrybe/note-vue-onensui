import { DirectiveOptions, VNode } from 'vue';
import { DirectiveBinding } from 'vue/types/options';

export class DebounceDirective implements DirectiveOptions {

    bind(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) {
        

    }
    inserted(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) {
        console.log("inserted");

    }
    update(el: HTMLElement,binding: DirectiveBinding,vnode: VNode,oldVnode: VNode) {
        console.log("update");

    }
    componentUpdated(el: HTMLElement,binding: DirectiveBinding,vnode: VNode,oldVnode: VNode) {
        console.log("componentUpdated");

    }
    unbind(el: HTMLElement,binding: DirectiveBinding,vnode: VNode,oldVnode: VNode) {
        console.log("unbind");

    }

}
export default new DebounceDirective();
