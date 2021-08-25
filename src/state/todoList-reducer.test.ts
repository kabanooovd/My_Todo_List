import {
    addTodoListAC,
    changeTodoListAC,
    editTodoListAC,
    removeTDLAC,
    StateType,
    todoListReducer
} from "./todoList-reducer";
import {v1} from "uuid";

let todolistId1: string
let todolistId2: string
let initState: StateType[] = []

beforeEach(()=>{
    todolistId1 = v1();
    todolistId2 = v1();
    initState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

// let todolistId1 = v1();
// let todolistId2 = v1();
// const initState: StateType[] = [
//     {id: todolistId1, title: "What to learn", filter: "all"},
//     {id: todolistId2, title: "What to buy", filter: "all"}
// ]


test.skip('TodoList should be removed', () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();
    // const initState: StateType[] = [
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ]
    const action = removeTDLAC(todolistId1)
    const finalState = todoListReducer(initState, action)
    expect(finalState.length).toBe(initState.length - 1)
    expect(finalState[0].title).toBe(initState[1].title)
})

test.skip('Addition todoList', () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();
    // const initState: StateType[] = [
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ]
    const action = addTodoListAC('added new lalala')
    const finalState: StateType[] = [
        {id: action.todolistID, title: "added new lalala", filter: "all"},
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    expect(finalState.length).toBe(initState.length + 1)
    expect(finalState[0].id).toBe(action.todolistID)
    expect(finalState[0].title).toBe(action.todolistTitle)
})

test.skip('Edit todoList title', () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();
    // const initState: StateType[] = [
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ]
    const action = editTodoListAC(todolistId2, 'TDL title has been edited')
    const finalState: StateType[] = todoListReducer(initState, action)
    expect(finalState).toEqual([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: action.newTitle, filter: "all"}
    ])
})

test.skip('Change todoList filtration', () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();
    //
    // const initState: StateType[] = [
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ]

    const action = changeTodoListAC(todolistId2, 'completed')
    const finalState: StateType[] = todoListReducer(initState, action)
    expect(finalState).toEqual([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: action.filtration}
    ])
})










