// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Footer from "./Footer";
import VisibleTodoList from "./TodoList";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import {
  clearCompleted,
  completeAllTodos,
  getTodos,
} from "~/features/todos/slice";
import { getCompletedTodoCount } from "~/selectors";

const MainSection = () => {
  const dispatch = useAppDispatch();
  const completedCount = useAppSelector(getCompletedTodoCount);
  const todos = useAppSelector(getTodos);

  const todosCount = todos.length;

  const handleClick = () => dispatch(completeAllTodos());

  const handleClearCompleted = () => dispatch(clearCompleted());

  return (
    <section className="main">
      {!!todosCount && (
        <span>
          <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todosCount}
            readOnly
          />
          <label onClick={handleClick} />
        </span>
      )}
      <VisibleTodoList />
      {!!todosCount && (
        <Footer
          completedCount={completedCount}
          activeCount={todosCount - completedCount}
          onClearCompleted={handleClearCompleted}
        />
      )}
    </section>
  );
};

export default MainSection;
