import { useId, useState } from "react";
import type { FunctionComponent } from "react";
import cx from "clsx";
import { completeTodo, deleteTodo, editTodo } from "~/features/todos/slice";
import { useAppDispatch } from "~/app/hooks";
import TodoTextInput from "./TodoTextInput";

import styles from "./TodoItem.module.css";

type Todo = {
  text: string;
  completed: boolean;
  id: number;
};

type Props = {
  todo: Todo;
};

const TodoItem: FunctionComponent<Props> = ({ todo }) => {
  const htmlId = useId();
  const [editing, setEditing] = useState(false);
  const dispatch = useAppDispatch();

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleSave = (id: number, text: string) => {
    if (text.length === 0) {
      dispatch(deleteTodo({ id }));
    } else {
      dispatch(editTodo({ id, text }));
    }
    setEditing(false);
  };

  const handleChange = () => {
    dispatch(completeTodo({ id: todo.id }));
  };

  const handleClick = () => {
    dispatch(deleteTodo({ id: todo.id }));
  };

  let element;
  if (editing) {
    element = (
      <TodoTextInput
        text={todo.text}
        editing={editing}
        onSave={(text: string) => handleSave(todo.id, text)}
      />
    );
  } else {
    element = (
      <div className="view">
        <input
          id={htmlId}
          className={styles.toggle}
          type="checkbox"
          checked={todo.completed}
          onChange={handleChange}
        />
        <label htmlFor={htmlId} onDoubleClick={handleDoubleClick}>
          {todo.text}
        </label>
        <button className={styles.destroy} onClick={handleClick} />
      </div>
    );
  }

  return (
    <li
      className={cx(styles.todoItem, {
        [styles.completed]: todo.completed,
        [styles.editing]: editing,
      })}
    >
      {element}
    </li>
  );
};

export default TodoItem;
