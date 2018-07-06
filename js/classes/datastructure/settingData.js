class settingsContainer
{
    /**
     * @param {function} readyFunction Loading is done
     */
    constructor()
    {
        this._onlineMode = false;
        this._modeSet = false;

        this._baseSettingsManager = new Setting(true, false);

        this.load();
    }

    /**
     * Save the settings
     * @param  {bool} online Save this online
     */
    save()
    {
        var mainSettingsManager = new Setting(true, this._onlineMode);

        this._baseSettingsManager.saveSetting("OnlineMode", this._onlineMode);
    }

    load()
    {
        var modeset = false;
        this._baseSettingsManager.loadSetting("ModeSet", function(value){
          if (value !== undefined)
          {
            modeset = true;
          }
        })
        this._modeSet = modeset;

        if (this._modeSet === true)
        {
          var settingScope = this._baseSettingsManager.loadSetting("OnlineMode", function(value){
            this._onlineMode = value;
          })
        }

    }

    /**
     * Check if there is a mode set
     * @return {bool} Mode is set
     */
    modeSet()
    {
      return this._modeSet;
    }

    /**
     * Return of container is online;
     * @return {Boolean} Is this container online?
     */
    isOnline()
    {
        return this._onlineMode;
    }

    /**
     * Set the mode
     * @param {bool} online Set this to online or offline
     */
    setOnline(online)
    {
      this._onlineMode = online;
      this._baseSettingsManager.saveSetting("ModeSet", true);
    }
}
