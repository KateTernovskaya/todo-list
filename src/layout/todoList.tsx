import React, {ChangeEvent, memo, useCallback, useEffect, useMemo, useState} from 'react';
import {AddItemForm} from "../components/addItemForm";
import {EditableSpan} from "../components/editableSpan";
import Paper from '@mui/material/Paper';
import {ButtonsControl} from "../components/buttons/controlButton/buttonsControl";
import {ButtonsFilter} from "../components/buttons/filterButton/buttonsFilter";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppRootStateType, useAppDispatch, useAppSelector} from "../state/store";
import {
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    setTodoListAC, thunkGetTodoList
} from "../state/todolist/todo-lists-reducer";
import {addTaskAC} from "../state/tasks/tasks-reducer";
import {TaskType, TodoListPropsType} from "../state/types/types";
import {Task} from "./task";


export const TodoList = memo((props: TodoListPropsType) => {

    let tasks = useAppSelector<TaskType[]>(
        state => state.tasks[props.todoListID]
    )
    const dispatch = useAppDispatch()

    //TODOLIST
    const removeTodoListHandler = useCallback(() => {
        dispatch(removeTodoListAC(props.todoListID))
    }, [dispatch, props.todoListID])
    const updateTodoListTitleHandler = useCallback((newTitle: string) => {
        dispatch(changeTodoListTitleAC(props.todoListID, newTitle))
    }, [dispatch, props.todoListID])

    //TASK
    const addTaskHandler = useCallback((newTitle: string) => {
        dispatch(addTaskAC(props.todoListID, newTitle))
    }, [dispatch, props.todoListID])

    useMemo(() => {
        tasks.sort((a, b) =>
            (a.isDone > b.isDone ? 1 : a.isDone < b.isDone ? -1 : 0));
        return tasks
    }, [tasks.map(t => t.isDone)])


    //Filter
    const onAllClickHandler = useCallback(() => {
        dispatch(changeTodoListFilterAC(props.todoListID, "all"))
    }, [dispatch, props.todoListID])
    const onActiveClickHandler = useCallback(() => {
        dispatch(changeTodoListFilterAC(props.todoListID, "active"))
    }, [dispatch, props.todoListID])
    const onCompletedClickHandler = useCallback(() => {
        dispatch(changeTodoListFilterAC(props.todoListID, "completed"))
    }, [dispatch, props.todoListID])

    useMemo(() => {
        if (props.filter === "active") {
            tasks = tasks.filter(t => !t.isDone);
        }
        if (props.filter === "completed") {
            tasks = tasks.filter(t => t.isDone);
        }
        return tasks
    }, [props.filter])


    //edit TodoListTitle
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)
    const editTitleHandler = () => {
        setEdit(!edit)
        if (edit) {
            updateTodoListTitleHandler(newTitle)
        }
    }
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }, [])


    //IsHide
    const [isHide, setIsHide] = useState(false)
    const activeTasksCount = tasks.filter(task => !task.isDone).length;
    const countActiveTasksForHideMode = isHide ? activeTasksCount : null
    const toggleHideTodoList = () => {
        setIsHide(!isHide)
    }

    //API
    useEffect(() => {
       dispatch(thunkGetTodoList)
    }, [])


    //MAP
    const taskItems = tasks.length !== 0
        ? <ul className='todo-list'> {tasks.map(t => {
            return (
                <Task key={t.id}
                      todoListId={props.todoListID}
                      taskId={t.id}
                      title={t.title}
                      isDone={t.isDone}/>
            )
        })}</ul>
        : <span>No tasks for this filter type</span>


    return (
        <Paper elevation={3} style={{padding: '30px', maxWidth: "280px",height: '100%'}}>

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
})
