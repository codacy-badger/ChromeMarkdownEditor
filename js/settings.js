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

class Setting 
{
	constructor(debug, onlineMode)
	{
		this._debug = debug;
		this._onlineMode = onlineMode;
	}
	
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

			this.saveOnline(key, value);
			this.saveLocal("Synced", true);
		}
		else
		{
			this.saveLocal(key, value);
			//this.saveLocal("Synced", false);
		}
	}
	
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

	syncAll()
	{
		if (this._debug)
		{
			console.log('Sync all');
		}
		
	}

}