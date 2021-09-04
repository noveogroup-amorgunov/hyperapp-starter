import type {Subscription} from 'hyperapp';
import type {State} from './state'

export const keyDownSubscription: Subscription<State> = [
    (dispatch, {}) => {
        // Subscriptions is not working in modules
        // because actions work in module instance, but
        // subs work only on common state actions

        return () => true;
    },
    {},
];
