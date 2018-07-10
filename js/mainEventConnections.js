function setupOptionStorage() {
  var testSettings = new Setting(true, false);
  //testSettings.saveSetting("ModeSet", false);

  testSettings.loadSetting("ModeSet", function(value) {
    if (value === undefined || value === false) {
      BootstrapDialog.show({
        title: 'Sync data via google sync',
        message: 'Do you want to sync yout settings over your Chrome browsers?',
        buttons: [{
          label: 'Yes',
          action: function(dialog) {
            testSettings.saveSetting("ModeSet", true);
            testSettings.saveSetting("OnlineMode", true);

            testSettings = new Setting(true, true);
            dialog.close();
          }
        }, {
          label: 'No',
          action: function(dialog) {
            testSettings.saveSetting("ModeSet", true);
            testSettings.saveSetting("OnlineMode", false);
            dialog.close();
          }
        }]
      });
    }
  });
}

function setupButtonConnections() {
  $("#settings").click(openSettingsWindow);
}

function openSettingsWindow() {
  console.log("hey?");
  BootstrapDialog.show({
    title: "Sync data via google sync",
    size: BootstrapDialog.SIZE_WIDE,
    message: $("<div></div>").load("../forms/settings.html"),
    buttons: [{
        label: 'Save',
        cssClass: 'btn-success',
        action: function(dialog) {
          console.log("Test");
          dialog.close();
        }
      },
      {
        label: 'Close',
        cssClass: 'btn-danger',
        action: function(dialog) {
          dialog.close();
        }
      }
    ]
  });
}

window.onload = function() {
  setupButtonConnections();
  setupOptionStorage();
}
