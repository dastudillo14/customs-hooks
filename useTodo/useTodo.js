import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";



//callback para inicializar el state en useReducer.
const init = () => JSON.parse(localStorage.getItem('TODOS')) || [];


/**
 * Custom Hook para TODOS.
 * - You can add, remove and update status 
 * @returns 
 */
export const useTodo = () => {
    
    const [todoList, dispatchTodo] = useReducer(todoReducer, [], init);

    //Se ejecuta al cargar el componente y tmbien
    //gracias al [ todoList ] escucha cambios solo de el para ejecutar cualquier proceso, como el setItem...
    useEffect(() => {

        localStorage.setItem('TODOS', JSON.stringify(todoList ?? []));

    }, [todoList])

    //Agrega un todo
    const handleAddTodo = (value) => {
        const action = {
            type: 'ADD',
            payload: value
        };

        dispatchTodo(action)
    }

    //Elimina un todo
    const handleRemoveTodo = (id) => {
        const action = {
            type: 'REMOVE',
            payload: { id }
        };
        dispatchTodo(action)
    };

    //Cambia el estado de un todo
    const handeToggleTodo = (id) => {
        const action = {
            type: 'TOGGLE',
            payload: { id }
        };
        console.log(action)
        dispatchTodo(action)
    };

    return {
        handleAddTodo,
        handeToggleTodo,
        handleRemoveTodo,
        todoList,
        pendingTodos: todoList.filter(t=> !t.done).length ,
        countTodos: todoList.length
    }
};