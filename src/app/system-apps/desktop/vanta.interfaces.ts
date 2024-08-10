export interface HALO {
	el: string;
	mouseControls?: true;
	touchControls?: true;
	gyroControls?: false;
	minHeight?: 200.0;
	minWidth?: 200.0;
	backgroundColor?: 0x131a43;
	baseColor?: 0x1a59;
	size?: 1;
	amplitudeFactor?: 1;
	xOffset?: 0;
	yOffset?: 0;
}

export interface BIRDS {
	el: string;
	mouseControls?: true;
	touchControls?: true;
	gyroControls?: false;
	minHeight?: 200.0;
	minWidth?: 200.0;
	backgroundColor?: 0x7192f;
	backgroundAlpha?: 1;
	baseColor?: 0x1a59;
	color1?: 0xff0000;
	color2?: 0xd1ff;
	quantity?: 5;
	birdSize?: 1;
	wingSpan?: 30;
	speedLimit?: 5;
	separation?: 20;
	alignment?: 20;
	cohesion?: 20;
	colorMode?: 'lerp' | 'variance' | 'lerpGradient' | 'varianceGradient';
}

export interface WAVE {
	el: string;
	mouseControls?: true;
	touchControls?: true;
	gyroControls?: false;
	minHeight?: 200.0;
	minWidth?: 200.0;
	scale?: 1.0;
	scaleMobile?: 1.0;
	color?: 0x5588;
	shininess?: 30;
	waveHeight?: 15;
	waveSpeed?: 1;
	zoom?: 1;
}

export interface RINGS {
	el: string;
	mouseControls?: true;
	touchControls?: true;
	gyroControls?: false;
	minHeight?: 200.0;
	minWidth?: 200.0;
	scale?: 1.0;
	scaleMobile?: 1.0;
	color?: 0x88ff00;
	backgroundColor?: 0x202428;
	backgroundAlpha?: 1;
}

export interface GLOBE {
	el: string;
	mouseControls?: true;
	touchControls?: true;
	gyroControls?: false;
	minHeight?: 200.0;
	minWidth?: 200.0;
	scale?: 1.0;
	scaleMobile?: 1.0;
	color?: 0xff3f81;
	color2?: 0xffffff;
	backgroundColor?: 0x23153c;
	size?: 1;
}
