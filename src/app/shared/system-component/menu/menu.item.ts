export interface GeneralMenu {
	icon: string;
	label: string;
	action(): void;
}

export interface DesktopMenu {
	icon1: string;
	icon2: string;
	label: string;
	nest: DesktopMenuItem[];
	action: () => void;
	emptyline: boolean;
}

export interface DesktopMenuItem {
	icon: string;
	label: string;
	action(): void;
	variables?: boolean;
	emptyline: boolean;
	styleOption: string;
}
