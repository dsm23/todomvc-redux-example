// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import TodoItem from "./TodoItem";
import { useAppSelector } from "~/app/hooks";
import { getVisibleTodos } from "~/selectors";

const TodoList = () => {
  const filteredTodos = useAppSelector(getVisibleTodos);

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
