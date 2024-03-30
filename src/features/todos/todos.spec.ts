import { describe, expect, it } from "vitest";
import reducer, {
  addTodo,
  clearCompleted,
  completeAllTodos,
  completeTodo,
  deleteTodo,
  editTodo,
} from "./slice";

describe("todos reducer", () => {
  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      value: [{ text: "Use Redux", completed: false, id: 0 }],
    });
  });

  it("should handle addTodo", () => {
    expect(
      reducer(
        { value: [] },
        addTodo({
          text: "Run the tests",
        }),
      ),
    ).toEqual({
      value: [
        {
          text: "Run the tests",
          completed: false,
          id: 0,
        },
      ],
    });

    expect(
      reducer(
        {
          value: [
            {
              text: "Use Redux",
              completed: false,
              id: 0,
            },
          ],
        },
        addTodo({
          text: "Run the tests",
        }),
      ),
    ).toEqual({
      value: [
        {
          text: "Use Redux",
          completed: false,
          id: 0,
        },
        {
          text: "Run the tests",
          completed: false,
          id: 1,
        },
      ],
    });

    expect(
      reducer(
        {
          value: [
            {
              text: "Use Redux",
              completed: false,
              id: 0,
            },
            {
              text: "Run the tests",
              completed: false,
              id: 1,
            },
          ],
        },
        addTodo({
          text: "Fix the tests",
        }),
      ),
    ).toEqual({
      value: [
        {
          text: "Use Redux",
          completed: false,
          id: 0,
        },
        {
          text: "Run the tests",
          completed: false,
          id: 1,
        },
        {
          text: "Fix the tests",
          completed: false,
          id: 2,
        },
      ],
    });
  });

  it("should handle deleteTodo", () => {
    expect(
      reducer(
        {
          value: [
            {
              text: "Use Redux",
              completed: false,
              id: 0,
            },
            {
              text: "Run the tests",
              completed: false,
              id: 1,
            },
          ],
        },
        deleteTodo({
          id: 1,
        }),
      ),
    ).toEqual({
      value: [
        {
          text: "Use Redux",
          completed: false,
          id: 0,
        },
      ],
    });
  });

  it("should handle editTodo", () => {
    expect(
      reducer(
        {
          value: [
            {
              text: "Run the tests",
              completed: false,
              id: 1,
            },
            {
              text: "Use Redux",
              completed: false,
              id: 0,
            },
          ],
        },
        editTodo({
          text: "Fix the tests",
          id: 1,
        }),
      ),
    ).toEqual({
      value: [
        {
          text: "Fix the tests",
          completed: false,
          id: 1,
        },
        {
          text: "Use Redux",
          completed: false,
          id: 0,
        },
      ],
    });
  });

  it("should handle completeTodo", () => {
    expect(
      reducer(
        {
          value: [
            {
              text: "Run the tests",
              completed: false,
              id: 1,
            },
            {
              text: "Use Redux",
              completed: false,
              id: 0,
            },
          ],
        },
        completeTodo({
          id: 1,
        }),
      ),
    ).toEqual({
      value: [
        {
          text: "Run the tests",
          completed: true,
          id: 1,
        },
        {
          text: "Use Redux",
          completed: false,
          id: 0,
        },
      ],
    });
  });

  it("should handle completeAllTodos", () => {
    expect(
      reducer(
        {
          value: [
            {
              text: "Run the tests",
              completed: true,
              id: 1,
            },
            {
              text: "Use Redux",
              completed: false,
              id: 0,
            },
          ],
        },
        completeAllTodos(),
      ),
    ).toEqual({
      value: [
        {
          text: "Run the tests",
          completed: true,
          id: 1,
        },
        {
          text: "Use Redux",
          completed: true,
          id: 0,
        },
      ],
    });

    // Unmark if all todos are currently completed
    expect(
      reducer(
        {
          value: [
            {
              text: "Run the tests",
              completed: true,
              id: 1,
            },
            {
              text: "Use Redux",
              completed: true,
              id: 0,
            },
          ],
        },
        completeAllTodos(),
      ),
    ).toEqual({
      value: [
        {
          text: "Run the tests",
          completed: false,
          id: 1,
        },
        {
          text: "Use Redux",
          completed: false,
          id: 0,
        },
      ],
    });
  });

  it("should handle clearCompleted", () => {
    expect(
      reducer(
        {
          value: [
            {
              text: "Run the tests",
              completed: true,
              id: 1,
            },
            {
              text: "Use Redux",
              completed: false,
              id: 0,
            },
          ],
        },
        clearCompleted(),
      ),
    ).toEqual({
      value: [
        {
          text: "Use Redux",
          completed: false,
          id: 0,
        },
      ],
    });
  });

  it("should not generate duplicate ids after clearCompleted", () => {
    expect(
      [
        completeTodo({
          id: 0,
        }),
        clearCompleted(),

        addTodo({
          text: "Write more tests",
        }),
      ].reduce(reducer, {
        value: [
          {
            id: 0,
            completed: false,
            text: "Use Redux",
          },
          {
            id: 1,
            completed: false,
            text: "Write tests",
          },
        ],
      }),
    ).toEqual({
      value: [
        {
          text: "Write tests",
          completed: false,
          id: 1,
        },
        {
          text: "Write more tests",
          completed: false,
          id: 2,
        },
      ],
    });
  });
});
