import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FileService } from 'src/app/shared/system-service/file.service';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';
import { FileEntry } from 'src/app/system-files/fileentry';
import { FileInfo } from 'src/app/system-files/fileinfo';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { Subscription } from 'rxjs';
import { TriggerProcessService } from 'src/app/shared/system-service/trigger.process.service';
import { StateManagmentService } from 'src/app/shared/system-service/state.management.service';
import { FileManagerService } from 'src/app/shared/system-service/file.manager.services';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ViewOptions } from './fileexplorer.enums';
import { basename } from 'path';
import { AppState, BaseState } from 'src/app/system-files/state/state.interface';
import { StateType } from 'src/app/system-files/state/state.type';
import { SessionManagmentService } from 'src/app/shared/system-service/session.management.service';
import { Constants } from 'src/app/system-files/constants';
import * as htmlToImage from 'html-to-image';
import { TaskBarPreviewImage } from '../taskbarpreview/taskbar.preview';
import { MenuService } from 'src/app/shared/system-service/menu.services';

@Component({
	selector: 'cos-fileexplorer',
	templateUrl: './fileexplorer.component.html',
	styleUrls: ['./fileexplorer.component.css'],
	encapsulation: ViewEncapsulation.None,
})
export class FileExplorerComponent implements BaseComponent, OnInit, AfterViewInit, OnDestroy {
	@ViewChild('fileExplorerMainContainer', { static: true }) fileExplrMainCntnr!: ElementRef;
	@ViewChild('fileExplorerRootContainer', { static: true }) fileExplorerRootContainer!: ElementRef;
	@ViewChild('fileExplorerContentContainer', { static: true }) fileExplrCntntCntnr!: ElementRef;

	private _processIdService: ProcessIDService;
	private _runningProcessService: RunningProcessService;
	private _fileService: FileService;
	private _directoryFilesEntires!: FileEntry[];
	private _triggerProcessService: TriggerProcessService;
	private _stateManagmentService: StateManagmentService;
	private _sessionManagmentService: SessionManagmentService;
	private _menuService: MenuService;
	private _formBuilder;
	private _appState!: AppState;
	private _consts: Constants = new Constants();

	private _viewByNotifySub!: Subscription;
	private _sortByNotifySub!: Subscription;
	private _refreshNotifySub!: Subscription;
	private _autoArrangeIconsNotifySub!: Subscription;
	private _autoAlignIconsNotifyBySub!: Subscription;
	private _dirFilesUpdatedSub!: Subscription;

	private isPrevBtnActive = false;
	private isNextBtnActive = false;
	private isUpBtnActive = true;
	private isNavigatedBefore = false;
	private isRenameActive = false;
	private isIconInFocusDueToCurrentAction = false;
	private isIconInFocusDueToPriorAction = false;
	private isBtnClickEvt = false;
	private isHideCntxtMenuEvt = false;

	private selectedFile!: FileInfo;
	private selectedElementId = -1;
	private prevSelectedElementId = -1;
	private hideCntxtMenuEvtCnt = 0;
	private btnClickCnt = 0;
	private renameFileTriggerCnt = 0;
	private currentIconName = '';

	isSearchBoxNotEmpty = false;
	showPathHistory = false;
	onClearSearchIconHover = false;
	onSearchIconHover = false;
	showCntxtMenu = false;
	showInformationTip = false;
	hasWindow = true;
	//hideInformationTip = false;

	fxIconCntxtMenuStyle: Record<string, unknown> = {};
	clearSearchStyle: Record<string, unknown> = {};
	searchStyle: Record<string, unknown> = {};
	prevNavBtnStyle: Record<string, unknown> = {};
	nextNavBtnStyle: Record<string, unknown> = {};
	recentNavBtnStyle: Record<string, unknown> = {};
	upNavBtnStyle: Record<string, unknown> = {};
	upNavBtnCntnrStyle: Record<string, unknown> = {};
	tabLayoutCntnrStyle: Record<string, unknown> = {};
	olClassName = 'ol-icon-size-view';

	files: FileInfo[] = [];
	_fileInfo!: FileInfo;
	prevPathEntries: string[] = [];
	nextPathEntries: string[] = [];
	recentPathEntries: string[] = [];
	upPathEntries: string[] = ['/Desktop'];
	_directoryHops: string[] = ['This PC'];
	SECONDS_DELAY: number[] = [100, 1500, 6000, 12000, 250];

	defaultviewOption = ViewOptions.MEDIUM_ICON_VIEW;
	currentViewOption = ViewOptions.MEDIUM_ICON_VIEW;
	currentViewOptionId = 3;

	readonly smallIconsView = ViewOptions.SMALL_ICON_VIEW;
	readonly mediumIconsView = ViewOptions.MEDIUM_ICON_VIEW;
	readonly largeIconsView = ViewOptions.LARGE_ICON_VIEW;
	readonly extraLargeIconsView = ViewOptions.EXTRA_LARGE_ICON_VIEW;
	readonly listView = ViewOptions.LIST_VIEW;
	readonly detailsView = ViewOptions.DETAILS_VIEW;
	readonly contentView = ViewOptions.CONTENT_VIEW;
	readonly tilesView = ViewOptions.TILES_VIEW;

	renameForm!: FormGroup;
	pathForm!: FormGroup;
	searchForm!: FormGroup;

	searchHistory = ['Java', 'ProgramFile', 'Perenne'];
	pathHistory = ['/icons', '/Games', '/Videos'];

	menuData = [
		{ icon: '', label: 'Open', action: this.onTriggerRunProcess.bind(this) },
		{ icon: '', label: 'Open in new window', action: this.doNothing.bind(this) },
		{ icon: '', label: 'Pin to Start', action: this.doNothing.bind(this) },
		{ icon: '', label: 'Cut', action: this.doNothing.bind(this) },
		{ icon: '', label: 'Copy', action: this.doNothing.bind(this) },
		{ icon: '', label: 'Delete', action: this.onDeleteFile.bind(this) },
		{ icon: '', label: 'Rename', action: this.onRenameFileTxtBoxShow.bind(this) },
		{ icon: '', label: 'Properties', action: this.doNothing.bind(this) },
	];
	fileExplrMngrMenuOption = 'file-explorer-file-manager-menu';

	fileInfoTipData = [{ label: '', data: '' }];

	fileType = '';
	fileAuthor = '';
	fileSize = '';
	fileDimesions = '';
	fileDateModified = '';

