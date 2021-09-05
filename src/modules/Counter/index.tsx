import {createModule} from '~/src/core/module';
import {initialState, State} from './state';
import {View, Props} from './View';

export const Counter = createModule<State, Omit<Props, 'state'>>({
    initialState,
    View,
});
