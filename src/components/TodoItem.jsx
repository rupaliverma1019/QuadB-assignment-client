import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../redux/todoSlice';
import '../style.css';
const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    description: todo.description,
    state: todo.state,
  });

  const handleDelete = () => {
    dispatch(deleteTodo(todo._id));
  };

  const handleUpdate = () => {
    dispatch(updateTodo({ id: todo._id, todo: updatedTodo }));
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTodo({
      ...updatedTodo,
      [name]: value,
    });
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={updatedTodo.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            value={updatedTodo.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="state"
            value={updatedTodo.state}
            onChange={handleChange}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <p>{todo.state}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
