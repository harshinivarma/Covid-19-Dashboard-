//modules
const { dialog, BrowserWindow, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";

//check updater
autoUpdater.autoDownload = false;
exports.check = () => {
  // start update check

  autoUpdater.checkForUpdates();

  //listen updatres

  autoUpdater.on("update-available", () => {
    //prompt user to update

    let downloadProgress = 0;
    dialog.showMessageBox(
      {
        type: "info",
        title: "Update Available",
        message:
          "A new version of covid-19 is available. Do you want to update now?",
        buttons: ["Update", "No"],
      },
      (buttonIndex) => {
        //if not update
        if (buttonIndex !== 0) return;

        //else

        autoUpdater.doDownloadUpdate();

        //download progress
        let progressWin = new BrowserWindow({
          width: 350,
          height: 35,
          useContentSize: true,
          autoHideMenuBar: true,
          maximizable: false,
          fullscreen: false,
          fullscreenable: false,
          resizable: false,
        });

        //load pogress
        progressWin.loadURL("file://${__dirname}/assets/progress.html");

        // handle

        progressWin.on("closed", () => {
          progressWin = null;
        });

        //listten for progress procewad

        ipcMain.on("download-progress-request", (e) => {
          e.returnValue = downloadProgress;
        });

        autoUpdater.on("download-progress", (d) => {
          downloadProgress = d.percent;
          autoUpdater.logger.info(downloadProgress);
        });

        // listen downlod
        autoUpdater.on("update-download", () => {
          //close progress window
          if (progressWin) progressWin.close();

          //prompt to quite
          dialog.showMessageBox(
            {
              type: "info",
              message:
                "A new version of Covid-19 is ready. Quit and install now?",
              buttons: ["Yes", "Later"],
            },
            (buttonIndex) => {
              //update if yes
              if (buttonIndex === 0) autoUpdater.quitAndInstall();
            }
          );
        });
      }
    );
  });
};
