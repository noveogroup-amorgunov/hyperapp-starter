import type {VNode} from 'hyperapp';
import {h} from '~/src/core/h';
import type {State} from './state';
import * as actions from './actions';
import {Button} from '~/src/shared/components/Button';

export type Props = {
    id: string;
    state: State;
};

export const View = ({id, state}: Props): VNode<State> => {
    return (
        <div>
            <h1>
                state.{id}.value: {state.value}
            </h1>
            <Button onclick={actions.add(id)}>Add</Button>
            <Button onclick={actions.addAsync(id)}>Add async</Button>
            <Button onclick={actions.subract(id)}>Subtract</Button>
        </div>
    );
};
