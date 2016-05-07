export const addTodo = (text) => {
    return {
        type: 'ADD'
    }
}

export const matrixChanged = (matrix) => {
    return {
        type: 'MATRIX_CHANGED',
        value: matrix
    }
}
