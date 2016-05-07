import { createStore } from 'redux';
import reducer from './reducer';

// let store = createStore(
//     reducer,
//     {},
//     window.devToolsExtension ? window.devToolsExtension() : undefined
// );
//
let store = createStore(
    reducer,
    {}
);

export default store;
