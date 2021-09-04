import {ModuleAction, ModuleEffect, createAction} from '~/src/core/module';
import type {State} from './state';

export const add: ModuleAction<State> = createAction(state => ({
    ...state,
    value: state.value + 1,
}));

export const subract: ModuleAction<State> = createAction(state => ({
    ...state,
    value: state.value - 1,
}));

const addAsyncEffect: ModuleEffect<State> = statePath => [
    dispatch => {
        setTimeout(() => {
            dispatch(add(statePath));
        }, 1000);
    },
    null,
];

export const addAsync: ModuleAction<State> = createAction((state, {statePath}) =>
    [state, addAsyncEffect(statePath)]
);
