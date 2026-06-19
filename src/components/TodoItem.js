import React from 'react';

const TodoItem = ({ todo, onToggleComplete, onDeleteTodo }) => {
  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date().toISOString().split('T')[0];
    return dueDate < today;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 
                    'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    return `${day} ${months[parseInt(month) - 1]} ${year}`;
  };

  const getCategoryText = (category) => {
    switch (category) {
      case 'work': return 'Работа';
      case 'personal': return 'Личное';
      default: return 'Общее';
    }
  };

  let itemClassName = '';
  if (todo.completed) {
    itemClassName = 'completed';
  } else if (isOverdue(todo.dueDate)) {
    itemClassName = 'overdue';
  }

  return (
    <li className={itemClassName}>
      <div className="task-content">
        <span className="task-text">{todo.text}</span>
        {todo.description && (
          <div className="task-description">{todo.description}</div>
        )}
        <span className="task-category">{getCategoryText(todo.category)}</span>
        {todo.dueDate && (
          <span className="task-date">{formatDate(todo.dueDate)}</span>
        )}
      </div>
      <div className="task-actions">
        <button 
          className="complete-btn" 
          onClick={() => onToggleComplete(todo.id)}
        >
          ✓
        </button>
        <button 
          className="delete-btn" 
          onClick={() => onDeleteTodo(todo.id)}
        >
          ✗
        </button>
      </div>
    </li>
  );
};

export default TodoItem;