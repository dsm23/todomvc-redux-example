// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import TodoTextInput from "./TodoTextInput";
import { addTodo } from "~/actions";
import { useAppDispatch } from "~/app/hooks";

const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo
        onSave={(text) => {
          if (text.length !== 0) {
            dispatch(addTodo(text));
          }
        }}
        placeholder="What needs to be done?"
      />
    </header>
  );
};

export default Header;
