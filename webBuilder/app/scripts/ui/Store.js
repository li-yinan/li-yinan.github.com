import { createStore } from 'redux';
import reducer from './reducer';
import state from './propsMap';

let store = createStore(
    reducer,
    state(),
    window.devToolsExtension ? window.devToolsExtension() : undefined
);

export default store;
