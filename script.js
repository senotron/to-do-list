document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('add-task-btn').addEventListener('click', function() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    addTask(taskText);
    taskInput.value = '';
});

function addTask(taskText, completed = false) {
    const taskList = document.getElementById('task-list');

    const li = document.createElement('li');
    li.textContent = taskText;

    if (completed) {
        li.classList.add('completed');
    }

    const actions = document.createElement('div');
    actions.classList.add('task-actions');

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.addEventListener('click', function() {
        li.classList.toggle('completed');
        saveTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', function() {
        taskList.removeChild(li);
        saveTasks();
    });

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(actions);

    taskList.appendChild(li);

    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        tasks.push({
            text: li.textContent.replace('CompleteDelete', ''),
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
}
