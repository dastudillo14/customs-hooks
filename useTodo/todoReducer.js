

export const todoReducer = (initialState = [], action) => {
    switch (action.type) {
        case 'ADD':
            return [...initialState, action.payload];
        case 'REMOVE':
            return initialState.filter((todo) => todo.id != action.payload.id);
        case 'TOGGLE':
            return initialState.map(todo => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        done: !todo.done,
                    }
                }
                return todo;
            });
        default:
            return initialState;
    }
}