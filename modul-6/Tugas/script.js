// State Management
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const priorityInput = document.getElementById('priority-input');
const list = document.getElementById('todo-list');
const counter = document.getElementById('counter');
const validationMsg = document.getElementById('validation-msg');

// 1. Initial Render
const render = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
    
    const filteredTodos = todos.filter(t => {
        if (currentFilter === 'active') return !t.completed;
        if (currentFilter === 'completed') return t.completed;
        return true;
    });

    list.innerHTML = '';
    filteredTodos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm prio-${todo.priority}`;
        li.draggable = true;
        li.dataset.index = index;

        li.innerHTML = `
            <div class="flex items-center gap-3 flex-1">
                <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                    onchange="toggleComplete(${todo.id})" class="w-5 h-5 accent-purple-600">
                <span class="todo-text flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}" 
                    ondblclick="startEdit(event, ${todo.id})">${todo.text}</span>
                <span class="text-xs uppercase font-bold text-gray-400">${todo.priority}</span>
            </div>
            <button onclick="deleteTodo(${todo.id})" class="ml-4 text-red-400 hover:text-red-600 transition">Hapus</button>
        `;

        // Drag events
        li.addEventListener('dragstart', () => li.classList.add('dragging'));
        li.addEventListener('dragend', () => li.classList.remove('dragging'));
        
        list.appendChild(li);
    });

    updateUI();
};

// 2. Logic Functions
const updateUI = () => {
    const left = todos.filter(t => !t.completed).length;
    counter.innerText = `${left} tugas tersisa`;
};

form.onsubmit = (e) => {
    e.preventDefault();
    const val = input.value.trim();
    
    if (val.length < 3 || val.length > 100) {
        validationMsg.classList.remove('hidden');
        return;
    }

    validationMsg.classList.add('hidden');
    todos.push({
        id: Date.now(),
        text: val,
        completed: false,
        priority: priorityInput.value
    });
    
    input.value = '';
    render();
};

window.toggleComplete = (id) => {
    todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    render();
};

window.deleteTodo = (id) => {
    todos = todos.filter(t => t.id !== id);
    render();
};

document.getElementById('clear-completed').onclick = () => {
    todos = todos.filter(t => !t.completed);
    render();
};

// 3. Edit Feature (Double Click)
window.startEdit = (event, id) => {
    const span = event.target;
    const originalText = span.innerText;
    const inputEdit = document.createElement('input');
    
    inputEdit.value = originalText;
    inputEdit.className = 'edit-input';
    
    const saveEdit = () => {
        const newText = inputEdit.value.trim();
        if (newText.length >= 3 && newText.length <= 100) {
            todos = todos.map(t => t.id === id ? { ...t, text: newText } : t);
        }
        render();
    };

    inputEdit.onblur = saveEdit;
    inputEdit.onkeydown = (e) => { if (e.key === 'Enter') saveEdit(); };

    span.replaceWith(inputEdit);
    inputEdit.focus();
};

// 4. Filter Logic
document.getElementById('filter-buttons').onclick = (e) => {
    if (!e.target.dataset.filter) return;
    
    currentFilter = e.target.dataset.filter;
    
    // UI Visual Toggle
    document.querySelectorAll('#filter-buttons button').forEach(btn => {
        btn.classList.remove('bg-white', 'shadow-sm', 'font-bold');
        btn.classList.add('hover:bg-gray-300');
    });
    e.target.classList.add('bg-white', 'shadow-sm', 'font-bold');
    e.target.classList.remove('hover:bg-gray-300');
    
    render();
};

// 5. Drag & Drop Reordering
list.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector('.dragging');
    const siblings = [...list.querySelectorAll('.todo-item:not(.dragging)')];
    
    const nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });
    
    list.insertBefore(draggingItem, nextSibling);
});

list.addEventListener('drop', () => {
    // Re-index todos array based on new DOM order
    const newOrder = [...list.querySelectorAll('.todo-item')].map(li => {
        const id = todos.find(t => t.text === li.querySelector('.todo-text').innerText).id;
        return todos.find(t => t.id === id);
    });
    todos = newOrder;
    localStorage.setItem('todos', JSON.stringify(todos));
});

// Run on start
render();