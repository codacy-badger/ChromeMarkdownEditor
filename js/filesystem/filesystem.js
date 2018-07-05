class Filesystem
{
	constructor(debug, local)
	{
		this._debug = debug;
		this._local = local;
		
		if (local)
		{
			this._filesystemProvider = new LocalFilesystem(debug);
		}
		else
		{
			this._filesystemProvider = new RemoteFilesystem(debug);
		}
		
	}
}