import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from "../App";
import Button from '@mui/material/Button';
import {AddItemForm} from "./addItemForm";
import {EditableSpan} from "./editableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Checkbox from '@mui/material/Checkbox';


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


    //Filter
    const onAllClickHandler = () => props.changeFilter(props.todoListID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todoListID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todoListID, "completed");


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
            const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(props.todoListID, t.id, e.currentTarget.checked);
            }
            const updateTaskTitleHandler = (newTitle: string) => {
                props.updateTaskTitle(props.todoListID, t.id, newTitle)
            }
            const taskClass = t.isDone ? 'task-done' : 'task'

            return (
                <li key={t.id} className={taskClass}>
                    <Checkbox onChange={onChangeTaskStatusHandler} checked={t.isDone}/>
                    <EditableSpan oldTitle={t.title} callBack={updateTaskTitleHandler}/>

                    <IconButton aria-label="delete"
                                onClick={RemoveTaskHandler}
                                size="small">
                        <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                </li>)
        })}</ul>
        : <span>No tasks for this filter type</span>




    return (
        <div className='todo-list'>
            <div className={'todo-list-title-block'}>
                <EditableSpan oldTitle={props.title} callBack={updateTodoListTitleHandler} iconColor='primary'/>
                <IconButton aria-label="hide tasks list"
                            onClick={toggleHideTodoList}
                            color='primary'>
                    {isHide ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                </IconButton>

                <IconButton aria-label="delete"
                            onClick={removeTodoListHandler}
                            color='primary'>
                    <DeleteIcon/>
                </IconButton>
            </div>
            {isHide && <div>{`There are ${countActiveTasksForHideMode} active tasks in the Todo-List`}</div>}
            {!isHide && <>

                <AddItemForm callBack={addTaskHandler}/>
                {taskItems}
                <div style={{display: 'flex', gap: '15px'}}>
                    <Button variant={props.filter === 'all' ? "contained" : "outlined"}
                            onClick={onAllClickHandler}
                            size='small'
                    >
                        All</Button>
                    <Button variant={props.filter === 'active' ? "contained" : "outlined"}
                            onClick={onActiveClickHandler}
                            size='small'
                    >
                        Active</Button>
                    <Button variant={props.filter === 'completed' ? "contained" : "outlined"}
                            onClick={onCompletedClickHandler}
                            size='small'
                    >
                        Completed</Button>

                </div>
            </>
            }
        </div>
    )
}
