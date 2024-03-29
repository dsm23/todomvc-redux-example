import { useAppDispatch } from "~/app/hooks";
import TodoTextInput from "./TodoTextInput";
import { addTodo } from "~/features/todos/slice";

const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <h1>todos</h1>
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
