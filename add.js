const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow

const closeBtn = document.getElementById('closebtn')

closeBtn.addEventListener('click', e => {
    const window = remote.getCurrentWindow();
    window.close()
})