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

export const sobelAction = () => {
    return {
        type: 'SOBEL'
    };
}

export const recover = () => {
    return {
        type: 'RECOVER'
    };
}
