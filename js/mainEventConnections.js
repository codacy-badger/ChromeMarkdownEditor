window.onload = function () {
    var testSettings = new Setting(true, false);
    //testSettings.saveSetting("ModeSet", undefined);
    var settingContainer = new settingsContainer();

    
    if (settingContainer.modeSet() == false)
    {
        console.log( "Mode is not set!");
        settingContainer.setOnline(true);
        //if (confirm("Do you want to store your settings online?")) {
          //
        //}else
        //{
          //settingContainer.setOnline(false);
        //}
        settingContainer.save();
    }


}
