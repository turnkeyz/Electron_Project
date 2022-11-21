const { app, BrowserWindow, ipcMain, nativeTheme, Menu, MenuItem, Tray } = require('electron')
const { join } = require('path')
const fs = require('fs')
const https = require('https')
const iconName = join(__dirname, 'iconForDragAndDrop.png');
const icon = fs.createWriteStream(iconName);

function createWindow () {
  const window = new BrowserWindow({
    width: 1200,
    height: 900,
    autoHideMenuBar: true,
    resizable: false,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  })
  window.loadFile(join(__dirname,'public/index.html'))

}

// Create a new file to copy - you can also copy existing files.
fs.writeFileSync(join(__dirname, 'drag-and-drop-1.md'), '# First file to test drag and drop')
fs.writeFileSync(join(__dirname, 'drag-and-drop-2.md'), '# Second file to test drag and drop')

https.get('https://img.icons8.com/ios/452/drag-and-drop.png', (response) => {
  response.pipe(icon);
});

app.whenReady().then(() => {
  createWindow()

  //tray settings 
  tray = new Tray('Letter_K_Glitch.png')
  const template = [
    {label: 'item 1', type: 'checkbox'},
    {label: 'item 2', type: 'radio', checked:true},
    {label: 'item 3'},
    {label: 'item 4'},
  ]
  const contextMenu = Menu.buildFromTemplate(template)
  tray.setToolTip(`Keyz's app`)
  tray.setContextMenu(contextMenu)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// /*ipcMain.handle('dark-mode:toggle', () => {
//     if (nativeTheme.shouldUseDarkColors) {
//       nativeTheme.themeSource = 'light'
//     } else {
//       nativeTheme.themeSource = 'dark'
//     }
//     return nativeTheme.shouldUseDarkColors
//   })

//   ipcMain.handle('dark-mode:system', () => {
//     nativeTheme.themeSource = 'system'
//   })*/

/*
const {app, BrowserWidow, Tray, BrowserWindow} = require('electron')
const { join } = require('path')
function createWindow() {
  const window = new BrowserWindow({
    width: 900,
    height: 600,
  })
  window.loadFile(join(__dirname,'public/index.html'))
  tray = new Tray('Letter_K_Glitch.png')
}

app.whenReady().then(createWindow)*/
