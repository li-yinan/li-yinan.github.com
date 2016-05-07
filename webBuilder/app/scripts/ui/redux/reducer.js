export default function (state, action)  {
    switch (action.type) {
        case 'ADD':
            return {
                value: state.value + 1
            };
        case 'MATRIX_CHANGED':
            return {
                matrix: action.value
            };
        default:
            return state;
    }
};
