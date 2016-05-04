export default function (state, action)  {
    switch (action.type) {
        case 'ADD':
            return {
                value: state.value + 1
            };
        case 'b':
            return state + 1;
        default:
            return state;
    }
};