	icon = 'osdrive/icons/file_explorer.png';
	navPathIcon = 'osdrive/icons/my_computer.ico';
	name = 'fileexplorer';
	processId = 0;
	type = ComponentType.System;
	directory = '/';
	displayName = 'fileexplorer';

	constructor(
		processIdService: ProcessIDService,
		runningProcessService: RunningProcessService,
		fileInfoService: FileService,
		triggerProcessService: TriggerProcessService,
		fileManagerService: FileManagerService,
		formBuilder: FormBuilder,
		stateManagmentService: StateManagmentService,
		sessionManagmentService: SessionManagmentService,
		menuService: MenuService
	) {
		this._processIdService = processIdService;
		this._runningProcessService = runningProcessService;
		this._fileService = fileInfoService;
		this._triggerProcessService = triggerProcessService;
		this._stateManagmentService = stateManagmentService;
		this._sessionManagmentService = sessionManagmentService;
		this._menuService = menuService;
		this._formBuilder = formBuilder;

		this.processId = this._processIdService.getNewProcessId();
		this._runningProcessService.addProcess(this.getComponentDetail());
		this.retrievePastSessionData();

		this._dirFilesUpdatedSub = this._fileService.dirFilesUpdateNotify.subscribe(() => {
			if (this._fileService.getEventOrginator() === this.name) {
				this.loadFilesInfoAsync();
				this._fileService.removeEventOriginator();
			}
		});

		this._sortByNotifySub = fileManagerService.sortByNotify.subscribe(p => {
			this.sortIcons(p);
		});
		this._refreshNotifySub = fileManagerService.refreshNotify.subscribe(() => {
			this.refreshIcons();
		});
	}

	ngOnInit(): void {
		this._fileInfo = this._triggerProcessService.getLastProcessTrigger();

		if (this._fileInfo) {
			// is this a URL or and Actual Folder
			if (this._fileInfo.opensWith === 'fileexplorer' && !this._fileInfo.isFile)
				//Actual Folder
				this.directory = this._fileInfo.currentPath;
		}

		this.renameForm = this._formBuilder.nonNullable.group({
			renameInput: '',
		});
		this.pathForm = this._formBuilder.nonNullable.group({
			pathInput: '',
		});
		this.searchForm = this._formBuilder.nonNullable.group({
			searchInput: '',
		});

		this.setNavButtonsColor();
	}

	async ngAfterViewInit(): Promise<void> {
		this.setFileExplorerWindowToFocus(this.processId);
		this.hidePathTextBoxOnload();
		this.changeFileExplorerLayoutCSS(this.currentViewOption);
		this.changeTabLayoutIconCntnrCSS(this.currentViewOptionId, false);

		this.pathForm.setValue({
			pathInput: this.directory !== '/' ? this.directory : '/',
		});

		await this.loadFilesInfoAsync().then(() => {
			setTimeout(() => {
				this.captureComponentImg();
			}, this.SECONDS_DELAY[4]);
		});
	}

	captureComponentImg(): void {
		htmlToImage.toPng(this.fileExplorerRootContainer.nativeElement).then(htmlImg => {
			//console.log('img data:',htmlImg);

			const cmpntImg: TaskBarPreviewImage = {
				pid: this.processId,
				imageData: htmlImg,
			};
			this._runningProcessService.addProcessImage(this.name, cmpntImg);
		});
	}

	colorTabLayoutContainer(): void {
		this.tabLayoutCntnrStyle = {
			'background-color': '#403c3c',
		};
	}

	unColorTabLayoutContainer(): void {
		this.tabLayoutCntnrStyle = {
			'background-color': '',
		};
	}

	onMouseEnterTabLayoutBtn(iconView: string, id: number): void {
		this.changeTabLayoutIconCntnrCSS(id, true);
		this.changeFileExplorerLayoutCSS(iconView);
	}

	onMouseLeaveTabLayoutBtn(id: number): void {
		this.changeTabLayoutIconCntnrCSS(id, false);
		this.changeFileExplorerLayoutCSS(this.defaultviewOption);
	}

	onClickTabLayoutBtn(iconView: any, id: number): void {
		this.currentViewOptionId = id;
		this.currentViewOption = iconView;
		this.defaultviewOption = iconView;

		this.changeTabLayoutIconCntnrCSS(id, true);

		for (let i = 1; i <= 8; i++) {
			if (i != id) {
				this.changeTabLayoutIconCntnrCSS(i, false);
			}
		}
	}

	changeFileExplorerLayoutCSS(inputViewOption: any) {
		if (
			inputViewOption == this.smallIconsView ||
			inputViewOption == this.mediumIconsView ||
			inputViewOption == this.largeIconsView ||
			inputViewOption == this.extraLargeIconsView
		) {
			this.currentViewOption = inputViewOption;
			this.changeLayoutCss(inputViewOption);
			this.changeOrderedlistStyle(inputViewOption);
			this.changeButtonAndImageSize(inputViewOption);
		}

		if (inputViewOption == this.listView || inputViewOption == this.detailsView || inputViewOption == this.tilesView || inputViewOption == this.contentView) {
			this.currentViewOption = inputViewOption;
			this.changeLayoutCss(inputViewOption);
			this.changeOrderedlistStyle(inputViewOption);
		}
	}

	changeTabLayoutIconCntnrCSS(id: number, isMouseHover: boolean) {
		const btnElement = document.getElementById(`tabLayoutIconCntnr-${this.processId}-${id}`) as HTMLElement;
		if (this.currentViewOptionId == id) {
			if (btnElement) {
				btnElement.style.border = '0.5px solid #ccc';
				btnElement.style.margin = '-0.5px';

				if (isMouseHover) {
					btnElement.style.backgroundColor = '#807c7c';
				} else {
					btnElement.style.backgroundColor = '#605c5c';
				}
			}
		}

		if (this.currentViewOptionId != id) {
			if (btnElement) {
				if (isMouseHover) {
					btnElement.style.backgroundColor = '#403c3c';
					btnElement.style.border = '0.5px solid #ccc';
					btnElement.style.margin = '-0.5px';
				} else {
					btnElement.style.backgroundColor = '';
					btnElement.style.border = '';
					btnElement.style.margin = '0';
				}
			}
		}
	}

