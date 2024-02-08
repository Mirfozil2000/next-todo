"use client";
import React, { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
interface Props {}

export default function TodoApp({}: Props) {
  const [animationParent] = useAutoAnimate();
  const [todos, setTodos] = useState([
    { id: 1, text: "Todo 1" },
    { id: 2, text: "Todo 2" },
    { id: 3, text: "Todo 3" },
  ]);
  const [inputText, setInputText] = useState("");
  const [editeMode, setEditMode] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");

  const addTodo = () => {
    if (inputText.trim() !== "") {
      const isExistingTodo = todos.some((todo) => todo.text === inputText);
      if (isExistingTodo) {
        alert("This todo already exists!");
        setInputText("");
        return;
      }
      const newTodo = {
        id: todos.length + 1,
        text: inputText,
      };
      setTodos([...todos, newTodo]);
      setInputText("");
    }
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (id: number) => {
    setEditMode(id);
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditedText(todoToEdit.text);
    }
  };

  const saveEditedTodo = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editeMode ? { ...todo, text: editedText } : todo
    );
    setTodos(updatedTodos);
    setEditMode(null);
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Todo App</h2>
      <div className="flex mb-4">
        <input
          onChange={(e) => setInputText(e.target.value)}
          type="text"
          value={inputText}
          placeholder="Add todo..."
          className="border-gray-300 border rounded-l px-4 py-2"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
        >
          Add
        </button>
      </div>
      <ul ref={animationParent}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between border-b py-2"
          >
            {editeMode === todo.id ? (
              <>
                <input
                  onChange={(e) => setEditedText(e.target.value)}
                  value={editedText}
                  type="text"
                  className="border-gray-300 border rounded-l px-4 py-2"
                />
                <button
                  onClick={saveEditedTodo}
                  className="bg-green-500 text-white px-4 py-2 rounded-r"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <div>
                  <button
                    onClick={() => editTodo(todo.id)}
                    className="text-yellow-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 mr-2"
                  >
                    {" "}
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
