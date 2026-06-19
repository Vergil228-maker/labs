import React, { useState, useEffect } from 'react';
import TodoHeader from './components/TodoHeader';
import TodoForm from './components/TodoForm';
import TodoSearch from './components/TodoSearch';
import TodoStats from './components/TodoStats';
import TodoList from './components/TodoList';
import './style.css'; // Переименуйте ваш CSS в style.css и положите в папку src

const App = () => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Загрузка из localStorage при монтировании
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Сохранение в localStorage при изменении todos
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Добавление задачи
  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  // Переключение статуса выполнения
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Удаление задачи
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Удаление всех задач
  const deleteAllTodos = () => {
    if (window.confirm('Вы уверены, что хотите удалить все задачи?')) {
      setTodos([]);
    }
  };

  // Фильтрация и сортировка задач
  const getFilteredAndSortedTodos = () => {
    let filtered = [...todos];
    
    // Фильтрация по поиску
    if (searchQuery) {
      filtered = filtered.filter(todo => 
        todo.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Сортировка по дате
    filtered.sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.localeCompare(b.dueDate);
    });
    
    return filtered;
  };

  const filteredTodos = getFilteredAndSortedTodos();

  return (
    <div className="todo">
      <TodoHeader />
      <TodoForm onAddTodo={addTodo} />
      <TodoSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <TodoStats totalCount={filteredTodos.length} />
      <button className="todo__delete-all-button" onClick={deleteAllTodos}>
        Удалить все
      </button>
      <TodoList 
        todos={filteredTodos}
        onToggleComplete={toggleComplete}
        onDeleteTodo={deleteTodo}
      />
    </div>
  );
};

export default App;