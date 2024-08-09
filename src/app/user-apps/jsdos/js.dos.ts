import { DosOptions } from 'emulators-ui/dist/types/js-dos';
import { ClientIdSupplier } from 'js-dos';

export interface DosPlayerOptions extends DosOptions {
	style?: 'default' | 'none' | 'hidden';
	clientId?: ClientIdSupplier;
	onExit?: () => void;
	noSideBar?: boolean;
	noFullscreen?: boolean;
	noSocialLinks?: boolean;
}
