window.onload = function () {
	document.getElementById('Test').addEventListener('click', TestSaveSync);
}

function TestSaveSync()
{
	var set = new Setting(true);
	console.log("Test save sync!");
	set.saveSetting("Test", "TestSave")
	set.loadSetting("Test");
	
	var value = set.loadSetting("Test");
	var textbox = document.getElementById('TextBox');
	console.log("Loaded value: " + value);
	var textNode = document.createTextNode(value); 
	textbox.appendChild(textNode);   
	
	console.log("Test save sync end!");
}

class Setting 
{
	constructor(debug)
	{
		this._debug = debug;
	}
	
	saveSetting(key, value)
	{
		if (navigator.onLine)
		{
			if (!this.loadLocal("Synced"))
			{
				this.SyncAll();
			}
			this.saveOnline(key, value);
			this.saveLocal("Synced", true);
		}
		else {
			this.saveLocal(key, value);
			this.saveLocal("Synced", false);
		}
	}
	
	saveOnline(key, value)
	{
		var debug = this._debug
		chrome.storage.sync.set({key: value}, function() {
			if (debug)
			{
				console.log('Value '+key+' is set globally to ' + value);
			}
		});
		
		this.saveLocal(key, value);
	}
	
	saveLocal(key, value)
	{
		var debug = this._debug
		chrome.storage.local.set({key: value}, function() {
			if (debug)
			{
				console.log('Value  '+key+' is set locally to ' + value);
			}
		});
	}
	
	loadSetting(key)
	{
		if (navigator.onLine)
		{
			if (!this.loadLocal("Synced"))
			{
				this.SyncAll();
			}
			
			return this.loadOnline(key);
		}else{
			return this.loadLocal(key);
		}
	}
	
	loadOnline(key)
	{
		var debug = this._debug
		var returnResult;
		chrome.storage.sync.get(['key'], function(result) {
			if (debug)
			{
				console.log('Value '+key+' currently is ' + result.key);
			}
			returnResult = result.key;
			console.log("in test: " + returnResult);
		});
		console.log("out test: " + returnResult);
		return returnResult;
	}


	loadLocal(key)
	{
		var debug = this._debug
		var returnResult;
		chrome.storage.local.get(['key'], function(result) {
			if (debug)
			{
				console.log('Value '+key+' currently is ' + result.key);
			}
			returnResult = result.key;
		});
		return returnResult;
	}

	SyncAll()
	{
		console.log('Sync all');
	}
	
	
}