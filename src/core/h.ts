/**
 * Extend h function to use JSX and provide JSX typings
 */

import * as hyperapp from 'hyperapp';
import type {VNode} from 'hyperapp';

declare global {
    namespace JSX {
        type Element = any; // VNode<any>;
        type IntrinsicElements = {
            [elemName: string]: any;
        };
    }
}

type Component<T> = (props: T, children: VNode<any>[]) => VNode<any>;

export const h = (
    tag: string | Component<unknown>,
    props: any,
    ...children: VNode<any>[]
) => {
    if (typeof tag === 'function') {
        return tag(props, children);
    }

    /** @see https://github.com/jorgebucaran/hyperapp/pull/1011 */
    const transformChildren = children.flat().map(any => {
        const isPrimitive = typeof any === 'string' || typeof any === 'number';
        return isPrimitive ? hyperapp.text(any) : any;
    });

    return hyperapp.h(tag, props || {}, transformChildren);
};
