/**
 * State provider for child nodes
 * @see https://github.com/jorgebucaran/hyperapp/issues/941#issue-597277312
 */

import {VNode} from 'hyperapp';

type FnWithState<S> = (...args: any[]) => (state: S) => VNode<any>;
type Fn = (...args: any[]) => VNode<any>;
type View<S> = Fn | FnWithState<S>;

export const stateProvider = <S>(view: View<S>) => (state: S) =>
    (function provide(target): VNode<any> {
        if (typeof target === 'function') {
            return provide(target(state));
        }

        if (target && target.children) {
            // @ts-expect-error children is readonly prop
            target.children = target.children.map(child => provide(child));
        }

        return target;
    })(view(state));
