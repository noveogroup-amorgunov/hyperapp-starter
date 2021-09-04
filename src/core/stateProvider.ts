/**
 * State provider for child nodes
 * @see https://github.com/jorgebucaran/hyperapp/issues/941#issue-597277312
 */

import {VNode} from 'hyperapp';

type ExtendedVNode = VNode<any> & {name?: any};
type FnWithState = (...args: any[]) => (state: State) => VNode<any>;
type Fn = (...args: any[]) => ExtendedVNode;
type State = any;
type View = Fn | FnWithState;

export const stateProvider = (view: View) => (state: State) =>
    (function provide(target): VNode<any> {
        if (typeof target === 'function') {
            return provide(target(state));
        }

        if (target && typeof target.name === 'function') {
            return provide(target.name(state));
        }

        if (target && target.children) {
            // @ts-expect-error children is readonly prop
            target.children = target.children.map(child => provide(child));
        }

        return target;
    })(view(state));
