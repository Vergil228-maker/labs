import React, { useState } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('general');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      description: description.trim(),
      dueDate: dueDate,
      category: category,
      completed: false
    };

    onAddTodo(newTodo);
    
    setText('');
    setDescription('');
    setDueDate('');
    setCategory('general');
  };

  return (
    <form className="todo__form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="new-task" className="field__label">Новая задача</label>
        <input
          type="text"
          id="new-task"
          className="field__input"
          placeholder="Введите текст задачи..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="task-description" className="field__label">Описание (необязательно)</label>
        <textarea
          id="task-description"
          className="field__input"
          rows="2"
          placeholder="Подробности задачи"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="task-due-date" className="field__label">Срок выполнения</label>
        <input
          type="date"
          id="task-due-date"
          className="field__input due-date-input"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="task-category" className="field__label">Категория</label>
        <select
          id="task-category"
          className="field__input category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="general">Общее</option>
          <option value="work">Работа</option>
          <option value="personal">Личное</option>
        </select>
      </div>

      <button className="button" type="submit">Добавить задачу</button>
    </form>
  );
};

export default TodoForm;