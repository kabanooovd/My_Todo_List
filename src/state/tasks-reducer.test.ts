import {v1} from "uuid";
import {
    addTaskAC,
    changeTaskStatusAC,
    editTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from "./tasks-reducer";
import {addTodoListAC, removeTDLAC, StateType} from "./todoList-reducer";

let todolistId1: string
let todolistId2: string
let initState: TasksStateType = {}


beforeEach(()=>{
    todolistId1 = v1();
    todolistId2 = v1();
    initState = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
})


// {
//     [todolistId1]: [
//     {id: v1(), title: "HTML&CSS", isDone: true},
//     {id: v1(), title: "JS", isDone: true}
// ],
//     [todolistId2]: [
//     {id: v1(), title: "Milk", isDone: true},
//     {id: v1(), title: "React Book", isDone: true}
// ]
// }


test.skip('addTodolist to associative array', () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();
    // const initialState: TasksStateType = {
    //     [todolistId1]: [
    //         {id: '1', title: "HTML&CSS", isDone: true},
    //         {id: '2', title: "JS", isDone: true}
    //     ],
    //     [todolistId2]: [
    //         {id: '3', title: "Milk", isDone: true},
    //         {id: '4', title: "React Book", isDone: true}
    //     ]
    // }
    const action = addTodoListAC('added new lalala')
    const finalState: TasksStateType = tasksReducer(initState, action)

    expect(finalState).toEqual({
        [action.todolistID]: [],
        [todolistId1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: '3', title: "Milk", isDone: true},
            {id: '4', title: "React Book", isDone: true}
        ]
    })

})

test.skip('add task into todo list', () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();
    // const initialState: TasksStateType = {
    //     [todolistId1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true}
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "React Book", isDone: true}
    //     ]
    // }
    const action = addTaskAC('new task in current todo list', todolistId2)
    const finalState: TasksStateType = tasksReducer(initState, action)
    expect(finalState[todolistId2].length).toEqual(initState[todolistId2].length + 1)
    expect(finalState[todolistId2][0].title).toEqual(action.taskTitle)
})

test.skip('remove todolist from associative array', () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();
    // const initialState: TasksStateType = {
    //     [todolistId1]: [
    //         {id: '1', title: "HTML&CSS", isDone: true},
    //         {id: '2', title: "JS", isDone: true}
    //     ],
    //     [todolistId2]: [
    //         {id: '3', title: "Milk", isDone: true},
    //         {id: '4', title: "React Book", isDone: true}
    //     ]
    // }
    const finalState: TasksStateType = tasksReducer(initState, removeTDLAC(todolistId2))
    expect(finalState[todolistId2]).toBe(undefined)
})

test.skip('remove task from current tdl', () =>{
    // let todolistId1 = v1()
    // let todolistId2 = v1()
    // const initialState: TasksStateType = {
    //     [todolistId1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true}
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: "Milk", isDone: true}, // should be removed
    //         {id: v1(), title: "React Book", isDone: true}
    //     ]
    // }
    const action = removeTaskAC(todolistId2, initState[todolistId2][0].id)
    const finalState = tasksReducer(initState, action)
    expect(finalState[todolistId2][0]).toEqual(initState[todolistId2][1])
} )

test.skip('Edition task title', () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();
    // const initialState: TasksStateType = {
    //     [todolistId1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true}
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "React Book", isDone: true}
    //     ]
    // }
    const action = editTaskTitleAC(todolistId2, initState[todolistId2][0].id, 'vodka')
    const finalState = tasksReducer(initState, action)
    expect(finalState[todolistId2][0].title).toEqual('vodka')
})

test.skip('change task status', () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();
    // const initialState: TasksStateType = {
    //     [todolistId1]: [
    //         {id: '1', title: "HTML&CSS", isDone: true},
    //         {id: '2', title: "JS", isDone: true}
    //     ],
    //     [todolistId2]: [
    //         {id: '3', title: "Milk", isDone: true},
    //         {id: '4', title: "React Book", isDone: true}
    //     ]
    // }

    const action = changeTaskStatusAC(todolistId1, initState[todolistId1][1].id, false)
    const finalState = tasksReducer(initState, action)

    expect(finalState).toEqual({
        [todolistId1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: false}
        ],
        [todolistId2]: [
            {id: '3', title: "Milk", isDone: true},
            {id: '4', title: "React Book", isDone: true}
        ]
    })

})





