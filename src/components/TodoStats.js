import React from 'react';

const TodoStats = ({ totalCount }) => {
  return (
    <div className="todo__total-tasks">
      Задач: <span>{totalCount}</span>
    </div>
  );
};

export default TodoStats;