import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  add,
  update,
  updateMany,
  selectedAll,
  removeTodoAsync,
} from "./todosSlice";
// import { asyncRemoveTodo } from "./todosAPI";
import TodoItem from "./TodoItem";

const generateDefaultAddedTodo = () => {
  const uniqueValue = new Date().getTime();
  return {
    id: uniqueValue,
    title: `buy ${uniqueValue}`,
    content: `content ${uniqueValue}`,
    label: "0f0", // change color
    createdAt: uniqueValue,
    isImportant: false,
    isComplete: false,
    isRemove: false,
    isAsyncRemove: false, // undo like gmail
    isSelected: false,
  };
};

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleAddTodo = () => {
    dispatch(add(generateDefaultAddedTodo()));
  };

  const handleChangeSelected = (e) => {
    const { value, checked } = e.target;
    dispatch(
      update({
        id: Number(value),
        isSelected: checked,
      })
    );
  };

  const handleRemoveManyTodos = () => {
    dispatch(
      updateMany({
        isRemove: true,
      })
    );
  };

  const handleChangeSelectedAll = (e) => {
    const { value, checked } = e.target;
    dispatch(
      selectedAll({
        checked,
      })
    );
  };

  const handleAsyncRemoveTodos = () => {
    dispatch(removeTodoAsync());
  };

  const handleSetImportant = (payload) => {
    dispatch(update(payload));
  };

  return (
    <div className="App">
      <h1>Todos</h1>
      <div>
        <button className="custom-button" onClick={handleAddTodo}>
          Add
        </button>
        <button className="custom-button" onClick={handleRemoveManyTodos}>
          Remove
        </button>
        <button className="custom-button" onClick={handleAsyncRemoveTodos}>
          Async Remove
        </button>
      </div>
      <div>
        {/* {todos.filter((item) => item.isRemove === false).length > 0 ? (
          <div
            style={{
              width: "100%",
              height: "55px",
              border: "1px solid black",
              borderBottomWidth: "0px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              <input
                type="checkbox"
                id={"all"}
                value={"all"}
                onChange={handleChangeSelectedAll}
              />
            </span>

            <span style={{ marginRight: "10px" }}>Is Selected</span>
            <span style={{ marginRight: "10px" }}>Is Important</span>
            <span style={{ marginRight: "10px" }}>Is Remove</span>
            <span style={{ marginRight: "10px" }}>Title</span>
          </div>
        ) : (
          ""
        )} */}
        {todos
          .filter((item) => item.isAsyncRemove === false)
          .map((item) => {
            return <TodoItem item={item} onSetImportant={handleSetImportant} />;
          })}
      </div>
    </div>
  );
};

export default Todos;

/* step by step
      [OK]  fake add action => click add icon => new item will be appeared 
      
      [OK] selected checkbox
      [OK] should have a head title , with total checkout - name - other properties, ...
      [OK] selected total checkout => select all checkbox below
        selected checkbox should be reset to "isSelected: false" when refresh page, closing app, change component (from Todo to Counter, ...)
        remove action: click on icon of an item => that item will be removed => remove an item will become remove many item(s)
      [OK]  fake remove action many todo(s) => click on that remove many todo items => items those are selected will be removed
        async remove will appeared "undo" button after click "async remove" button
        need only state for "truly remove", 'async remove' should become another state,...
  
        fake edit action => click on edit icon of an item => change title | content of that item
        detail page for a todo => when click on an item => detail page will be appeared
  
        sub todo of a todo => need to think more about data-structure
        can draw or make some todo(s) become sub of todo => search some web API or exist library

        check border-bottom of todo item
        display todo(s) in grid of flex mode, card, ...

        scss and BEM, each component should have their own styling file
        general structure css file for project, css variable
          https://stackoverflow.com/questions/15831657/creating-css-global-variables-stylesheet-theme-management
          https://github.com/minhthao56/core-webpack/blob/master/src/assets/scss/variable.scss
        doing - done - all
        redux persist for localStorage

        dark mode vs light mode // useContext or redux and save to localStorage
        multi language ?

        use debug web chrome
        use component and pro-fi-lier
   */
