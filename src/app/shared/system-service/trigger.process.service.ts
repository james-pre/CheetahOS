import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RunningProcessService } from './running.process.service';
import { AppDirectory } from 'src/app/system-files/app.directory';
import { FileInfo } from 'src/app/system-files/fileinfo';

@Injectable({
	providedIn: 'root',
})
export class TriggerProcessService {
	private _runningProcessService: RunningProcessService;
	private _appDirectory: AppDirectory;
	private _TriggerList: FileInfo[];
	private _onlyOneInstanceAllowed: string[] = ['taskmanager'];
	static instance: TriggerProcessService;

	startProcessNotify: Subject<string> = new Subject<string>();
	appNotFoundNotify: Subject<string> = new Subject<string>();
	appIsRunningNotify: Subject<string> = new Subject<string>();

	constructor(runningProcessService: RunningProcessService) {
		this._runningProcessService = runningProcessService;
		this._appDirectory = new AppDirectory();
		this._TriggerList = [];
		TriggerProcessService.instance = this; //I added this to access the service from a class, not component
	}

	startApplication(file: FileInfo): void {
		let msg = '';
		if (this._appDirectory.appExist(file.opensWith)) {
			if (
				!this._runningProcessService.isProcessRunning(file.opensWith) ||
				(this._runningProcessService.isProcessRunning(file.opensWith) && !this._onlyOneInstanceAllowed.includes(file.opensWith))
			) {
				this.startProcessNotify.next(file.opensWith);
				this._TriggerList.push(file);
				return;
			} else {
				if (this._onlyOneInstanceAllowed.includes(file.opensWith)) {
					msg = `Only one instance of ${file.opensWith} is allowed to run.`;
					this.appIsRunningNotify.next(msg);
					return;
				}
			}
		}
		msg = `Osdrive:/App Directory/${file.opensWith}`;
		this.appNotFoundNotify.next(msg);
		return;
	}

	/**
	 * Getting the last process from the Trigger, will remove it the TriggerList.
	 */
	getLastProcessTrigger(): FileInfo {
		if (this._TriggerList.length > 0) {
			return this._TriggerList.pop() || new FileInfo();
		}

		return new FileInfo();
	}
}
