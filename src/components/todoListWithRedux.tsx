import React, {ChangeEvent, useState} from 'react';
import {AddItemForm} from "./addItemForm";
import {EditableSpan} from "./editableSpan";
import Paper from '@mui/material/Paper';
import {ButtonsControl} from "./button/buttonsControl";
import {ButtonsFilter} from "./button/buttonsFilter";
import {SuperCheckbox} from "./checkbox/superCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from "../state/todolist/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks/tasks-reducer";
import {FilterValuesType} from "../AppWithRedux";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todoListID: string
    title: string
    filter: FilterValuesType
}

export function TodoListWithRedux(props: TodoListPropsType) {
    let tasks = useSelector<AppRootStateType, TaskType[]>(
        state => state.tasks[props.todoListID]
    )

    const dispatch = useDispatch()

    //TODOLIST
    const removeTodoListHandler = () => {
        dispatch(removeTodoListAC(props.todoListID))
    }
    const updateTodoListTitleHandler = (newTitle: string) => {
        dispatch(changeTodoListTitleAC(props.todoListID, newTitle))
    }

    //TASK
    const addTaskHandler = (newTitle: string) => {
        dispatch(addTaskAC(props.todoListID, newTitle))
    }
    const onChangeTaskStatusHandler = (taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(props.todoListID, taskId, isDone))
    }

    //Filter
    const onAllClickHandler = () => {
        dispatch(changeTodoListFilterAC(props.todoListID,"all" ))
    }
    const onActiveClickHandler = () => {
        dispatch(changeTodoListFilterAC(props.todoListID,"active" ))
    }
    const onCompletedClickHandler = () => {
        dispatch(changeTodoListFilterAC(props.todoListID,"completed" ))
    }

    if (props.filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    //edit text
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)

    const editTitleHandler = () => {
        setEdit(!edit)
        if (edit) {
            updateTodoListTitleHandler(newTitle)
            console.log(edit)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }


    //IsHide
    const [isHide, setIsHide] = useState(false)
    const activeTasksCount = tasks.filter(task => !task.isDone).length;
    const countActiveTasksForHideMode = isHide ? activeTasksCount : null
    const toggleHideTodoList = () => {
        setIsHide(!isHide)
    }



    //MAP
    const taskItems = tasks.length !== 0
        ? <ul className='todo-list'> {tasks.map(t => {
            const RemoveTaskHandler = () => {
                dispatch(removeTaskAC(props.todoListID, t.id))
            }
            // const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            //     props.changeTaskStatus(props.todoListID, t.id, e.currentTarget.checked);
            // }


            const [editTask, setEditTask] = useState(false)
            const [newTitleTask, setNewTitleTask] = useState(t.title)

            const updateTaskTitleHandler = (newTitle: string) => {
                dispatch(changeTaskTitleAC(props.todoListID, t.id, newTitle))
            }
            const editTaskHandler = () => {
                if (editTask) {
                    updateTaskTitleHandler(newTitleTask)
                }
                setEditTask(!editTask)
            }
            const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                setNewTitleTask(e.currentTarget.value)
            }

            const taskClass = t.isDone ? 'task-done' : 'task'



            return (
                <li key={t.id} className={taskClass}
                >
                    <label className={'check-todo'}>
                        <SuperCheckbox checked={t.isDone}
                                       onChange={(isDone) => onChangeTaskStatusHandler(t.id, isDone)}
                        />

                        <EditableSpan
                            oldTitle={t.title}
                            edit={editTask}
                            newTitle={newTitleTask}
                            editHandler={editTaskHandler}
                            onChangeHandler={onChangeTaskHandler}
                        />
                    </label>


                    <ButtonsControl callbackDelete={RemoveTaskHandler}
                                    callbackToggleEdit={editTaskHandler}
                                    edit={editTask}
                    />
                </li>)
        })}</ul>
        : <span>No tasks for this filter type</span>


    return (
        <Paper elevation={3} style={{padding: '30px', maxWidth: "280px", width: '100%'}}>

            <div className='title-block'>
                <EditableSpan
                    oldTitle={props.title}
                    edit={edit}
                    newTitle={newTitle}
                    editHandler={editTitleHandler}
                    onChangeHandler={onChangeHandler}
                    isTitle
                />
                <ButtonsControl isTitle
                                callbackDelete={removeTodoListHandler}
                                callbackToggleEdit={editTitleHandler}
                                callbackToggleHide={toggleHideTodoList}
                                edit={edit}
                                isHide={isHide}

                />
            </div>

            {isHide && <div>{`There are ${countActiveTasksForHideMode} active tasks in the Todo-List`}</div>}
            {!isHide && <>

                <AddItemForm callBack={addTaskHandler}/>
                {taskItems}
                <ButtonsFilter filter={props.filter}
                               allClick={onAllClickHandler}
                               activeClick={onActiveClickHandler}
                               completedClick={onCompletedClickHandler}
                />

            </>
            }

        </Paper>

    )
}
