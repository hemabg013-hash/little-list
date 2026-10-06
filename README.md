# Little List — To-do App

Little List is a simple, responsive to-do app that helps you keep track of small daily tasks. It runs in your web browser and saves tasks on your device using `localStorage`.

## Features

- Add a task from the input field.
- Mark tasks complete or active.
- Delete individual tasks.
- Clear all completed tasks.
- Keep tasks after refreshing the page (in the same browser on the same device).
- Use it on a phone, tablet, or desktop.

## How to run

No installation or server is required.

1. Download or clone this repository.
2. Open `index.html` in a modern web browser.
3. Add a task and try the check and delete buttons.

## Project files

- `index.html` — page structure and content.
- `styles.css` — colors, layout, and responsive design.
- `app.js` — task actions and browser storage.

## How it works

JavaScript keeps tasks in an array. Each change is saved as JSON in the browser's local storage, then the page redraws the task list. Tasks are local to your browser; this project does not use an account or a server.

## Built with

HTML, CSS, and vanilla JavaScript.

## License

This project is available under the MIT License. See `LICENSE`.
