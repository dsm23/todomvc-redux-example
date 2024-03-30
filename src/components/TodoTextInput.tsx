import { useState } from "react";
import type {
  ChangeEventHandler,
  FocusEventHandler,
  FunctionComponent,
  InputHTMLAttributes,
  KeyboardEventHandler,
} from "react";
import cx from "clsx";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  onSave: (text: string) => void;
  text?: string;
  editing?: boolean;
  newTodo?: boolean;
};

const TodoTextInput: FunctionComponent<Props> = ({
  className,
  editing,
  newTodo,
  onSave,
  ...props
}) => {
  const [text, setText] = useState(props.text || "");

  const handleSubmit: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const newText = e.currentTarget.value.trim();

    if (e.key === "Enter") {
      onSave(newText);
      if (newTodo) {
        setText("");
      }
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    if (!newTodo) {
      onSave(e.target.value);
    }
  };

  return (
    <input
      {...props}
      className={cx({
        edit: editing,
        "new-todo": newTodo,
        className,
      })}
      type="text"
      autoFocus
      value={text}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleSubmit}
    />
  );
};

export default TodoTextInput;