	changeLayoutCss(iconSize: string): void {
		const layoutOptions: string[] = [
			this.smallIconsView,
			this.mediumIconsView,
			this.largeIconsView,
			this.extraLargeIconsView,
			this.listView,
			this.detailsView,
			this.tilesView,
			this.contentView,
		];
		const cssLayoutOptions: string[] = ['icon-view', 'list-view', 'details-view', 'tiles-view', 'content-view'];
		const layoutIdx = layoutOptions.indexOf(iconSize);

		if (layoutIdx <= 3) {
			this.olClassName = 'ol-icon-size-view';
		} else if (layoutIdx >= 4) {
			/*
         the icon-views has various sizes, but it is still treated as one distinct layout. 
         So, options 0 - 3 in the layoutOptions = option 0 in the cssLayoutOptions
       */
			const idx = layoutIdx - 3;
			this.olClassName = `ol-${cssLayoutOptions[idx]}`;
		}
	}

	changeButtonAndImageSize(iconSize: string): void {
		const icon_sizes: string[] = [this.smallIconsView, this.mediumIconsView, this.largeIconsView, this.extraLargeIconsView];
		const fig_img_sizes: string[] = ['30px', '45px', '75px', '90px']; //small, med, large,ext large
		const btn_width_height_sizes = [
			['90px', '70px'],
			['110px', '90px'],
		];

		const iconIdx = icon_sizes.indexOf(iconSize);
		const btnIdx = iconIdx <= 2 ? 0 : 1;

		for (let i = 0; i < this.files.length; i++) {
			const btnElmnt = document.getElementById(`btnElmnt-${this.processId}-${i}`) as HTMLElement;
			const imgElmnt = document.getElementById(`imgElmnt-${this.processId}-${i}`) as HTMLElement;

			if (btnElmnt) {
				btnElmnt.style.width = btn_width_height_sizes[btnIdx][0];
				btnElmnt.style.height = btn_width_height_sizes[btnIdx][1];
			}

			if (imgElmnt) {
				imgElmnt.style.width = fig_img_sizes[iconIdx];
				imgElmnt.style.height = fig_img_sizes[iconIdx];
			}
		}
	}

	changeOrderedlistStyle(iconView: string): void {
		const icon_sizes: string[] = [this.smallIconsView, this.mediumIconsView, this.largeIconsView, this.extraLargeIconsView];
		const btn_width_height_sizes = [
			['90px', '70px'],
			['110px', '90px'],
		];
		const iconIdx = icon_sizes.indexOf(iconView);
		const btnIdx = iconIdx <= 2 ? 0 : 1;

		const olElmnt = document.getElementById(`olElmnt-${this.processId}`) as HTMLElement;

		if (iconView == this.smallIconsView || iconView == this.mediumIconsView || iconView == this.largeIconsView || iconView == this.extraLargeIconsView) {
			if (olElmnt) {
				olElmnt.style.gridTemplateColumns = `repeat(auto-fill,${btn_width_height_sizes[btnIdx][0]})`;
				olElmnt.style.gridTemplateRows = `repeat(auto-fill,${btn_width_height_sizes[btnIdx][1]})`;
				olElmnt.style.rowGap = '20px';
				olElmnt.style.columnGap = '0px';
				olElmnt.style.padding = '5px 0';
				olElmnt.style.gridAutoFlow = 'row';
			}
		} else if (iconView == this.contentView) {
			const rect = this.fileExplrCntntCntnr.nativeElement.getBoundingClientRect();
			if (olElmnt) {
				olElmnt.style.gridTemplateColumns = `repeat(auto-fill, minmax(50px, ${rect.width}px)`;
				olElmnt.style.gridTemplateRows = 'repeat(auto-fill, 43px)';
			}
		}
	}

	setNavButtonsColor(): void {
		this.prevNavBtnStyle = {
			fill: '#ccc',
		};

		this.nextNavBtnStyle = {
			fill: '#ccc',
		};

		this.recentNavBtnStyle = {
			fill: '#ccc',
		};

		this.upNavBtnStyle = {
			fill: '#fff',
		};
	}

	colorChevron(): void {
		this.recentNavBtnStyle = {
			fill: 'rgb(18, 107, 240)',
		};
	}

	unColorChevron(): void {
		this.recentNavBtnStyle = {
			fill: '#ccc',
		};
	}

	uncolorUpNavBtn(): void {
		this.upNavBtnCntnrStyle = {
			'background-color': '',
		};
	}

	colorUpNavBtn(): void {
		if (!this.isUpBtnActive) {
			this.upNavBtnCntnrStyle = {
				'background-color': '',
			};
		} else {
			this.upNavBtnCntnrStyle = {
				'background-color': '#3f3e3e',
				transition: 'background-color 0.3s ease',
			};
		}
	}

	async goUpAlevel(): Promise<void> {
		if (this.upPathEntries.length > 0) {
			const currentDirPath = this.directory;

			if (!this.isNavigatedBefore) {
				this.isNavigatedBefore = true;
				this.prevPathEntries.push(currentDirPath);
				this.isPrevBtnActive = true;
				this.prevNavBtnStyle = {
					fill: '#fff',
				};
			}

			let nextDirPath = this.upPathEntries.pop() ?? '';
			if (currentDirPath === nextDirPath) {
				nextDirPath = this.upPathEntries.pop() ?? '';
				this.directory = nextDirPath;
				this.prevPathEntries.push(nextDirPath);
			} else {
				this.directory = nextDirPath;
				this.prevPathEntries.push(nextDirPath);
			}

			const folderName = basename(this.directory);

			if (this.upPathEntries.length == 0) {
				this.isUpBtnActive = false;
				this.upNavBtnStyle = {
					fill: '#ccc',
				};
			}

			this.populateHopsList();
			this.setNavPathIcon(folderName, this.directory);
			await this.loadFilesInfoAsync();
		}
	}

	colorPrevNavBtn(): void {
		if (!this.isPrevBtnActive) {
			this.prevNavBtnStyle = {
				fill: '#ccc',
			};
		} else {
			this.prevNavBtnStyle = {
				fill: 'rgb(18, 107, 240)',
			};
		}
	}

	uncolorPrevNavBtn(): void {
		this.prevNavBtnStyle = {
			fill: '#ccc',
		};
	}

