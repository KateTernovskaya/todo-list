import React, {ChangeEvent, useState} from 'react';
import {AddItemForm} from "../components/addItemForm";
import {EditableSpan} from "../components/editableSpan";
import Paper from '@mui/material/Paper';
import {ButtonsControl} from "../components/buttons/buttonsControl";
import {ButtonsFilter} from "../components/buttons/buttonsFilter";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from "../state/todolist/todolists-reducer";
import {addTaskAC} from "../state/tasks/tasks-reducer";
import {TaskType, TodoListPropsType} from "../state/types/types";
import {Task} from "./task";


export function TodoList(props: TodoListPropsType) {
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

    //Filter
    const onAllClickHandler = () => {
        dispatch(changeTodoListFilterAC(props.todoListID, "all"))
    }
    const onActiveClickHandler = () => {
        dispatch(changeTodoListFilterAC(props.todoListID, "active"))
    }
    const onCompletedClickHandler = () => {
        dispatch(changeTodoListFilterAC(props.todoListID, "completed"))
    }

    if (props.filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    //edit TodoListTitle
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
            return (
                <Task todoListId={props.todoListID}
                      taskId={t.id}
                      title={t.title}
                      isDone={t.isDone} />
            )
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
