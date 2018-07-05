window.onload = function () {
	document.getElementById('Test').addEventListener('click', TestSaveSync);
}



class Setting 
{
	constructor(debug)
	{
		this._debug = debug;
	}
	
	function saveSetting(key, value)
	{
		if (navigator.onLine)
		{
			if (!loadLocal("Synced"))
			{
				SyncAll();
			}
			saveOnline(key, value);
			saveLocal("Synced", true);
		}
		else {
			saveLocal(key, value);
			saveLocal("Synced", false);
		}
	}
	
	function saveOnline(key, value)
	{
		chrome.storage.sync.set({key: value}, function() {
			if (this._debug)
			{
				console.log('Value '+key+' is set globally to ' + value);
			}
		});
		
		saveLocal(key, value);
	}
}
  
  function TestSaveSync()
  {
	console.log("Test save sync!");
	saveSetting("Test", "TestSave")
	loadSettings("Test");
	console.log("Test save sync end!");
  }

function saveSetting(key, value)
{
	if (navigator.onLine)
	{
		if (!loadLocal("Synced"))
		{
			SyncAll();
		}
		saveOnline(key, value);
		saveLocal("Synced", true);
	}else{
		saveLocal(key, value);
		saveLocal("Synced", false);
	}
}

function saveOnline(key, value)
{
	chrome.storage.sync.set({key: value}, function() {
		console.log('Value '+key+' is set globally to ' + value);
	});
	
	saveLocal(key, value);
}

function saveLocal(key, value)
{
	chrome.storage.local.set({key: value}, function() {
        console.log('Value  '+key+' is set locally to ' + value);
    });
}

function loadSettings(key)
{
	if (navigator.onLine)
	{
		if (!loadLocal("Synced"))
		{
			SyncAll();
		}
		return loadOnline(key);
	}else{
		return loadLocal(key);
	}
}

function loadOnline(key)
{
	chrome.storage.sync.get(['key'], function(result) {
        console.log('Value '+key+' currently is ' + result.key);
    });
}


function loadLocal(key)
{
	chrome.storage.local.get(['key'], function(result) {
        console.log('Value '+key+' currently is ' + result.key);
    });
}

function SyncAll()
{
	console.log('Sync all');
}
