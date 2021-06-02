import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  return (
    <div className="App">
      <h1>Todos</h1>
      <div>
        <button>+</button>
        <button>x</button>
        <button>Async Remove</button>
      </div>
      <ul>
        {todos.map((item) => (
          <div>
            {JSON.stringify(item)}
            <br />
            <Link to=":id">
              <div key={item.id}>
                <span>{`Selected: ${item.isSelected}`}</span>
                <span>{`Important: ${item.isImportant}`}</span>
                <span>{item.title}</span>
              </div>

              {/* step by step
      remove action: click on icon of an item => that item will be removed
      fake add action => click add icon => new item will be appeared
      fake edit action => click on edit icon of an item => change title | content of that item
      selected checkbox
      fake remove action many todo(s) => click on that remove many todo items => items those are selected will be removed
      detail page for a todo => when click on an item => detail page will be appeared
      sub todo of a todo => need to think more about data-structure
      can draw or make some todo(s) become sub of todo => search some web API or exist library
 */}
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
