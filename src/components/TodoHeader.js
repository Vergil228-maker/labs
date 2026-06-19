import React from 'react';

const TodoHeader = () => {
  const getCurrentDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('ru-RU', options);
  };

  return (
    <>
      <h1 className="todo__title">ToDo List</h1>
      <div className="todo__date">
        {getCurrentDate()}
      </div>
    </>
  );
};

export default TodoHeader;