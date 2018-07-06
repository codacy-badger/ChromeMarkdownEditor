window.onload = function () {
	document.getElementById('Test').addEventListener('click', TestSaveSync);
}

function TestSaveSync()
{
	var set = new Setting(false, true);
	console.log("Test save sync!");
	set.saveSetting("Test", "TestSave")
	set.saveSetting("Test2", "TestSave2")


	set.loadSetting("Test", function(value)
	{
		var textbox = document.getElementById('TextBox');
		console.log("Loaded value: " + value);
		var textNode = document.createTextNode(value);
		textbox.appendChild(textNode);
	});

	set.loadSetting("Test2", function(value)
	{
		console.log("Loaded value 2: " + value);
	});


	console.log("Test save sync end!");
}

/**
 * This class is uses to load and save the settings either via sync or offline only
 */
class Setting
{
	/**
	 * Constructor of the class
	 * @param {bool} debug      Should show debug string in console
	 * @param {bool} onlineMode The data should be saved online or offline. Online will save it on both stores!
	 */
	constructor(debug, onlineMode)
	{
		this._debug = debug;
		this._onlineMode = onlineMode;
	}

	/**
	 * Save a single setting key value pair
	 * @param  {string} key   The key to save the value in
	 * @param  {mixed} value The value to save
	 * @return {mixed}       Returns the save value
	 */
	saveSetting(key, value)
	{
		if (navigator.onLine && this._onlineMode)
		{
			var sync;
			this.loadLocal("Synced", function(synced)
			{
				sync = synced;
			});

			if (!sync)
			{
				this.syncAll();
			}

			this.saveOnline(key, key);
			this.saveLocal("key", key);
			this.saveLocal("Synced", true);
		}
		else
		{
			this.saveLocal(key, value);
			this.saveLocal("Synced", false);
		}
	}

	/**
	 * Save the key value pair online
	 * @param  {string} key   The key to save the value in
	 * @param  {mixed} value The value to save
	 * @return {mixed}       Returns the save value
	 */
	saveOnline(key, value)
	{
		var debug = this._debug
		var data = {};
		data[key] = value;
		chrome.storage.sync.set(data, function() {
			if (debug)
			{
				console.log('Value '+key+' is set globally to ' + value);
			}
		});
	}

	/**
	 * Save the key value pair offline
	 * @param  {string} key   The key to save the value in
	 * @param  {mixed} value The value to save
	 * @return {mixed}       Returns the save value
	 */
	saveLocal(key, value)
	{
		var debug = this._debug
		var data = {};
		data[key] = value;
		chrome.storage.local.set(data, function() {
			if (debug)
			{
				console.log('Value '+key+' is set locally to ' + value);
			}
		});
	}

	/**
	 * load a single setting key value pair based on key
	 * @param  {string} key   The key for the value to load
	 * @param  {function} callbackFN The function need's one parameter for the value of the setting.
	 */
	loadSetting(key, callbackFN)
	{
		if (this._debug)
		{
			console.log("Loading value for " + key);
		}
		if (navigator.onLine && this._onlineMode)
		{
			var sync;
			this.loadLocal("Synced", function(synced)
			{
				sync = synced;
			});

			if (!sync)
			{
				this.syncAll();
			}

			this.loadOnline(key, callbackFN);
		}
		else
		{
			this.loadLocal(key, callbackFN);
		}
	}

	/**
	 * load a single setting key value pair based on key from online storage
	 * @param  {string} key   The key for the value to load
	 * @param  {function} callbackFN The function need's one parameter for the value of the setting.
	 */
	loadOnline(key, callbackFN)
	{
		var debug = this._debug
		chrome.storage.sync.get(key, function(result) {
			if (debug)
			{
				console.log(result);
				console.log('Value '+key+' currently is ' + result[key]);
			}
			callbackFN(result[key]);
		});
	}

	/**
	 * load a single setting key value pair based on key from offline storage
	 * @param  {string} key   The key for the value to load
	 * @param  {function} callbackFN The function need's one parameter for the value of the setting.
	 */
	loadLocal(key, callbackFN)
	{
		var debug = this._debug
		chrome.storage.local.get(key, function(result) {
			if (debug)
			{
				console.log(result);
				console.log('Value '+key+' currently is ' + result[key]);
			}
			callbackFN(result[key]);
		});
	}

	/**
	 * Will sync the offline storage with the online storage
	 * @return {[type]} [description]
	 */
	syncAll()
	{
		if (this._debug)
		{
			console.log('Sync all');
		}

	}

}
