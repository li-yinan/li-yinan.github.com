import sobel from '../../algorithm/sobel';

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

        case 'BACKUP':
            return {
                backup: action.value
            };

        case 'SOBEL':
            var matrix = sobel(state.matrix);
            return {
                matrix: matrix
            };

        case 'RECOVER':
            let matrix = state.backup;
            return {
                matrix: new ImageData(matrix.data, matrix.width)
            };

        default:
            return state;
    }
};
