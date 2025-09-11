const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
const deleted = JSON.parse(localStorage.getItem('deleted') || '[]');

const taskListEl = document.getElementById('tasks');
const taskCountEl = document.getElementById('task-count');
const deletedCountEl = document.getElementById('deleted-count');

function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('deleted', JSON.stringify(deleted));
}

function renderTasks() {
  taskListEl.innerHTML = '';
  tasks.forEach((task, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'task';

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.addEventListener('change', () => deleteTask(index));

    const span = document.createElement('span');
    span.textContent = task.title;

    wrapper.appendChild(cb);
    wrapper.appendChild(span);
    taskListEl.appendChild(wrapper);
  });

  taskCountEl.textContent = tasks.length;
  deletedCountEl.textContent = deleted.length;
}

function addTask(title) {
  tasks.push({ title });
  save();
  renderTasks();
}

function deleteTask(index) {
  const [removed] = tasks.splice(index, 1);
  deleted.push(removed);
  save();
  renderTasks();
}

document.getElementById('add-btn').addEventListener('click', () => {
  const title = prompt('Enter a task');
  if (title) {
    addTask(title.trim());
  }
});

renderTasks();
