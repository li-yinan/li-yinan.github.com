export const addTodo = (text) => {
    return {
        type: 'ADD'
    };
}

export const matrixChanged = (matrix) => {
    return {
        type: 'MATRIX_CHANGED',
        value: matrix
    };
}

export const backup = (matrix) => {
    return {
        type: 'BACKUP',
        value: matrix
    };
}

export const edgeDetection = () => {
    return {
        type: 'EDGE_DETECTION'
    };
}

export const recover = () => {
    return {
        type: 'RECOVER'
    };
}

export const areaSelected = (posInfo) => {
    return {
        type: 'AREA_SELECTED',
        value: posInfo
    };
}

export const toleranceChange = (tolerance) => {
    return {
        type: 'TOLERANCE_CHANGE',
        value: tolerance
    };
}

export const rollback = (state) => {
    return {
        type: 'ROLLBACK',
        value: state
    };
}
