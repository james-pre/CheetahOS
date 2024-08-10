import { AfterViewInit, OnInit, OnDestroy, Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';
import { BIRDS, GLOBE, HALO, RINGS, WAVE } from './vanta.interfaces';
import { FileManagerService } from 'src/app/shared/system-service/file.manager.services';
import { changeHue } from './colors';
import { FileInfo } from 'src/app/system-files/fileinfo';
import { TriggerProcessService } from 'src/app/shared/system-service/trigger.process.service';
import { ScriptService } from 'src/app/shared/system-service/script.services';
import { MenuService } from 'src/app/shared/system-service/menu.services';
import { DesktopMenu, DesktopMenuItem } from 'src/app/shared/system-component/menu/menu.item';
import * as htmlToImage from 'html-to-image';
import { FileService } from 'src/app/shared/system-service/file.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

declare let VANTA: { HALO: any; BIRDS: any; WAVES: any; GLOBE: any; RINGS: any };

export enum IconSize {
	LARGE = 'Large Icons',
	MEDIUM = 'Medium Icons',
	SMALL = 'Small Icons',
}

export enum SortOrder {
	NAME = 'Name',
	DATE_MODIFIED = 'Date Modified',
	ITEM_TYPE = 'Item Type',
	SIZE = 'Size',
}

@Component({
	selector: 'cos-desktop',
	templateUrl: './desktop.component.html',
	styleUrls: ['./desktop.component.css'],
	animations: [
		trigger('slideStatusAnimation', [
			state('slideOut', style({ right: '-200px' })),
			state('slideIn', style({ right: '2px' })),

			transition('* => slideIn', [animate('1s ease-in')]),
			transition('slideIn => slideOut', [animate('2s ease-out')]),
		]),
	],
})
export class DesktopComponent implements OnInit, OnDestroy, AfterViewInit {
	@ViewChild('desktopContainer', { static: true }) desktopContainer!: ElementRef;

	private _timerSubscription!: Subscription;
	private _showTaskBarMenuSub!: Subscription;
	private _hideMenuSub!: Subscription;
	private _showTaskBarPreviewWindowSub!: Subscription;
	private _hideTaskBarPreviewWindowSub!: Subscription;
	private _keepTaskBarPreviewWindowSub!: Subscription;

	private _vantaEffect: any;

	private _iconSize: IconSize = IconSize.LARGE;
	public get iconSize(): IconSize {
		return this._iconSize;
	}
	public set iconSize(value: IconSize) {
		this._iconSize = value;
		this.fileManagerServices.viewByNotify.next(value);
		this.getDesktopMenuData();
	}

	private _sortOrder?: SortOrder;
	public get sortOrder(): SortOrder | undefined {
		return this._sortOrder;
	}
	public set sortOrder(value: SortOrder) {
		this._sortOrder = value;
		this.fileManagerServices.sortByNotify.next(value);
		this.getDesktopMenuData();
	}

	private _autoAlignIcons = true;
	private _autoArrangeIcons = true;
	private _showDesktopIcons = true;
	_showDesktopScreenShotPreview = false;
	dsktpPrevImg = '';
	slideState = 'slideIn';

	dskTopCntxtMenuStyle: Record<string, unknown> = {};
	tskBarCntxtMenuStyle: Record<string, unknown> = {};
	tskBarPrevWindowStyle: Record<string, unknown> = {};
	deskTopMenuOption = 'desktop-menu';
	showDesktopCntxtMenu = false;
	showTskBarCntxtMenu = false;
	showTskBarPreviewWindow = false;
	tskBarPreviewWindowState = 'in';
	tskBarMenuOption = 'taskbar-menu';
	selectedFileFromTaskBar!: FileInfo;
	appToPreview = '';
	appToPreviewIcon = '';
	previousDisplayedTaskbarPreview = '';
	removeTaskBarPreviousWindowFromDOMTimeoutId!: NodeJS.Timeout;
	hideTaskbarPreviousWindowTimeoutId!: NodeJS.Timeout;

	hasWindow = false;
	icon = 'osdrive/icons/generic-program.ico';
	name = 'desktop';
	processId = 0;
	type = ComponentType.System;
	displayName = '';

	waveBkgrnd: WAVE = { el: '#vanta' };
	ringsBkgrnd: RINGS = { el: '#vanta' };
	haloBkgrnd: HALO = { el: '#vanta' };
	globeBkgrnd: GLOBE = { el: '#vanta' };
	birdBkgrnd: BIRDS = { el: '#vanta' };

	VANTAS: any = [this.waveBkgrnd, this.ringsBkgrnd, this.haloBkgrnd, this.globeBkgrnd, this.birdBkgrnd];
	private MIN_NUMS_OF_DESKTOPS = 0;
	private MAX_NUMS_OF_DESKTOPS = this.VANTAS.length - 1;
	private CURRENT_DESTOP_NUM = 0;

	private MIN_DEG = 0;
	private MAX_DEG = 360;
	private CURRENT_DEG = 0;
	private defaultColor = 0x274c;
	private animationId: any;

	public taskBarMenuData = [
		{ icon: '', label: '', action: this.openApplicationFromTaskBar.bind(this) },
		{ icon: '', label: '', action: () => console.log() },
	];

	public deskTopMenu: DesktopMenu[] = [];

	public constructor(
		private processIdService: ProcessIDService,
		private runningProcessService: RunningProcessService,
		private fileManagerServices: FileManagerService,
		private triggerProcessService: TriggerProcessService,
		private scriptService: ScriptService,
		private menuService: MenuService,
		private fileService: FileService
	) {
		this._showTaskBarMenuSub = menuService.showTaskBarMenu.subscribe(p => this.onShowTaskBarContextMenu(p));
		this._showTaskBarPreviewWindowSub = runningProcessService.showPreviewWindowNotify.subscribe(p => {
			this.showTaskBarPreviewWindow(p);
		});
		this._hideMenuSub = this.menuService.hideContextMenus.subscribe(() => {
			this.hideContextMenu();
		});
		this._hideTaskBarPreviewWindowSub = this.runningProcessService.hidePreviewWindowNotify.subscribe(() => {
			this.hideTaskBarPreviewWindow();
		});
		this._keepTaskBarPreviewWindowSub = this.runningProcessService.keepPreviewWindowNotify.subscribe(() => {
			this.keepTaskBarPreviewWindow();
		});

		this.processId = this.processIdService.getNewProcessId();
		this.runningProcessService.addProcess(this.getComponentDetail());
		this.CURRENT_DEG = this.getRandomInt(0, 360);
	}

	public ngOnInit(): void {
		this.scriptService.loadScript('vanta-waves', 'assets/backgrounds/vanta.waves.min.js').then(() => {
			this._vantaEffect = VANTA.WAVES({
				el: '#vanta',
				color: this.defaultColor, //this._numSequence,
				waveHeight: 20,
				shininess: 50,
				waveSpeed: 0.5,
				zoom: 0.75,
			});
		});

		this.getDesktopMenuData();
	}

	public ngAfterViewInit(): void {
		//this.animationId = requestAnimationFrame(this.changeAnimationColor.bind(this));
		this.hideContextMenu();
		this.loadOtherBackgrounds();
	}

	public loadOtherBackgrounds(): void {
		const names: string[] = ['rings', 'halo', 'globe', 'birds'];
		const bkgrounds: string[] = [
			'assets/backgrounds/vanta.rings.min.js',
			'assets/backgrounds/vanta.halo.min.js',
			'assets/backgrounds/vanta.globe.min.js',
			'assets/backgrounds/vanta.birds.min.js',
		];

		for (let i = 0; i <= bkgrounds.length - 1; i++) {
			this.scriptService.loadScript(names[i], bkgrounds[i]);
		}
	}

	public changeAnimationColor(): void {
		this.CURRENT_DEG = this.CURRENT_DEG > this.MAX_DEG ? this.MIN_DEG : this.CURRENT_DEG + 1;

		console.log('nextColor:', Number(changeHue('#4f32c2', this.CURRENT_DEG)?.replace('#', '0x')));
		this._vantaEffect.setOptions({
			color: Number(changeHue('#4f32c2', this.CURRENT_DEG)?.replace('#', '0x')),
		});

		// this ain't working
		//this.animationId = requestAnimationFrame(this.changeAnimationColor.bind(this));
	}

	public ngOnDestroy(): void {
		this._timerSubscription?.unsubscribe();
		this._showTaskBarMenuSub?.unsubscribe();
		this._hideMenuSub?.unsubscribe();
		this._showTaskBarPreviewWindowSub?.unsubscribe();
		this._hideTaskBarPreviewWindowSub?.unsubscribe();
		this._keepTaskBarPreviewWindowSub?.unsubscribe();

		cancelAnimationFrame(this.animationId);
		this._vantaEffect?.destroy();
	}

	public getRandomInt(min: number, max: number): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min);
	}

	public showDesktopContextMenu(evt: MouseEvent): void {
		/**
		 * There is a doubling of responses to certain events that exist on the
		 * desktop compoonent and any other component running at the time the event was triggered.
		 * The desktop will always respond to the event, but other components will only respond when they are in focus.
		 * If there is a count of 2 or more(highly unlikely) reponses for a given event, then, ignore the desktop's response
		 */

		const evtOriginator = this.runningProcessService.getEventOrginator();

		if (evtOriginator != '') {
			this.runningProcessService.removeEventOriginator();
			return;
		}
		this.showDesktopCntxtMenu = true;
		this.dskTopCntxtMenuStyle = {
			position: 'absolute',
			width: '210px',
			transform: `translate(${String(evt.clientX + 2)}px, ${String(evt.clientY)}px)`,
			'z-index': 2,
			opacity: 1,
		};
		evt.preventDefault();
	}

	public async captureComponentImg(): Promise<void> {
		const directory = '/Documents/Screen-Shots';
		const img = await htmlToImage.toPng(this.desktopContainer.nativeElement);
		//console.log('img data:',htmlImg);

		const screenshot: FileInfo = new FileInfo();
		screenshot.fileName = 'screen_shot.png';
		screenshot.currentPath = `${directory}/screen_shot.png`;
		screenshot.contentPath = img;
		screenshot.iconPath = img;

		this._showDesktopScreenShotPreview = true;
		this.slideState = 'slideIn';
		this.dsktpPrevImg = img;

		// const img = new Image();
		// img.src = htmlImg;
		// document.body.appendChild(img);

		setTimeout(() => {
			this.slideState = 'slideOut';
			this.fileService.writeFileAsync(directory, screenshot);
			this.fileService.addEventOriginator('fileexplorer');
			this.fileService.dirFilesUpdateNotify.next();
		}, 4000);

		setTimeout(() => {
			this._showDesktopScreenShotPreview = false;
		}, 6000);
	}

	public async createFolder(): Promise<void> {
		const directory = '/Desktop';
		const folderName = 'New Folder';
		const result = await this.fileService.createFolderAsync(directory, folderName);
		if (result) {
			this.fileService.addEventOriginator('filemanager');
			this.fileService.dirFilesUpdateNotify.next();
		}
	}

	public hideContextMenu(): void {
		this.showDesktopCntxtMenu = false;
		this.showTskBarCntxtMenu = false;
	}

	public autoArrangeIcons(): void {
		this._autoArrangeIcons = !this._autoArrangeIcons;
		this.fileManagerServices.autoArrangeIconsNotify.next(this._autoArrangeIcons);
		this.getDesktopMenuData();
	}

	public autoAlignIcons(): void {
		this._autoAlignIcons = !this._autoAlignIcons;
		this.fileManagerServices.alignIconsToGridNotify.next(this._autoAlignIcons);
		this.getDesktopMenuData();
	}

	public refresh(): void {
		this.fileManagerServices.refreshNotify.next();
	}

	public toggleDesktopIcons(): void {
		this._showDesktopIcons = !this._showDesktopIcons;
		this.fileManagerServices.showDesktopIconsNotify.next(this._showDesktopIcons);
		this.getDesktopMenuData();
	}

	public previousBackground(): void {
		if (this.CURRENT_DESTOP_NUM > this.MIN_NUMS_OF_DESKTOPS) {
			this.CURRENT_DESTOP_NUM--;
			const curNum = this.CURRENT_DESTOP_NUM;
			this.buildVantaEffect(curNum);
		}
		this.hideContextMenu();
	}

	public nextBackground(): void {
		if (this.CURRENT_DESTOP_NUM < this.MAX_NUMS_OF_DESKTOPS) {
			this.CURRENT_DESTOP_NUM++;
			const curNum = this.CURRENT_DESTOP_NUM;
			this.buildVantaEffect(curNum);
		}

		this.hideContextMenu();
	}

	public openApplication(appID: string): void {
		const file = new FileInfo();

		file.opensWith = appID;

		if (appID == 'markdownviewer') {
			file.currentPath = '/Desktop';
			file.contentPath = '/Documents/Credits.md';
		}

		this.triggerProcessService.startApplication(file);
	}

	public buildViewByMenu(): DesktopMenuItem[] {
		return [
			{
				icon: 'osdrive/icons/circle.png',
				label: 'Small icons',
				action: () => (this.iconSize = IconSize.SMALL),
				variables: this.iconSize == IconSize.SMALL,
				emptyline: false,
				styleOption: 'A',
			},
			{
				icon: 'osdrive/icons/circle.png',
				label: 'Medium icons',
				action: () => (this.iconSize = IconSize.MEDIUM),
				variables: this.iconSize == IconSize.MEDIUM,
				emptyline: false,
				styleOption: 'A',
			},
			{
				icon: 'osdrive/icons/circle.png',
				label: 'Large icons',
				action: () => (this.iconSize = IconSize.LARGE),
				variables: this.iconSize == IconSize.LARGE,
				emptyline: true,
				styleOption: 'A',
			},
			{
				icon: 'osdrive/icons/chkmark32.png',
				label: 'Auto arrange icons',
				action: this.autoArrangeIcons.bind(this),
				variables: this._autoArrangeIcons,
				emptyline: false,
				styleOption: 'B',
			},
			{
				icon: 'osdrive/icons/chkmark32.png',
				label: 'Align icons to grid',
				action: this.autoAlignIcons.bind(this),
				variables: this._autoAlignIcons,
				emptyline: true,
				styleOption: 'B',
			},
			{
				icon: 'osdrive/icons/chkmark32.png',
				label: 'Show desktop icons',
				action: this.toggleDesktopIcons.bind(this),
				variables: this._showDesktopIcons,
				emptyline: false,
				styleOption: 'B',
			},
		];
	}

	public buildSortByMenu(): DesktopMenuItem[] {
		return [
			{
				icon: 'osdrive/icons/circle.png',
				label: 'Name',
				action: () => (this.sortOrder = SortOrder.NAME),
				variables: this.sortOrder == SortOrder.NAME,
				emptyline: false,
				styleOption: 'A',
			},
			{
				icon: 'osdrive/icons/circle.png',
				label: 'Size',
				action: () => (this.sortOrder = SortOrder.SIZE),
				variables: this.sortOrder == SortOrder.SIZE,
				emptyline: false,
				styleOption: 'A',
			},
			{
				icon: 'osdrive/icons/circle.png',
				label: 'Item type',
				action: () => (this.sortOrder = SortOrder.ITEM_TYPE),
				variables: this.sortOrder == SortOrder.ITEM_TYPE,
				emptyline: false,
				styleOption: 'A',
			},
			{
				icon: 'osdrive/icons/circle.png',
				label: 'Date modified',
				action: () => (this.sortOrder = SortOrder.DATE_MODIFIED),
				variables: this.sortOrder == SortOrder.DATE_MODIFIED,
				emptyline: false,
				styleOption: 'A',
			},
		];
	}

	public buildNewMenu(): DesktopMenuItem[] {
		return [
			{
				icon: 'osdrive/icons/empty_folder.ico',
				label: 'Folder',
				action: this.createFolder.bind(this),
				variables: true,
				emptyline: false,
				styleOption: 'C',
			},
			{
				icon: 'osdrive/icons/text-editor_48.png',
				label: 'Rich Text',
				action: () => this.openApplication('texteditor'),
				variables: true,
				emptyline: false,
				styleOption: 'C',
			},
			{
				icon: 'osdrive/icons/vs-code_48.png',
				label: 'Code Editor',
				action: () => this.openApplication('codeeditor'),
				variables: true,
				emptyline: false,
				styleOption: 'C',
			},
		];
	}

	public getDesktopMenuData(): void {
		this.deskTopMenu = [
			{ icon1: '', icon2: 'osdrive/icons/arrow_next.png', label: 'View', nest: this.buildViewByMenu(), action: () => console.log(), emptyline: false },
			{ icon1: '', icon2: 'osdrive/icons/arrow_next.png', label: 'Sort by', nest: this.buildSortByMenu(), action: () => console.log(), emptyline: false },
			{ icon1: '', icon2: '', label: 'Refresh', nest: [], action: this.refresh.bind(this), emptyline: true },
			{ icon1: '', icon2: '', label: 'Paste', nest: [], action: () => console.log('Paste!! Paste!!'), emptyline: false },
			{ icon1: '/osdrive/icons/terminal_48.png', icon2: '', label: 'Open in Terminal', nest: [], action: () => this.openApplication('terminal'), emptyline: false },
			{ icon1: '/osdrive/icons/camera_48.png', icon2: '', label: 'Screen Shot', nest: [], action: this.captureComponentImg.bind(this), emptyline: false },
			{ icon1: '', icon2: '', label: 'Next Background', nest: [], action: this.nextBackground.bind(this), emptyline: false },
			{ icon1: '', icon2: '', label: 'Previous Background', nest: [], action: this.previousBackground.bind(this), emptyline: true },
			{ icon1: '', icon2: 'osdrive/icons/arrow_next.png', label: 'New', nest: this.buildNewMenu(), action: () => console.log(), emptyline: true },
			{ icon1: '', icon2: '', label: 'Many Thanks', nest: [], action: () => this.openApplication('markdownviewer'), emptyline: false },
		];
	}

	private buildVantaEffect(n: number) {
		try {
			const vanta = this.VANTAS[n];
			if (n == 0) {
				this._vantaEffect = VANTA.WAVES(vanta);
			}
			if (n == 1) {
				this._vantaEffect = VANTA.RINGS(vanta);
			}
			if (n == 2) {
				this._vantaEffect = VANTA.HALO(vanta);
			}
			if (n == 3) {
				this._vantaEffect = VANTA.GLOBE(vanta);
			}
			if (n == 4) {
				this._vantaEffect = VANTA.BIRDS(vanta);
			}
		} catch (err) {
			console.error('err:', err);
			//this.buildVantaEffect(this.CURRENT_DESTOP_NUM);
		}
	}

	onShowTaskBarContextMenu(data: unknown[]): void {
		const rect = data[0] as DOMRect;
		const file = data[1] as FileInfo;
		const isPinned = data[2] as boolean;
		this.selectedFileFromTaskBar = file;

		this.switchBetweenPinAndUnpin(isPinned);
		// first count, then show the cntxt menu
		const processCount = this.countInstaceAndSetMenu();

		this.removeOldTaskBarPreviewWindowNow();
		this.showTskBarCntxtMenu = true;

		if (processCount == 0) {
			this.tskBarCntxtMenuStyle = {
				position: 'absolute',
				transform: `translate(${String(rect.x - 60)}px, ${String(rect.y - 68.5)}px)`,
				'z-index': 2,
			};
		} else {
			this.tskBarCntxtMenuStyle = {
				position: 'absolute',
				transform: `translate(${String(rect.x - 60)}px, ${String(rect.y - 97.5)}px)`,
				'z-index': 2,
			};
		}
	}

	public switchBetweenPinAndUnpin(isAppPinned: boolean): void {
		if (isAppPinned) {
			const menuEntry = { icon: 'osdrive/icons/unpin_24.png', label: 'Unpin from taskbar', action: this.unPinApplicationFromTaskBar.bind(this) };
			const rowOne = this.taskBarMenuData[1];
			rowOne.icon = menuEntry.icon;
			rowOne.label = menuEntry.label;
			rowOne.action = menuEntry.action;
			this.taskBarMenuData[1] = rowOne;
		} else if (!isAppPinned) {
			const menuEntry = { icon: 'osdrive/icons/pin_24.png', label: 'Pin to taskbar', action: this.pinApplicationFromTaskBar.bind(this) };
			const rowOne = this.taskBarMenuData[1];
			rowOne.icon = menuEntry.icon;
			rowOne.label = menuEntry.label;
			rowOne.action = menuEntry.action;
			this.taskBarMenuData[1] = rowOne;
		}
	}

	public countInstaceAndSetMenu(): number {
		const file = this.selectedFileFromTaskBar;
		const processCount = this.runningProcessService.getProcesses().filter(p => p.getProcessName === file.opensWith).length;

		const rowZero = this.taskBarMenuData[0];
		rowZero.icon = file.iconPath;
		rowZero.label = file.opensWith;
		this.taskBarMenuData[0] = rowZero;

		if (processCount == 1) {
			if (this.taskBarMenuData.length == 2) {
				const menuEntry = { icon: 'osdrive/icons/x_32.png', label: 'Close window', action: this.closeApplicationFromTaskBar.bind(this) };
				this.taskBarMenuData.push(menuEntry);
			} else {
				const rowTwo = this.taskBarMenuData[2];
				rowTwo.label = 'Close window';
				this.taskBarMenuData[2] = rowTwo;
			}
		} else if (processCount > 1) {
			const rowTwo = this.taskBarMenuData[2];
			rowTwo.label = 'Close all windows';
			this.taskBarMenuData[2] = rowTwo;
		}

		return processCount;
	}

	public openApplicationFromTaskBar(): void {
		this.showTskBarCntxtMenu = false;
		const file = this.selectedFileFromTaskBar;
		this.triggerProcessService.startApplication(file);
	}

	public closeApplicationFromTaskBar(): void {
		this.showTskBarCntxtMenu = false;
		const file = this.selectedFileFromTaskBar;
		const proccesses = this.runningProcessService.getProcesses().filter(p => p.getProcessName === file.opensWith);

		this.menuService.closeApplicationFromTaskBar.next(proccesses);
	}

	public pinApplicationFromTaskBar(): void {
		this.showTskBarCntxtMenu = false;
		const file = this.selectedFileFromTaskBar;
		this.menuService.pinToTaskBar.next(file);
	}

	public unPinApplicationFromTaskBar(): void {
		this.showTskBarCntxtMenu = false;
		const file = this.selectedFileFromTaskBar;
		this.menuService.unPinFromTaskBar.next(file);
	}

	public showTaskBarPreviewWindow(data: unknown[]): void {
		const rect = data[0] as DOMRect;
		const appName = data[1] as string;
		const iconPath = data[2] as string;

		this.appToPreview = appName;
		this.appToPreviewIcon = iconPath;
		this.showTskBarCntxtMenu = false;

		if (this.previousDisplayedTaskbarPreview !== appName) {
			this.showTskBarPreviewWindow = false;
			this.previousDisplayedTaskbarPreview = appName;

			setTimeout(() => {
				this.showTskBarPreviewWindow = true;
				this.tskBarPreviewWindowState = 'in';
			}, 400);
		} else {
			this.showTskBarPreviewWindow = true;
			this.tskBarPreviewWindowState = 'in';
			this.clearTimeout();
		}

		this.tskBarPrevWindowStyle = {
			position: 'absolute',
			transform: `translate(${String(rect.x - 59)}px, ${String(rect.y - 131)}px)`,
			'z-index': 2,
		};
	}

	public hideTaskBarPreviewWindow(): void {
		this.hideTaskbarPreviousWindowTimeoutId = setTimeout(() => {
			this.tskBarPreviewWindowState = 'out';
		}, 100);

		this.removeTaskBarPreviousWindowFromDOMTimeoutId = setTimeout(() => {
			this.showTskBarPreviewWindow = false;
			//this.hideTaskBarContextMenu();
		}, 300);
	}

	public keepTaskBarPreviewWindow(): void {
		this.clearTimeout();
	}

	public removeOldTaskBarPreviewWindowNow(): void {
		this.showTskBarPreviewWindow = false;
	}

	public clearTimeout(): void {
		clearTimeout(this.hideTaskbarPreviousWindowTimeoutId);
		clearTimeout(this.removeTaskBarPreviousWindowFromDOMTimeoutId);
	}

	private getComponentDetail(): Process {
		return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type);
	}
}
