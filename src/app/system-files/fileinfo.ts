export class FileInfo {
	public iconPath: string = '';
	public currentPath: string = '';
	public contentPath: string = '';
	public fileType: string = '';
	public fileName: string = '';
	public opensWith: string = '';
	private _dateModified: Date = new Date('1990-01-01');
	public size: number = 0;
	public isFile: boolean = true;
	public mode: number = 0;

	get dateModified(): Date {
		return this._dateModified;
	}

	set dateModified(dateModified: Date | string | number) {
		this._dateModified = new Date(dateModified);
	}

	get dateModifiedUS() {
		return this._dateModified.toLocaleString('en-US');
	}

	get dateTimeModifiedUS() {
		return this._dateModified
			.toLocaleString('en-US', {
				month: 'short',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				hour12: true,
			})
			.replace(',', '');
	}
}
