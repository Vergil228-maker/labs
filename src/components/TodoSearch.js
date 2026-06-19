import React from 'react';

const TodoSearch = ({ searchQuery, onSearchChange }) => {
  return (
    <form className="todo__form">
      <div className="field">
        <label htmlFor="search-task" className="field__label">Поиск задач</label>
        <input
          type="search"
          id="search-task"
          className="field__input"
          autoComplete="off"
          placeholder="Введите текст для поиска"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </form>
  );
};

export default TodoSearch;