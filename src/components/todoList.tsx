import React, {ChangeEvent, useState, useRef, KeyboardEvent} from 'react';
import {FilterValuesType} from "../App";
import {AddItemForm} from "./addItemForm";
import {EditableSpan} from "./editableSpan";
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import {ButtonsControl} from "./button/buttonsControl";
import {ButtonsFilter} from "./button/buttonsFilter";
import {SuperCheckbox} from "./checkbox/superCheckbox";


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string, taskID: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    updateTaskTitle: (todoListID: string, taskId: string, newTitle: string) => void
    updateTodoListTitle: (todoListID: string, newTitle: string) => void
}

export function TodoList(props: TodoListPropsType) {

    //TODOLIST
    const removeTodoListHandler = () => props.removeTodoList(props.todoListID)
    const updateTodoListTitleHandler = (newTitle: string) => {
        props.updateTodoListTitle(props.todoListID, newTitle)
    }


    //TASK
    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todoListID, newTitle)
    }
    const onChangeTaskStatusHandler = (taskId: string, isDone: boolean) => {
        props.changeTaskStatus(props.todoListID, taskId, isDone)
    }

    //Filter
    const onAllClickHandler = () => props.changeFilter(props.todoListID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todoListID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todoListID, "completed");

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
    const activeTasksCount = props.tasks.filter(task => !task.isDone).length;
    const countActiveTasksForHideMode = isHide ? activeTasksCount : null
    const toggleHideTodoList = () => {
        setIsHide(!isHide)
    }

    //MAP
    const taskItems = props.tasks.length !== 0
        ? <ul>{props.tasks.map(t => {
            const RemoveTaskHandler = () => props.removeTask(props.todoListID, t.id)
            // const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            //     props.changeTaskStatus(props.todoListID, t.id, e.currentTarget.checked);
            // }
            const [editTask, setEditTask] = useState(false)
            const [newTitleTask, setNewTitleTask] = useState(t.title)

            const updateTaskTitleHandler = (newTitle: string) => {
                props.updateTaskTitle(props.todoListID, t.id, newTitle)
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
                    {/*<Checkbox onChange={onChangeTaskStatusHandler} checked={t.isDone}/>*/}
                    <SuperCheckbox checked={t.isDone}
                                   onChange={(isDone)=>onChangeTaskStatusHandler(t.id, isDone)}
                    />

                    <EditableSpan
                        oldTitle={t.title}
                        edit={editTask}
                        newTitle={newTitleTask}
                        editHandler={editTaskHandler}
                        onChangeHandler={onChangeTaskHandler}
                    />
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
