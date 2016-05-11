import sobel from '../../algorithm/sobel';
import lineFitting from '../../algorithm/lineFitting';

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

        case 'EDGE_DETECTION':
            var matrix = sobel(state.matrix);
            return Object.assign({}, state, {
                matrix: matrix
            });

        case 'RECOVER':
            let matrix = state.backup;
            return Object.assign({}, state, {
                matrix: new ImageData(matrix.data.slice(), matrix.width)
            });

        case 'AREA_SELECTED':
            var posInfo = action.value;
            var matrix = lineFitting(
                state.matrix,
                posInfo.x,
                posInfo.y,
                posInfo.x + posInfo.width,
                posInfo.y + posInfo.height,
            );
            return Object.assign({}, state, {
                matrix: new ImageData(matrix.data.slice(), matrix.width)
            });

        default:
            return state;
    }
};
