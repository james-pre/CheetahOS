import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import type { IconSize, SortOrder } from '../../system-apps/desktop/desktop.enums';

@Injectable({
	providedIn: 'root',
})
export class FileManagerService {
	autoArrangeIconsNotify: Subject<boolean> = new Subject<boolean>();
	alignIconsToGridNotify: Subject<boolean> = new Subject<boolean>();
	viewByNotify: Subject<IconSize> = new Subject<IconSize>();
	sortByNotify: Subject<SortOrder> = new Subject<SortOrder>();
	refreshNotify: Subject<void> = new Subject<void>();
	showDesktopIconsNotify: Subject<boolean> = new Subject<boolean>();
}
