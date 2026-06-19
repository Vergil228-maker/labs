const newTask = document.getElementById('new-task');
const taskDate = document.getElementById('task-due-date');
const taskCategory = document.getElementById('task-category');
const todoList = document.querySelector('[data-js-todo-list]');
const submitBtn = document.querySelector('.button');
const totalTasksSpan = document.querySelector('.todo__total-tasks span');
const deleteAllBtn = document.querySelector('.todo__delete-all-button');
const searchInput = document.getElementById('search-task');
let todos = [];
let searchQuery = '';



function renderTodoList() {
    todoList.innerHTML = '';

    let filteredTodos = todos;

    if (searchQuery !== '') {
        filteredTodos = todos.filter(task => {
            return task.text.toLowerCase().includes(searchQuery);
        });
    }
        filteredTodos = [...filteredTodos].sort((a, b) => {

        if (!a.dueDate) return 1;
        if (!b.dueDate) return - 1;
        return a.dueDate.localeCompare(b.dueDate);
    });
    
    for (let i = 0; i < filteredTodos.length;i++) {
        const task = filteredTodos[i];
        const li = document.createElement('li');
        
        if (task.completed) {
            li.classList.add('completed');
        }

        if (!task.completed && task.dueDate && isOverdue(task.dueDate)) {
            li.classList.add('overdue');
        }

        const contentDiv = document.createElement('div');
        contentDiv.className = 'task-content';

        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.textContent = task.text;

        const descriptionSpan = document.createElement('div');
        descriptionSpan.className = 'task-description';
        descriptionSpan.textContent = task.description || '';

        const categorySpan = document.createElement('span');
        categorySpan.className = 'task-category';

        let categoryText = '';
        switch (task.category) {
            case 'work' : categoryText = 'Работа';
            break;
            case 'personal': categoryText = 'Личное';
            break;
            default: categoryText = 'Общее';
        }
        categorySpan.textContent = categoryText;

        const dateSpan = document.createElement('span');
        dateSpan.className = 'task-date';
        dateSpan.textContent = task.dueDate ? formatDate(task.dueDate) : '';

        contentDiv.appendChild(textSpan);
        contentDiv.appendChild(descriptionSpan)
        contentDiv.appendChild(categorySpan);
        contentDiv.appendChild(dateSpan);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'task-actions';
        
        const completeBtn = document.createElement('button');
        completeBtn.textContent = '✓';
        completeBtn.className = 'complete-btn';
        completeBtn.addEventListener('click', () => {
            const taskId = task.id;
            const foundTask = todos.find(t => t.id === taskId);
            
            if (foundTask) {
                foundTask.completed = !foundTask.completed;
            }
            
            renderTodoList();
            saveToLocalStorage();
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✗';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            const taskId = task.id;
            todos = todos.filter(task => task.id !== taskId);
            
            renderTodoList();
            saveToLocalStorage();
        });

        actionsDiv.appendChild(completeBtn);
        actionsDiv.appendChild(deleteBtn);
        
        li.appendChild(contentDiv);
        li.appendChild(actionsDiv);
        todoList.appendChild(li);
    }
    
    totalTasksSpan.textContent = filteredTodos.length;
}

function formatDate(dateString) {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 
                    'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    return `${day} ${months[parseInt(month) - 1]} ${year}`; 
}

function saveToLocalStorage() {
    const todosJSON = JSON.stringify(todos);
    localStorage.setItem('todos', todosJSON);
}

function loadFromLocalStorage() {
    const savedTodos = localStorage.getItem('todos');
    
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    } else {
        todos = [];
    }
    console.log(savedTodos)
    renderTodoList();
}
function isOverdue(dueDate) {

    if (dueDate === '' || dueDate === null) return false;
        const today = new Date().toISOString().split('T')[0];
        return dueDate < today;
}
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const text = newTask.value.trim();
    if (text === '') return;
    
    const description = document.getElementById('task-description').value.trim();
    const dueDate = taskDate.value;
    const category = taskCategory.value;

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        dueDate: dueDate,
        category: category,
        description: description
    };
    
    todos.push(newTodo);
    newTask.value = '';
    taskDate.value = '';

    document.getElementById('task-description').value = '';

    renderTodoList();
    saveToLocalStorage();
});

searchInput.addEventListener('input', (event) => {
    searchQuery = event.target.value.toLowerCase();
    renderTodoList();
})

deleteAllBtn.addEventListener('click', () => {
    const userConfirmed = confirm('Вы уверены, что хотите удалить все задачи?');
    
    if (userConfirmed) {
        todos = [];
        renderTodoList();
        saveToLocalStorage();
    }
})

loadFromLocalStorage();