// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useState } from "react";
import PropTypes from "prop-types";
import cx from "clsx";
import { useAppDispatch } from "~/app/hooks";
import TodoTextInput from "./TodoTextInput";
import { completeTodo, deleteTodo, editTodo } from "~/actions";

const TodoItem = ({ todo }) => {
  const [editing, setEditing] = useState(false);
  const dispatch = useAppDispatch();

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleSave = (id, text) => {
    if (text.length === 0) {
      dispatch(deleteTodo(id));
    } else {
      dispatch(editTodo(id, text));
    }
    setEditing(false);
  };

  const handleChange = () => {
    dispatch(completeTodo(todo.id));
  };

  const handleClick = () => {
    dispatch(deleteTodo(todo.id));
  };

  let element;
  if (editing) {
    element = (
      <TodoTextInput
        text={todo.text}
        editing={editing}
        onSave={(text) => handleSave(todo.id, text)}
      />
    );
  } else {
    element = (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={handleChange}
        />
        <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
        <button className="destroy" onClick={handleClick} />
      </div>
    );
  }

  return (
    <li
      className={cx({
        completed: todo.completed,
        editing,
      })}
    >
      {element}
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
};

export default TodoItem;
