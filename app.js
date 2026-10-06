const STORAGE_KEY = "little-list-tasks-v1";
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const count = document.querySelector("#task-count");

let tasks = loadTasks();

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved.filter(task => task && typeof task.id === "string" && typeof task.text === "string") : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function render() {
  list.replaceChildren();
  for (const task of tasks) {
    const item = document.createElement("li");
    item.className = `task-item${task.done ? " done" : ""}`;

    const toggle = document.createElement("button");
    toggle.className = "check";
    toggle.type = "button";
    toggle.setAttribute("aria-label", task.done ? `Mark ${task.text} as not done` : `Mark ${task.text} as done`);
    toggle.setAttribute("aria-pressed", String(task.done));
    toggle.textContent = task.done ? "✓" : "";
    toggle.addEventListener("click", () => {
      task.done = !task.done;
      saveTasks();
      render();
    });

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const remove = document.createElement("button");
    remove.className = "delete";
    remove.type = "button";
    remove.setAttribute("aria-label", `Delete ${task.text}`);
    remove.textContent = "×";
    remove.addEventListener("click", () => {
      tasks = tasks.filter(item => item.id !== task.id);
      saveTasks();
      render();
    });

    item.append(toggle, text, remove);
    list.append(item);
  }

  const remaining = tasks.filter(task => !task.done).length;
  count.textContent = `${remaining} ${remaining === 1 ? "task" : "tasks"} left`;
  emptyState.hidden = tasks.length > 0;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.unshift({ id: crypto.randomUUID(), text, done: false });
  saveTasks();
  render();
  form.reset();
  input.focus();
});

document.querySelector("#clear-done").addEventListener("click", () => {
  tasks = tasks.filter(task => !task.done);
  saveTasks();
  render();
});

document.querySelector("#today").textContent = new Intl.DateTimeFormat(undefined, {
  weekday: "short", month: "short", day: "numeric"
}).format(new Date());

render();
