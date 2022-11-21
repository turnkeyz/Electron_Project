const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
}, 'electron', {
    startDrag: (fileName) => {
        ipcRenderer.send('ondragstart', path.join(process.cwd(), fileName))
      }
})
/*
contextBridge.exposeInMainWorld('electron', {
    startDrag: (fileName) => {
      ipcRenderer.send('ondragstart', path.join(process.cwd(), fileName))
    }
})*/