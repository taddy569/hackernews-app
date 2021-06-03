import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  add,
  update,
  updateMany,
  selectedAll,
  removeTodoAsync,
} from "./todosSlice";
// import { asyncRemoveTodo } from "./todosAPI";

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

  return (
    <div className="App">
      <h1>Todos</h1>
      <div>
        <button onClick={handleAddTodo}>+</button>
        <button onClick={handleRemoveManyTodos}>x</button>
        <button onClick={handleAsyncRemoveTodos}>Async Remove</button>
      </div>
      <div>
        {todos.filter((item) => item.isRemove === false).length > 0 ? (
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
        )}
        {todos
          .filter((item) => item.isAsyncRemove === false)
          .map((item, index) => {
            return (
              <div
                key={item.id}
                style={{
                  width: "100%",
                  height: "55px",
                  border: "1px solid black",
                  marginBottom: "15px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ marginRight: "10px" }}>
                  <input
                    type="checkbox"
                    id={item.id}
                    value={item.id}
                    checked={item.isSelected}
                    onChange={handleChangeSelected}
                  />
                </span>
                <Link
                  to=":id"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <span
                    style={{ marginRight: "10px" }}
                  >{`Selected: ${item.isSelected}`}</span>
                  <span
                    style={{ marginRight: "10px" }}
                  >{`Important: ${item.isImportant}`}</span>
                  <span
                    style={{ marginRight: "10px" }}
                  >{`Remove: ${item.isRemove}`}</span>
                  <span style={{ marginRight: "10px" }}>{item.title}</span>
                </Link>
                {/* step by step
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
   */}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Todos;
