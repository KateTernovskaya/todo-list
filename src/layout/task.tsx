import React, {ChangeEvent, memo, useCallback, useState} from 'react';
import {SuperCheckbox} from "../components/superCheckbox";
import {EditableSpan} from "../components/editableSpan";
import {ButtonsControl} from "../components/buttons/controlButton/buttonsControl";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks/tasks-reducer";
import {useDispatch} from "react-redux";


type TaskPropsType = {
    todoListId: string
    taskId: string
    title: string
    isDone: boolean
}
export const Task: React.FC<TaskPropsType> = memo((
    {
        todoListId, taskId, title, isDone,
    }) => {

    const dispatch = useDispatch()

    //edit TaskTitle
    const [editTask, setEditTask] = useState(false)
    const [newTitleTask, setNewTitleTask] = useState(title)

    const editTaskHandler = () => {
        if (editTask) {
            updateTaskTitleHandler(taskId, newTitleTask)
        }
        setEditTask(!editTask)
    }

    const onChangeTaskHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setNewTitleTask(e.currentTarget.value)
    }, [])

    //TASK
    const onChangeTaskStatusHandler = useCallback((taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todoListId, taskId, isDone))
    }, [dispatch, todoListId])
    const RemoveTaskHandler = useCallback((taskId: string,) => {
        dispatch(removeTaskAC(todoListId, taskId))
    }, [dispatch, todoListId])
    const updateTaskTitleHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todoListId, taskId, newTitle))
    }, [dispatch, todoListId])


    const taskClass = isDone ? 'task-done' : 'task'
    return (
        <li key={taskId} className={taskClass}
        >
            <label className={'check-todo'}>
                <SuperCheckbox checked={isDone}
                               onChange={(isDone) => onChangeTaskStatusHandler(taskId, isDone)}
                />

                <EditableSpan
                    oldTitle={title}
                    edit={editTask}
                    newTitle={newTitleTask}
                    editHandler={editTaskHandler}
                    onChangeHandler={onChangeTaskHandler}
                />
            </label>
            <ButtonsControl callbackDelete={() => RemoveTaskHandler(taskId)}
                            callbackToggleEdit={editTaskHandler}
                            edit={editTask}
            />
        </li>
    );
})

