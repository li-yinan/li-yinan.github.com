import sobel from '../../algorithm/sobel';
import recFitting from '../../algorithm/recFitting';
import {get, reset, insert} from '../../algorithm/domTreeBuilder';

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
            reset();
            return Object.assign({}, state, {
                matrix: new ImageData(matrix.data.slice(), matrix.width),
                virtualNode: get()
            });

        case 'AREA_SELECTED':
            var posInfo = action.value;
            var matrix = state.matrix;
            var result = recFitting(
                matrix,
                posInfo.x,
                posInfo.y,
                posInfo.x + posInfo.width,
                posInfo.y + posInfo.height,
                state.tolerance || 10,
            );
            insert(result);
            return Object.assign({}, state, {
                matrix: new ImageData(matrix.data.slice(), matrix.width),
                virtualNode: get()
            });

        case 'TOLERANCE_CHANGE':
            return Object.assign({}, state, {
                tolerance: action.value
            });

        default:
            return state;
    }
};
