"use client";

import { useState } from "react";
import { Plus, Trash2, Check, X } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() === "") return;
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">
          Woltbot Todos
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200"
            aria-label="Add todo"
          >
            <Plus size={24} />
          </button>
        </div>

        <ul className="space-y-3">
          {todos.length === 0 && (
            <li className="text-center text-gray-500 py-4">
              No tasks yet. Add one above!
            </li>
          )}
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between bg-gray-700/50 p-3 rounded-lg border border-gray-700 transition-all duration-200 ${
                todo.completed ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                    todo.completed
                      ? "bg-green-500 border-green-500"
                      : "border-gray-500 hover:border-blue-400"
                  }`}
                  aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
                >
                  {todo.completed && <Check size={14} className="text-white" />}
                </button>
                <span
                  className={`truncate ${
                    todo.completed ? "line-through text-gray-400" : "text-gray-100"
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-400 hover:text-red-400 transition-colors duration-200 p-1"
                aria-label="Delete todo"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
