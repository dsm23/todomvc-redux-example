import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import TodoTextInput from ".";

const meta = {
  title: "Components/TodoTextInput",
  component: TodoTextInput,
  parameters: {
    layout: "centered",
  },
  args: {
    editing: false,
    newTodo: false,
    text: "",
    onSave: fn(),
  },
  argTypes: {
    editing: {
      control: { type: "boolean" },
      description: "Whether the input is in editing mode",
    },
    newTodo: {
      control: { type: "boolean" },
      description: "Whether the input is for a new todo",
    },
    text: {
      control: { type: "text" },
      description: "The text value of the new todo",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TodoTextInput>;

type Story = StoryObj<typeof TodoTextInput>;

export const Default: Story = {
  render: (args) => <TodoTextInput {...args} />,
};

export default meta;
