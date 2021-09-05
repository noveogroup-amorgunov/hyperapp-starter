import type {VNode, Action, Effect} from 'hyperapp';
import {h} from '~/src/core/h';

export type AppState = any;

export type ModuleAction<S> = (statePath: string) => Action<S>;
export type ModuleEffect<S> = (statePath: string) => Effect<S>;

type CreateModuleArgs<State> = {
    initialState: State;
    View: (...args: any[]) => VNode<State>;
};

export function createAction<S, P>(action: Action<S>): ModuleAction<S> {
    return (statePath: string) => (appState: AppState, payload: P) => {
        const nextState = action(appState[statePath], {...payload, statePath});

        if (Array.isArray(nextState)) {
            return [
                {
                    ...appState,
                    [statePath]: nextState[0],
                },
                nextState[1],
            ];
        }

        return {
            ...appState,
            [statePath]: nextState,
        };
    };
}

export function createModule<State, Props extends {id: string}>({
    initialState,
    View,
}: CreateModuleArgs<State>) {
    return (props: Props) => (state: AppState) => {
        if (!state[props.id]) {
            state[props.id] = initialState;
        }

        return <View {...props} state={state[props.id]} />;
    };
}