	async goBackAlevel(): Promise<void> {
		if (this.prevPathEntries.length > 0) {
			const currentDirPath = this.directory;

			if (this.recentPathEntries.indexOf(currentDirPath) == -1) {
				this.recentPathEntries.push(currentDirPath);
			}

			const idx = this.upPathEntries.indexOf(currentDirPath);
			if (idx != -1) {
				this.upPathEntries.splice(idx, 1);
			} else {
				this.upPathEntries.push(currentDirPath);
			}

			this.nextPathEntries.push(currentDirPath);
			this.isNextBtnActive = true;
			this.isUpBtnActive = true;
			this.nextNavBtnStyle = {
				fill: '#fff',
			};
			this.upNavBtnStyle = {
				fill: '#fff',
			};

			let nextDirPath = this.prevPathEntries.pop() ?? '';
			if (currentDirPath === nextDirPath) {
				nextDirPath = this.prevPathEntries.pop() ?? '';
				this.directory = nextDirPath;
			} else {
				this.directory = nextDirPath;
			}

			const folderName = basename(this.directory);

			if (this.prevPathEntries.length == 0) {
				this.isPrevBtnActive = false;
				this.prevNavBtnStyle = {
					fill: '#ccc',
				};
			}

			this.populateHopsList();
			this.setNavPathIcon(folderName, this.directory);
			await this.loadFilesInfoAsync();
		}
	}

	colorNextNavBtn(): void {
		if (!this.isNextBtnActive) {
			this.nextNavBtnStyle = {
				fill: '#ccc',
			};
		} else {
			this.nextNavBtnStyle = {
				fill: 'rgb(18, 107, 240)',
			};
		}
	}

	uncolorNextNavBtn(): void {
		this.nextNavBtnStyle = {
			fill: '#ccc',
		};
	}

	async goForwardAlevel(): Promise<void> {
		if (this.nextPathEntries.length > 0) {
			const currentDirPath = this.directory;
			this.prevPathEntries.push(currentDirPath);
			this.isPrevBtnActive = true;
			this.prevNavBtnStyle = {
				fill: '#fff',
			};

			const nextDirPath = (this.directory = this.nextPathEntries.pop() ?? '');
			const idx = this.upPathEntries.indexOf(nextDirPath);

			if (idx !== -1) {
				this.upPathEntries.splice(idx, 1);
			} else {
				this.upPathEntries.push(nextDirPath);
			}

			if (this.upPathEntries.length == 0) {
				this.isUpBtnActive = false;
				this.upNavBtnStyle = {
					fill: '#ccc',
				};
			}

			const folderName = basename(this.directory);
			if (this.nextPathEntries.length == 0) {
				this.isNextBtnActive = false;
				this.nextNavBtnStyle = {
					fill: '#ccc',
				};
			}

			this.populateHopsList();
			this.setNavPathIcon(folderName, this.directory);
			await this.loadFilesInfoAsync();
		}
	}

	ngOnDestroy(): void {
		this._viewByNotifySub?.unsubscribe();
		this._sortByNotifySub?.unsubscribe();
		this._refreshNotifySub?.unsubscribe();
		this._autoArrangeIconsNotifySub?.unsubscribe();
		this._autoAlignIconsNotifyBySub?.unsubscribe();
		this._dirFilesUpdatedSub?.unsubscribe();
	}

	onDragOver(event: DragEvent): void {
		event.stopPropagation();
		event.preventDefault();
	}

	async onDrop(event: DragEvent): Promise<void> {
		event.preventDefault();
		let droppedFiles: File[] = [];
		if (event?.dataTransfer?.files) {
			// eslint-disable-next-line no-unsafe-optional-chaining
			droppedFiles = [...event?.dataTransfer?.files];
		}

		if (droppedFiles.length >= 1) {
			const result = await this._fileService.writeFilesAsync(this.directory, droppedFiles);
			if (result) {
				await this.loadFilesInfoAsync();
			}
		}
	}

	private async loadFilesInfoAsync(): Promise<void> {
		this.files = [];
		this._fileService.resetDirectoryFiles();
		const directoryEntries = await this._fileService.getEntriesFromDirectoryAsync(this.directory);
		this._directoryFilesEntires = this._fileService.getFileEntriesFromDirectory(directoryEntries, this.directory);

		for (let i = 0; i < directoryEntries.length; i++) {
			const fileEntry = this._directoryFilesEntires[i];
			const fileInfo = await this._fileService.getFileInfoAsync(fileEntry.getPath);

			this.files.push(fileInfo);
		}
	}

	async runProcess(file: FileInfo): Promise<void> {
		console.log('fileexplorer-runProcess:', file);
		this.showInformationTip = false;
		// console.log('what was clicked:',file.fileName +'-----' + file.opensWith +'---'+ file.currentPath +'----'+ file.getIcon) TBD
		if (file.opensWith === 'fileexplorer' && file.fileName !== 'fileexplorer' && file.fileType === 'folder') {
			if (!this.isNavigatedBefore) {
				this.prevPathEntries.push(this.directory);
				this.upPathEntries.push(this.directory);
				this.isNavigatedBefore = true;
			}

			this.isPrevBtnActive = true;
			this.directory = file.currentPath;
			this.displayName = file.fileName;
			this.icon = file.iconPath;

			this.prevPathEntries.push(this.directory);
			this.upPathEntries.push(this.directory);

			if (this.recentPathEntries.indexOf(this.directory) == -1) {
				this.recentPathEntries.push(this.directory);
			}

			this.populateHopsList();
			this.setNavPathIcon(file.fileName, file.currentPath);
			this.storeAppState(file.currentPath);

			await this.loadFilesInfoAsync();
		} else {
			this._triggerProcessService.startApplication(file);
		}
	}

	setNavPathIcon(fileName: string, directory: string) {
		console.log(`fileexplorer - setNavPathIcon: fileName:${fileName} -----  directory:${directory}`);

		if (fileName === 'Desktop' && directory === '/Desktop') {
			this.navPathIcon = 'osdrive/icons/desktop.ico';
		} else if (fileName === 'Documents' && directory === '/Documents') {
			this.navPathIcon = 'osdrive/icons/documents.ico';
		} else if (fileName === 'Downloads' && directory === '/Downloads') {
			this.navPathIcon = 'osdrive/icons/downloads.png';
		} else if (fileName === 'Music' && directory === '/Music') {
			this.navPathIcon = 'osdrive/icons/music.png';
		} else if (fileName === 'Pictures' && directory === '/Pictures') {
			this.navPathIcon = 'osdrive/icons/pictures.ico';
		} else if (fileName === 'Videos' && directory === '/Videos') {
			this.navPathIcon = 'osdrive/icons/video.ico';
		} else if (fileName === 'Games' && directory === '/Games') {
			this.navPathIcon = 'osdrive/icons/games.ico';
		} else if ((fileName === 'fileexplorer' && directory === '/') || (fileName === '' && directory === '/')) {
			this.navPathIcon = 'osdrive/icons/my_computer.ico';
		} else {
			this.navPathIcon = 'osdrive/icons/folder.ico';
		}
	}

