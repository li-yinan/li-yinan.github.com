import sobel from '../../algorithm/sobel';
import recFitting from '../../algorithm/recFitting';
import {insert} from '../../algorithm/domTreeBuilder';

export default function (state, action)  {
    switch (action.type) {

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
                matrix: new ImageData(matrix.data.slice(), matrix.width),
                virtualNode: state.virtualNode
            });

        case 'ROLLBACK':
            return action.value;

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
            state.virtualNode = insert(state.virtualNode, result);
            let newObj = Object.assign({}, state, {
                matrix: new ImageData(matrix.data.slice(), matrix.width),
                virtualNode: state.virtualNode
            });
            var arr = (state.timeTravel || []).slice();
            arr.push(newObj);
            newObj.timeTravel = arr;
            return newObj;

        case 'TOLERANCE_CHANGE':
            return Object.assign({}, state, {
                tolerance: action.value
            });

        default:
            return state;
    }
};
