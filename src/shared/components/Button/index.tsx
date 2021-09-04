import type {VNode, Action} from 'hyperapp';
import {h} from '~/src/core/h';

type ButtonProps = {
    onclick: Action<any>;
};

export function Button(props: ButtonProps, children: VNode<unknown>) {
    const {onclick} = props;

    return <button onclick={onclick}>{children}</button>;
}
