const { app, BrowserWindow, Menu, Tray } = require("electron");

const shell = require("electron").shell;
const updater = require("./updater");

let secondaryWindow, win, tray;

// let trayMenu = Menu.buildFromTemplate([
//   {
//     label: "test",
//     click() {
//       shell.openExternal("faq.html");
//     },
//   },
//   { role: "quit" },
// ]);

// function createTray() {
//   tray = new Tray("tray.png");
//   tray.setToolTip("Covid-19 Dashboard");

//   tray.on("click", (e) => {
//     if (e.shiftKey) {
//       app.quit();
//     } else {
//       win.isVisible() ? win.hide() : win.show();
//     }
//   });

//   tray.setContextMenu(trayMenu);
// }

function createWindow() {
  // Create the browser window.
  // createTray();
  win = new BrowserWindow({
    width: 1200,
    height: 700,
    maxWidth: 1200,
    maxHeight: 700,
    minWidth: 1200,
    minHeight: 700,
    maximizable: false,
    // icon: "favicon.ico",
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  });
  secondaryWindow = new BrowserWindow({
    width: 600,
    height: 400,
    frame: false,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
    },
    parent: win,
    modal: true,
    show: false,
  });

  // and load the index.html of the app.
  win.loadFile("index.html");
  secondaryWindow.loadFile("popup.html");

  setTimeout(() => {
    secondaryWindow.show();
    setTimeout(() => {
      secondaryWindow.close();
      secondaryWindow = null;
    }, 15000);
  }, 2000);

  // Open the DevTools.
  //
  // win.webContents.openDevTools();

  var menu = Menu.buildFromTemplate([
    {
      label: "Menu",
      submenu: [
        {
          label: "Contact Page",
          click() {
            shell.openExternal("");
          },
        },
        {
          label: "Faq page",
          click() {
            shell.openItem("faq.html");
          },
        },
        { type: "separator" },
        {
          label: "Exit",
          click() {
            app.quit();
          },
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  //creatw windows
  createWindow();

  setTimeout(updater.check, 2000);
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  app.quit();
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q

  // if (process.platform !== "darwin") {
  // }
});
// app.on('closed', () => {
//   secondaryWindow = null
// })

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
