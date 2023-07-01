import React from 'react';

import './TodoList.css';

interface TodoListProps {
  items: { id: string; text: string }[];
  onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <ul>
      {props.items.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <button onClick={props.onDelete.bind(null, todo.id)}>DELETE</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
