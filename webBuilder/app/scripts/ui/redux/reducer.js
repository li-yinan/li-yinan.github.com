import sobel from '../../algorithm/sobel';

export default function (state, action)  {
    switch (action.type) {
        case 'ADD':
            return Object.assign({}, state, {
                value: state.value + 1
            });

        case 'MATRIX_CHANGED':
            return Object.assign({}, state, {
                matrix: action.value
            });

        case 'BACKUP':
            return Object.assign({}, state, {
                backup: action.value
            });

        case 'SOBEL':
            var matrix = sobel(state.matrix);
            return Object.assign({}, state, {
                matrix: matrix
            });

        case 'RECOVER':
            let matrix = state.backup;
            return Object.assign({}, state, {
                matrix: new ImageData(matrix.data.slice(), matrix.width)
            });

        default:
            return state;
    }
};
