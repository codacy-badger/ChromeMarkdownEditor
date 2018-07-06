window.onload = function () {
    var testSettings = new Setting(true, false);
    //testSettings.saveSetting("ModeSet", false);

    testSettings.loadSetting("ModeSet", function(value){
      if (value === undefined || value === false)
      {
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
