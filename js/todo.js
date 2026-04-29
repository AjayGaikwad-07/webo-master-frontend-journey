document.addEventListener('DOMContentLoaded', function() {
  const todoInput = document.getElementById('todo-input');
  const addBtn = document.getElementById('add-btn');
  const todoList = document.getElementById('todo-list');
  const taskCount = document.getElementById('task-count');
  const clearAllBtn = document.getElementById('clear-all');

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  renderTasks();

  // Add new task
  addBtn.addEventListener('click', addTask);
  todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
  });

  function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText) {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
      };
      
      // Add animation
      const taskItem = createTaskElement(newTask);
      taskItem.style.opacity = '0';
      taskItem.style.transform = 'translateY(20px)';
      todoList.prepend(taskItem);
      
      setTimeout(() => {
        taskItem.style.opacity = '1';
        taskItem.style.transform = 'translateY(0)';
      }, 10);
      
      tasks.unshift(newTask);
      saveTasks();
      updateTaskCount();
      todoInput.value = '';
      todoInput.focus();
    }
  }

  function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = task.id;
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', toggleTask);
    
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = task.text;
    if (task.completed) li.classList.add('completed');
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener('click', deleteTask);
    
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    return li;
  }

  function renderTasks() {
    todoList.innerHTML = '';
    tasks.forEach(task => {
      const li = createTaskElement(task);
      todoList.appendChild(li);
    });
    updateTaskCount();
  }

  function toggleTask(e) {
    const taskId = parseInt(e.target.parentElement.dataset.id);
    const task = tasks.find(task => task.id === taskId);
    if (task) {
      task.completed = e.target.checked;
      saveTasks();
      e.target.parentElement.classList.toggle('completed', task.completed);
      updateTaskCount();
    }
  }

  function deleteTask(e) {
    const taskId = parseInt(e.target.parentElement.dataset.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
      // Add removal animation
      const taskElement = e.target.parentElement;
      taskElement.style.transform = 'translateX(-100%)';
      taskElement.style.opacity = '0';
      
      setTimeout(() => {
        tasks.splice(taskIndex, 1);
        saveTasks();
        renderTasks();
      }, 300);
    }
  }

  clearAllBtn.addEventListener('click', function() {
    if (tasks.length > 0 && confirm('Are you sure you want to delete all tasks?')) {
      // Add clear all animation
      const items = todoList.querySelectorAll('.todo-item');
      items.forEach((item, index) => {
        setTimeout(() => {
          item.style.transform = 'translateX(-100%)';
          item.style.opacity = '0';
        }, index * 100);
      });
      
      setTimeout(() => {
        tasks = [];
        saveTasks();
        renderTasks();
      }, tasks.length * 100);
    }
  });

  function updateTaskCount() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    taskCount.textContent = `${completedTasks} of ${totalTasks} tasks`;
    
    // Update progress bar
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    document.documentElement.style.setProperty('--progress', `${progress}%`);
    
    // Animation for task count update
    taskCount.style.transform = 'scale(1.1)';
    setTimeout(() => {
      taskCount.style.transform = 'scale(1)';
    }, 200);
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});