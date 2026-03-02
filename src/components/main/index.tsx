// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useId } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import Footer from "~/components/footer";
import VisibleTodoList from "~/components/todo-list";
import {
  clearCompleted,
  completeAllTodos,
  getTodos,
} from "~/features/todos/slice";
import { getCompletedTodoCount } from "~/selectors";

import styles from "./styles.module.css";

const MainSection = () => {
  const id = useId();
  const dispatch = useAppDispatch();
  const completedCount = useAppSelector(getCompletedTodoCount);
  const todos = useAppSelector(getTodos);

  const todosCount = todos.length;

  const handleClick = () => dispatch(completeAllTodos());

  const handleClearCompleted = () => dispatch(clearCompleted());

  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={styles.main}>
      {!!todosCount && (
        <span>
          <input
            id={id}
            className={styles.toggleAll}
            type="checkbox"
            checked={completedCount === todosCount}
            readOnly
          />
          <label htmlFor={id} onClick={handleClick}>
            Toggle all
          </label>
        </span>
      )}
      <VisibleTodoList />
      <AnimatePresence initial={false}>
        {!!todosCount && (
          <motion.div
            className="grid transition-[grid-template-rows]"
            initial={{
              gridTemplateRows: prefersReducedMotion ? "1fr" : "0fr",
            }}
            animate={{
              gridTemplateRows: "1fr",
            }}
            exit={{
              gridTemplateRows: prefersReducedMotion ? "1fr" : "0fr",
            }}
            transition={{
              type: "spring",
              duration: prefersReducedMotion ? 0 : 0.3,
              ease: "easeInOut",
            }}
          >
            <div className="overflow-hidden">
              <Footer
                completedCount={completedCount}
                activeCount={todosCount - completedCount}
                onClearCompleted={handleClearCompleted}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MainSection;
