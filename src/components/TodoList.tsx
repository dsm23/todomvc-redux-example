// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import TodoItem from "./TodoItem";
import { useAppSelector } from "~/app/hooks";
import { getVisibleTodos } from "~/selectors";

import styles from "./TodoList.module.css";

const TodoList = () => {
  const filteredTodos = useAppSelector(getVisibleTodos);

  return (
    <ul className={styles.todoList}>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
