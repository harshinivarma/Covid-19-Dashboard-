//modules
const { dialog } = require("electron");
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

        autoUpdater.on("download-progress", (d) => {
          downloadProgress = d.percent;
          autoUpdater.logger.info(downloadProgress);
        });
      }
    );
  });
};
