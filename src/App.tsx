import React from 'react';
import './App.css';
import {AddItemForm} from "./components/addItemForm";
import {ButtonAppBar} from "./components/appBar";
import {Container} from "./components/styled/container";
import {addTodoListAC} from "./state/todolist/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListsType} from "./state/types/types";
import {TodoList} from "./layout/todoList";

function App() {

    const todoLists = useSelector<AppRootStateType, TodoListsType[]>(
        state => state.todolists
    )
    const dispatch = useDispatch()

    //TODOLIST
    function addTodoList(title: string) {
        dispatch(addTodoListAC(title))
    }

    //MAP
    const mapTodoLists = todoLists.map(item => {
        return (
            <TodoList key={item.id}
                      todoListID={item.id}
                      title={item.title}
                      filter={item.filter}
            />
        )
    })

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container>
                <div className='addTodolist'>
                    <h2>Add new Todo List: </h2>
                    <AddItemForm callBack={addTodoList}/>
                </div>
                <div className='todolistGallery'>
                    {mapTodoLists}
                </div>
            </Container>
        </div>
    );
}

export default App;
