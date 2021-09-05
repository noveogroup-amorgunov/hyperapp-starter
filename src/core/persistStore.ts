/**
 * Sync store with localStorage
 * @see https://github.com/jorgebucaran/hyperapp/issues/740#issuecomment-489155268
 */

import type {Subscription} from 'hyperapp';

const STORAGE_KEY = '__store';

function persistFx<S>(_: unknown, state: S) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return () => true;
}

export function persist<S>(state: S): Subscription<S> {
    return [persistFx, state];
}

export function getInitialState<S>(initialState: S): S {
    try {
        return (
            JSON.parse(localStorage.getItem(STORAGE_KEY) as string) ||
            initialState
        );
    } catch (err) {
        return initialState;
    }
}