	onTriggerRunProcess(): void {
		this.runProcess(this.selectedFile);
	}

	onBtnClick(id: number): void {
		this.doBtnClickThings(id);
		this.setBtnStyle(id, true);
	}

	onShowIconContextMenu(evt: MouseEvent, file: FileInfo, id: number): void {
		const rect = this.fileExplrCntntCntnr.nativeElement.getBoundingClientRect();
		const x = evt.clientX - rect.left;
		const y = evt.clientY - rect.top;

		const uid = `${this.name}-${this.processId}`;
		this._runningProcessService.addEventOriginator(uid);

		this.selectedFile = file;
		this.isIconInFocusDueToPriorAction = false;
		this.showInformationTip = false;
		this.showCntxtMenu = !this.showCntxtMenu;

		// show IconContexMenu is still a btn click, just a different type
		this.doBtnClickThings(id);
		this.setBtnStyle(id, true);

		this.fxIconCntxtMenuStyle = {
			position: 'absolute',
			transform: `translate(${String(x)}px, ${String(y)}px)`,
			'z-index': 2,
		};

		evt.preventDefault();
	}

	doBtnClickThings(id: number): void {
		this.isIconInFocusDueToCurrentAction = true;
		this.isIconInFocusDueToPriorAction = false;
		this.prevSelectedElementId = this.selectedElementId;
		this.selectedElementId = id;

		this.isBtnClickEvt = true;
		this.btnClickCnt++;
		this.isHideCntxtMenuEvt = false;
		this.hideCntxtMenuEvtCnt = 0;

		if (this.prevSelectedElementId != id) {
			this.removeBtnStyle(this.prevSelectedElementId);
		}
	}

	onMouseEnter(evt: MouseEvent, file: FileInfo, id: number): void {
		this.showInformationTip = true;
		this.setBtnStyle(id, true);
		this.displayInformationTip(evt, file);
	}

	onMouseLeave(id: number): void {
		this.showInformationTip = false;
		//this.hideInformationTip = false;

		if (id != this.selectedElementId) {
			this.removeBtnStyle(id);
		} else if (id == this.selectedElementId && this.isIconInFocusDueToPriorAction) {
			this.setBtnStyle(id, false);
		}
	}

	setBtnStyle(id: number, isMouseHover: boolean): void {
		const btnElement = document.getElementById(`btnElmnt-${this.processId}-${id}`) as HTMLElement;
		if (btnElement) {
			btnElement.style.backgroundColor = '#4c4c4c';
			btnElement.style.border = '1px solid #3c3c3c';

			if (this.selectedElementId == id) {
				if (isMouseHover && this.isIconInFocusDueToCurrentAction) {
					btnElement.style.backgroundColor = '#787474';
				}

				if (!isMouseHover && this.isIconInFocusDueToCurrentAction) {
					btnElement.style.backgroundColor = '#787474';
				}

				if (isMouseHover && this.isIconInFocusDueToPriorAction) {
					btnElement.style.backgroundColor = '#4c4c4c';
				}

				if (!isMouseHover && this.isIconInFocusDueToPriorAction) {
					btnElement.style.backgroundColor = 'transparent';
					btnElement.style.border = '0.5px solid white';
				}
			}
		}
	}

	btnStyleAndValuesReset(): void {
		this.isBtnClickEvt = false;
		this.btnClickCnt = 0;
		this.removeBtnStyle(this.selectedElementId);
		this.removeBtnStyle(this.prevSelectedElementId);
		this.selectedElementId = -1;
		this.prevSelectedElementId = -1;
		this.btnClickCnt = 0;
		this.isIconInFocusDueToPriorAction = false;
	}

	btnStyleAndValuesChange(): void {
		this.isBtnClickEvt = false;
		this.btnClickCnt = 0;
		this.prevSelectedElementId = this.selectedElementId;
		this.isIconInFocusDueToPriorAction = true;
		this.isIconInFocusDueToCurrentAction = false;
		this.setBtnStyle(this.selectedElementId, false);
		//this.removeBtnStyle(this.prevSelectedElementId);
	}

	removeBtnStyle(id: number): void {
		const btnElement = document.getElementById(`btnElmnt-${this.processId}-${id}`) as HTMLElement;
		if (btnElement) {
			btnElement.style.backgroundColor = 'transparent';
			btnElement.style.border = 'none';
		}
	}

	doNothing(): void {
		/** */
	}

	onCopy(): void {
		const action = 'copy';
		const result = this.selectedFile.currentPath;
		this._menuService.storeData.next([result, action]);
	}

	onCut(): void {
		const action = 'copy';
		const action1 = 'remove';
		const result = this.selectedFile.currentPath;
		this._menuService.storeData.next([result, action, action1]);
	}

	onHideIconContextMenu(): void {
		this.showCntxtMenu = false;

		//First case - I'm clicking only on the desktop icons
		if (this.isBtnClickEvt && this.btnClickCnt >= 1 && !this.isHideCntxtMenuEvt && this.hideCntxtMenuEvtCnt == 0) {
			if (this.isRenameActive) {
				this.isFormDirty();
			}
			if (this.isIconInFocusDueToPriorAction) {
				if (this.hideCntxtMenuEvtCnt >= 0) this.setBtnStyle(this.selectedElementId, false);
			}
			if (!this.isRenameActive) {
				this.isBtnClickEvt = false;
				this.btnClickCnt = 0;
			}
		} else {
			this.hideCntxtMenuEvtCnt++;
			this.isHideCntxtMenuEvt = true;
			//Second case - I was only clicking on the desktop
			if (this.isHideCntxtMenuEvt && this.hideCntxtMenuEvtCnt >= 1 && !this.isBtnClickEvt && this.btnClickCnt == 0) {
				this.isIconInFocusDueToCurrentAction = false;
				this.btnStyleAndValuesChange();
			}

			// //Third case - I was clicking on the desktop icons, then i click on the desktop.
			// //clicking on the desktop triggers a hideContextMenuEvt
			// if((this.isBtnClickEvt && this.btnClickCnt >= 1) && (this.isHideCntxtMenuEvt && this.hideCntxtMenuEvtCnt > 1)){
			//   this.isIconInFocusDueToCurrentAction = false;
			//   console.log('3rd----this.isIconInFocusDueToCurrentAction:', this.isIconInFocusDueToCurrentAction );
			//   this.btnStyleAndValuesReset();
			// }
		}
	}

