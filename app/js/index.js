const { ipcRenderer } = require('electron');


// const Tools = require('./constants');

const closeBtn = document.querySelector('.window-button.close');
const toggleBtn = document.querySelector('.window-button.toggle');
const minimizeBtn = document.querySelector('.window-button.minimize');

const toolButtons = document.querySelectorAll('.tool');

for (const toolBtn of toolButtons) {
    toolBtn.addEventListener('click', function () {
        toolBtn.classList.add('active');
        ipcRenderer.send('select-tool', toolBtn.getAttribute('data-tool'));
    });
}

closeBtn.addEventListener('click', function () {
    ipcRenderer.send('close-main-window');
});

minimizeBtn.addEventListener('click', function () {
    ipcRenderer.send('minimize-main-window');
});

toggleBtn.addEventListener('click', function () {
    ipcRenderer.send('toggle-main-window');
});

ipcRenderer.on('select-tool', function (event, data) {
    for (const toolBtn of toolButtons) {
        toolBtn.classList.remove('active');

        if (toolBtn.classList.contains(data)) {
            toolBtn.classList.add('active');
        }
    }
});

ipcRenderer.on('maximize-main-window', function () {
    toggleBtn.classList.add('maximized');
    document.body.classList.add('maximized');
});

ipcRenderer.on('unmaximize-main-window', function () {
    toggleBtn.classList.remove('maximized');
    document.body.classList.remove('maximized');
});