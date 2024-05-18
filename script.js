document.addEventListener('DOMContentLoaded', (event) => 
    {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const clearAllButton = document.getElementById('clearAllButton');

    // saving all I am doing
    loadTasks();

    // Adding task event
    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function (e) 
    {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Clear all tasks 
    clearAllButton.addEventListener('click', clearAllTasks);

    function addTask() 
    {
        const taskText = taskInput.value.trim();
        if (taskText === '') 
        {
            alert('Please enter a task');
            return;
        }

        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);
        taskInput.value = '';

        saveTasks();
    }

    function createTaskItem(taskText) {
        const li = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        li.appendChild(taskSpan);

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });
        li.appendChild(completeButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });
        li.appendChild(deleteButton);

        return li;
    }

    function clearAllTasks() {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.childNodes.forEach(item => {
            tasks.push({
                text: item.firstChild.textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = createTaskItem(task.text);
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskList.appendChild(taskItem);
        });
    }
});