	preventDesktopContextMenu(evt: MouseEvent): void {
		const uid = `${this.name}-${this.processId}`;
		this._runningProcessService.addEventOriginator(uid);

		evt.preventDefault();
	}

	onDragStart(evt: any): void {
		// const rect =  this.myBounds.nativeElement.getBoundingClientRect();
		// console.log('start:',evt.id )
		// const btnTransform = window.getComputedStyle(evt)
		// const matrix = new DOMMatrixReadOnly(btnTransform.transform)
		// const transform = {
		//   translateX: matrix.m41,
		//   translateY: matrix.m42
		// }
		// // const transX = matrix.m41;
		// // const transY = matrix.m42;
		// console.log('start-transform:', transform)
		// console.log('rect:',rect )
	}

	onDragEnd(evt: any): void {
		1;
	}

	setFileExplorerWindowToFocus(pid: number): void {
		this._runningProcessService.focusOnCurrentProcessNotify.next(pid);
	}

	sortIcons(sortBy: string): void {
		if (sortBy === 'Size') {
			this.files = this.files.sort((objA, objB) => objB.size - objA.size);
		} else if (sortBy === 'Date Modified') {
			this.files = this.files.sort((objA, objB) => objB.dateModified.getTime() - objA.dateModified.getTime());
		} else if (sortBy === 'Name') {
			this.files = this.files.sort((objA, objB) => {
				return objA.fileName < objB.fileName ? -1 : 1;
			});
		} else if (sortBy === 'Item Type') {
			this.files = this.files.sort((objA, objB) => {
				return objA.fileType < objB.fileType ? -1 : 1;
			});
		}
	}

	// this method is gross
	displayInformationTip(evt: MouseEvent, file: FileInfo): void {
		const rect = this.fileExplrCntntCntnr.nativeElement.getBoundingClientRect();
		const x = evt.clientX - rect.left - 15;
		const y = evt.clientY - rect.top + 10;

		setTimeout(() => {
			const infoTip = document.getElementById(`fx-information-tip-${this.processId}`) as HTMLDivElement;
			if (infoTip) {
				setTimeout(() => {
					infoTip.style.display = 'block';
					infoTip.style.transform = `translate(${String(x)}px, ${String(y)}px)`;
					infoTip.style.position = 'absolute';
					infoTip.style.zIndex = '3';

					this.setInformationTipInfo(file);

					//this.hideInformationTip = true;
					// if(this.hideInformationTip){
					//   setTimeout(()=>{ // hide after 9 secs
					//     this.hideInformationTip = false;
					//     this.showInformationTip = false;
					//   },this.SECONDS_DELAY[3])
					// }
				}, this.SECONDS_DELAY[1]); //wait 1.5 seconds
			}
		}, this.SECONDS_DELAY[0]); // wait 100th of a sec
	}

	setInformationTipInfo(file: FileInfo): void {
		//console.log('file:',file);

		const formatSize = new Intl.NumberFormat('en-US', {
			style: 'unit',
			unit: 'byte',
			unitDisplay: 'narrow',
			notation: 'compact',
			maximumFractionDigits: 2,
		}).format;

		const infoTipFields = ['Author:', 'Item type:', 'Date created:', 'Date modified:', 'Dimesions:', 'General', 'Size:', 'Type:'];
		const fileAuthor = 'Relampago Del Catatumbo';
		const fileType = file.fileType;
		const fileDateModified = file.dateModifiedUS;
		const fileSize = formatSize(file.size);
		const fileName = file.fileName;

		//reset
		this.fileInfoTipData = [];

		if (this._consts.IMAGE_FILE_EXTENSIONS.includes(file.fileType)) {
			const img = new Image();
			img.src = file.iconPath;
			const width = img?.naturalWidth;
			const height = img?.naturalHeight;
			const imgDimesions = `${width} x ${height}`;

			this.fileInfoTipData.push({ label: infoTipFields[1], data: `${file.fileType.replace('.', '').toLocaleUpperCase()} File` });
			this.fileInfoTipData.push({ label: infoTipFields[4], data: imgDimesions });
			this.fileInfoTipData.push({ label: infoTipFields[6], data: fileSize });
		}

		if (fileType === '.txt') {
			this.fileInfoTipData.push({ label: infoTipFields[7], data: 'Text Document' });
			this.fileInfoTipData.push({ label: infoTipFields[3], data: fileDateModified });
			this.fileInfoTipData.push({ label: infoTipFields[6], data: fileSize });
		}

		if (fileType === 'folder') {
			if (fileName === 'Desktop' || fileName === 'Documents' || fileName === 'Downloads') {
				this.fileInfoTipData.push({ label: infoTipFields[2], data: fileDateModified });
			} else if (fileName === 'Music') {
				this.fileInfoTipData.push({ label: '', data: 'Contains music and other audio files' });
			} else if (fileName === 'Videos') {
				this.fileInfoTipData.push({ label: '', data: 'Contains movies and other video files' });
			} else if (fileName === 'Pictures') {
				this.fileInfoTipData.push({ label: '', data: 'Contains digital photos, images and graphic files' });
			} else {
				this.fileInfoTipData.push({ label: infoTipFields[7], data: fileType });
				this.fileInfoTipData.push({ label: infoTipFields[2], data: fileDateModified });
			}
		}
	}

	async refreshIcons(): Promise<void> {
		this.isIconInFocusDueToPriorAction = false;
		await this.loadFilesInfoAsync();
	}

	async onDeleteFile(): Promise<void> {
		let result = false;
		if (this.selectedFile.isFile) {
			result = await this._fileService.deleteFileAsync(this.selectedFile.currentPath);
		} else {
			result = await this._fileService.deleteFolderAsync(this.selectedFile.currentPath);
		}

		if (result) {
			await this.loadFilesInfoAsync();
		}
	}

	onKeyPress(evt: KeyboardEvent): boolean {
		const regexStr = '^[a-zA-Z0-9_]+$';
		const res = new RegExp(regexStr).test(evt.key);

		if (res) {
			this.hideInvalidCharsToolTip();
			return res;
		} else {
			this.showInvalidCharsToolTip();

			setTimeout(() => {
				// hide after 6 secs
				this.hideInvalidCharsToolTip();
			}, this.SECONDS_DELAY[2]);

			return res;
		}
	}

