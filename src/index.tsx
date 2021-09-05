import {app} from 'hyperapp';
import {h} from '~/src/core/h';
import {stateProvider} from '~/src/core/stateProvider';
import {getInitialState, persist} from '~/src/core/persistStore';
import {AppState} from '~/src/core/module';
import {Counter} from '~/src/modules/Counter';

export const View = () => (state: AppState) => {
    return (
        <main>
            <Counter id="__foo__" />
            <Counter id="__bar__" />
            <br />
            <pre>
                <code>{JSON.stringify(state, null, '  ')}</code>
            </pre>
        </main>
    );
};

app<AppState>({
    init: getInitialState<AppState>({}),
    view: stateProvider<AppState>(View),
    subscriptions: state => [persist(state)],
    node: document.querySelector('#app')!,
});
