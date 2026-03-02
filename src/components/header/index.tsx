import { useAppDispatch } from "~/app/hooks";
import TodoTextInput from "~/components/todo-text-input";
import { addTodo } from "~/features/todos/slice";

import styles from "./styles.module.css";

const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <h1 className={styles.heading}>todos</h1>
      <TodoTextInput
        newTodo
        onSave={(text: string) => {
          if (text.length !== 0) {
            dispatch(addTodo({ text }));
          }
        }}
        placeholder="What needs to be done?"
      />
    </header>
  );
};

export default Header;