	onInputChange(): void {
		const SearchTxtBox = document.getElementById(`searchTxtBox-${this.processId}`) as HTMLInputElement;
		const charLength = SearchTxtBox.value.length;
		if (charLength > 0) {
			this.isSearchBoxNotEmpty = true;
		} else if (charLength <= 0) {
			this.isSearchBoxNotEmpty = false;
		}

		this.resetSearchIconHiglight();
		this.resetClearSearchIconHiglight();
	}

	onClearSearchTextBox(): void {
		const SearchTxtBox = document.getElementById(`searchTxtBox-${this.processId}`) as HTMLInputElement;
		SearchTxtBox.value = '';
		this.isSearchBoxNotEmpty = false;

		this.resetSearchIconHiglight();
		this.resetClearSearchIconHiglight();
	}

	handleClearSearchIconHighlights(): void {
		this.onClearSearchIconHover = !this.onClearSearchIconHover;

		if (this.isSearchBoxNotEmpty) {
			if (this.onClearSearchIconHover) {
				this.clearSearchStyle = {
					'background-color': '#3f3e3e',
					transition: 'background-color 0.3s ease',
				};
			} else if (!this.onClearSearchIconHover) {
				this.clearSearchStyle = {
					'background-color': '#191919',
				};
			}
		}
	}

	resetClearSearchIconHiglight(): void {
		this.clearSearchStyle = {
			'background-color': '#191919',
		};

		if (!this.isSearchBoxNotEmpty) {
			this.onClearSearchIconHover = false;
		}
	}

	handleSearchIconHighlights(): void {
		this.onSearchIconHover = !this.onSearchIconHover;

		if (this.isSearchBoxNotEmpty) {
			if (this.onSearchIconHover) {
				this.searchStyle = {
					'background-color': 'rgb(18, 107, 240)',
					transition: 'background-color 0.3s ease',
				};
			} else if (!this.onSearchIconHover) {
				this.searchStyle = {
					'background-color': 'blue',
				};
			}
		}
	}

	resetSearchIconHiglight(): void {
		if (this.isSearchBoxNotEmpty) {
			this.searchStyle = {
				'background-color': 'blue',
			};
		} else {
			this.searchStyle = {
				'background-color': '#191919',
			};

			this.onSearchIconHover = false;
		}
	}

	onSearch(): void {
		const searchText = this.searchForm.value.searchInput as string;
	}

	showPathTextBox(): void {
		const pathTxtBoxCntrElement = document.getElementById(`pathTxtBoxCntr-${this.processId}`) as HTMLElement;
		const pathTxtBoxElement = document.getElementById(`pathTxtBox-${this.processId}`) as HTMLInputElement;
		const pathIconBoxElement = document.getElementById(`pathIconBox-${this.processId}`) as HTMLElement;

		if (pathTxtBoxCntrElement) {
			pathTxtBoxCntrElement.style.display = 'flex';
		}

		if (pathTxtBoxElement) {
			pathTxtBoxElement.style.display = 'block';

			if (this.showPathHistory) {
				if (this.directory === '/') {
					this.pathForm.setValue({
						pathInput: '/',
					});
				}
			} else {
				this.pathForm.setValue({
					pathInput: this.directory,
				});
			}
			pathTxtBoxElement?.focus();
			pathTxtBoxElement?.select();
		}

		if (pathIconBoxElement) {
			pathIconBoxElement.style.display = 'none';
		}
	}

	hidePathTextBox(): void {
		const pathTxtBoxCntrElement = document.getElementById(`pathTxtBoxCntr-${this.processId}`) as HTMLElement;
		const pathTxtBoxElement = document.getElementById(`pathTxtBox-${this.processId}`) as HTMLElement;
		const pathIconBoxElement = document.getElementById(`pathIconBox-${this.processId}`) as HTMLElement;

		if (pathTxtBoxElement) {
			pathTxtBoxElement.style.display = 'none';
		}

		if (pathTxtBoxCntrElement) {
			pathTxtBoxCntrElement.style.display = 'none';
		}

		if (pathIconBoxElement) {
			pathIconBoxElement.style.display = 'flex';
		}
	}

	hidePathTextBoxOnload(): void {
		const pathTxtBoxCntrElement = document.getElementById(`pathTxtBoxCntr-${this.processId}`) as HTMLElement;
		const pathTxtBoxElement = document.getElementById(`pathTxtBox-${this.processId}`) as HTMLElement;

		if (pathTxtBoxElement) {
			pathTxtBoxElement.style.display = 'none';
		}

		if (pathTxtBoxCntrElement) {
			pathTxtBoxCntrElement.style.display = 'none';
		}
	}

	populateHopsList(): void {
		const tmpArray = this.directory.split('/');
		tmpArray.shift();
		this._directoryHops = tmpArray;
		console.log('this._directoryHops:', this._directoryHops);
	}

	showInvalidCharsToolTip(): void {
		// get the position of the textbox
		const invalidCharToolTipElement = document.getElementById(`invalidChars-${this.processId}`) as HTMLElement;
		const renameContainerElement = document.getElementById(`renameContainer-${this.processId}-${this.selectedElementId}`) as HTMLElement;

		const fileRect = this.fileExplrCntntCntnr.nativeElement.getBoundingClientRect();
		const rect = renameContainerElement.getBoundingClientRect();

		const x = rect.left - fileRect.left;
		const y = rect.top - fileRect.top;

		if (invalidCharToolTipElement) {
			invalidCharToolTipElement.style.transform = `translate(${x + 2}px, ${y + 2}px)`;
			invalidCharToolTipElement.style.zIndex = '2';
			invalidCharToolTipElement.style.opacity = '1';
			invalidCharToolTipElement.style.transition = 'opacity 0.5s ease';
		}
	}

	hideInvalidCharsToolTip(): void {
		const invalidCharToolTipElement = document.getElementById(`invalidChars-${this.processId}`) as HTMLElement;

		if (invalidCharToolTipElement) {
			invalidCharToolTipElement.style.transform = `translate(${-100000}px, ${100000}px)`;
			invalidCharToolTipElement.style.zIndex = '-1';
			invalidCharToolTipElement.style.opacity = '0';
			invalidCharToolTipElement.style.transition = 'opacity 0.5s ease 1';
		}
	}

	isFormDirty(): void {
		if (this.renameForm.dirty == true) {
			this.onRenameFileTxtBoxDataSave();
		} else if (this.renameForm.dirty == false) {
			this.renameFileTriggerCnt++;
			if (this.renameFileTriggerCnt > 1) {
				this.onRenameFileTxtBoxHide();
				this.renameFileTriggerCnt = 0;
			}
		}
	}

