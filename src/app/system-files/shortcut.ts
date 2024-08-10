export class ShortCut {
	private _iconPath: string;
	private _fileName: string;
	private _fileType: string;
	private _contentPath: string;
	private _opensWith: string;

	constructor(IconPath: string, FileName: string, FileType: string, ContentPath: string, OpensWith: string) {
		this._iconPath = IconPath;
		this._fileName = FileName;
		this._fileType = FileType;
		this._contentPath = ContentPath;
		this._opensWith = OpensWith;
	}

	get iconPath() {
		return this._iconPath;
	}
	set iconPath(iconFile: string) {
		this._iconPath = iconFile;
	}

	get geFileName() {
		return this._fileName;
	}
	set fileName(fileName: string) {
		this._fileName = fileName;
	}

	get contentPath() {
		return this._contentPath;
	}
	set contentPath(contentUrl: string) {
		this._contentPath = contentUrl;
	}

	get fileType() {
		return this._fileType;
	}
	set fileType(fileType: string) {
		this._fileType = fileType;
	}

	get opensWith() {
		return this._opensWith;
	}
	set opensWith(opensWith: string) {
		this._opensWith = opensWith;
	}
}
