/**
 * Sync store with localStorage
 * @see https://github.com/jorgebucaran/hyperapp/issues/740#issuecomment-489155268
 */

import type {Subscription} from 'hyperapp';

const STORAGE_KEY = '__store';

function persistFx<T>(_: unknown, state: T) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return () => true;
}

export function persist<T>(state: T): Subscription<T> {
    return [persistFx, state];
}

export function getInitialState<T>(initialState: T): T {
    try {
        return (
            JSON.parse(localStorage.getItem(STORAGE_KEY) as string) ||
            initialState
        );
    } catch (err) {
        return initialState;
    }
}