	onRenameFileTxtBoxShow(): void {
		this.isRenameActive = !this.isRenameActive;

		const figCapElement = document.getElementById(`figCapElmnt-${this.processId}-${this.selectedElementId}`) as HTMLElement;
		const renameContainerElement = document.getElementById(`renameContainer-${this.processId}-${this.selectedElementId}`) as HTMLElement;
		const renameTxtBoxElement = document.getElementById(`renameTxtBox-${this.processId}-${this.selectedElementId}`) as HTMLInputElement;

		//TODO: fileexplorer behaves differently from the desktop
		//this.removeBtnStyle(this.selectedElementId);

		if (figCapElement) {
			figCapElement.style.display = 'none';
		}

		if (renameContainerElement) {
			renameContainerElement.style.display = 'block';
			this.currentIconName = this.selectedFile.fileName;
			this.renameForm.setValue({
				renameInput: this.currentIconName,
			});

			renameTxtBoxElement?.focus();
			renameTxtBoxElement?.select();
		}
	}

	async onRenameFileTxtBoxDataSave(): Promise<void> {
		this.isRenameActive = !this.isRenameActive;

		const figCapElement = document.getElementById(`figCapElmnt-${this.processId}-${this.selectedElementId}`) as HTMLElement;
		const renameContainerElement = document.getElementById(`renameContainer-${this.processId}-${this.selectedElementId}`) as HTMLElement;
		const renameText = this.renameForm.value.renameInput as string;

		if (renameText !== '' && renameText.length !== 0 && renameText !== this.currentIconName) {
			const result = await this._fileService.renameAsync(this.selectedFile.currentPath, renameText, this.selectedFile.isFile);

			if (result) {
				// renamFileAsync, doesn't trigger a reload of the file directory, so to give the user the impression that the file has been updated, the code below
				const fileIdx = this.files.findIndex(f => f.currentPath == this.selectedFile.contentPath && f.fileName == this.selectedFile.fileName);
				this.selectedFile.fileName = renameText;
				this.selectedFile.dateModified = Date.now();
				this.files[fileIdx] = this.selectedFile;

				this.renameForm.reset();
				await this.loadFilesInfoAsync();
			}
		} else {
			this.renameForm.reset();
		}

		this.setBtnStyle(this.selectedElementId, false);
		this.renameFileTriggerCnt = 0;

		if (figCapElement) {
			figCapElement.style.display = 'block';
		}

		if (renameContainerElement) {
			renameContainerElement.style.display = 'none';
		}
	}

	onRenameFileTxtBoxHide(): void {
		this.isRenameActive = !this.isRenameActive;

		const figCapElement = document.getElementById(`figCapElmnt-${this.processId}-${this.selectedElementId}`) as HTMLElement;
		const renameContainerElement = document.getElementById(`renameContainer-${this.processId}-${this.selectedElementId}`) as HTMLElement;

		if (figCapElement) {
			figCapElement.style.display = 'block';
		}
		if (renameContainerElement) {
			renameContainerElement.style.display = 'none';
		}

		this.isIconInFocusDueToPriorAction = true;
		this.isIconInFocusDueToCurrentAction = false;
	}

	showSearchHistory(): void {
		const searchHistoryElement = document.getElementById(`searchHistory-${this.processId}`) as HTMLElement;
		if (searchHistoryElement) {
			if (this.searchHistory.length > 0) {
				searchHistoryElement.style.display = 'block';
			}
		}
	}

	hideSearchHistory(): void {
		// this.isSearchBoxinFocus = !this.isSearchBoxinFocus ;
		const searchHistoryElement = document.getElementById(`searchHistory-${this.processId}`) as HTMLElement;
		searchHistoryElement.style.display = 'none';
	}

	hideshowPathHistory(): void {
		const pathHistoryElement = document.getElementById(`pathHistory-${this.processId}`) as HTMLElement;
		const hdrNavPathCntnrElement = document.getElementById(`hdrNavPathCntnr-${this.processId}`) as HTMLElement;
		const minus24 = hdrNavPathCntnrElement.offsetWidth - 25;

		this.showPathHistory = !this.showPathHistory;

		if (this.showPathHistory) {
			if (pathHistoryElement) {
				if (this.pathHistory.length > 0) {
					pathHistoryElement.style.display = 'block';
					pathHistoryElement.style.width = `${minus24}px`;
				}
			}
		} else if (!this.showPathHistory) {
			pathHistoryElement.style.display = 'none';
		}
	}

	hidePathHistory(): void {
		const pathHistoryElement = document.getElementById(`pathHistory-${this.processId}`) as HTMLElement;
		pathHistoryElement.style.display = 'none';
		this.showPathHistory = false;
	}

	storeAppState(app_data: unknown): void {
		const uid = `${this.name}-${this.processId}`;

		this._appState = {
			pid: this.processId,
			app_data: app_data,
			app_name: this.name,
			unique_id: uid,
		};

		this._stateManagmentService.addState(uid, this._appState, StateType.App);
	}

	retrievePastSessionData(): void {
		const pickUpKey = this._sessionManagmentService._pickUpKey;
		if (this._sessionManagmentService.hasTempSession(pickUpKey)) {
			const tmpSessKey = this._sessionManagmentService.getTempSession(pickUpKey) || '';
			const retrievedSessionData = this._sessionManagmentService.getSession(tmpSessKey) as BaseState[];

			if (retrievedSessionData !== undefined) {
				const appSessionData = retrievedSessionData[0] as AppState;
				if (appSessionData !== undefined && appSessionData.app_data != '') {
					this.directory = appSessionData.app_data as string;
				}
			}
		}
	}

	maximizeWindow(): void {
		const uid = `${this.name}-${this.processId}`;
		const evtOriginator = this._runningProcessService.getEventOrginator();

		if (uid === evtOriginator) {
			this._runningProcessService.removeEventOriginator();
			const mainWindow = document.getElementById('vanta');
			//window title and button bar, and windows taskbar height
			const pixelTosubtract = 30 + 40;
			this.fileExplrMainCntnr.nativeElement.style.height = `${(mainWindow?.offsetHeight || 0) - pixelTosubtract}px`;
			this.fileExplrMainCntnr.nativeElement.style.width = `${mainWindow?.offsetWidth}px`;
		}
	}

	private getComponentDetail(): Process {
		return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type);
	}
}
