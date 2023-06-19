const userContainer = document.getElementById('listData');
const successMessage = document.getElementById('success');
const addBtn = document.getElementById('add');
const deleteBtn = document.getElementById('button2');
const taskIdInput = document.getElementById('input');
const getTodoById = async (userId) => {
  try {
    const response = await fetch(`https://dummyjson.com/todos/${userId}`);
    const todo = await response.json();
    return todo;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const displayTodo = async (userId) => {
  const todo = await getTodoById(userId);
  if (todo) {
    let li = document.createElement('li');
    let userName = document.createElement('input');
    let checkbox = document.createElement('input');
    let deleteBtn = document.createElement('button');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    userName.value = todo.todo;
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        userName.style.textDecoration = 'line-through';
      } else {
        userName.style.textDecoration = 'none';
      }
    });
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      deleteTodoById(userId);
      li.remove();
    });
    li.appendChild(checkbox);
    li.appendChild(userName);
    li.appendChild(deleteBtn);
    li.setAttribute('key', userId);
    li.setAttribute('class', 'task');
    userContainer.appendChild(li);
  } else {
    console.log(`Todo with user ID ${userId} not found.`);
  }
};
const deleteTodoById = async (userId) => {
  try {
    const response = await fetch(`https://dummyjson.com/todos/${userId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteTasks = () => {
  const tasks = document.getElementsByClassName('task');
  while (tasks.length > 0) {
    tasks[0].remove();
  }
};
addBtn.addEventListener('click', () => {
  const userId = parseInt(taskIdInput.value);
  if (!isNaN(userId)) {
    displayTodo(userId);
    success.textContent = 'Added Successfully';
  } else {
    success.textContent = 'Please enter a valid User ID.';
  }
});
deleteBtn.addEventListener('click', deleteTasks);























