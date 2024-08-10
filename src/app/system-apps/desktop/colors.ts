export interface RGB {
	r: number;
	g: number;
	b: number;
}

export interface HSL {
	h: number;
	s: number;
	l: number;
}

export function changeHue(hexColor: string, degree: number): string | undefined {
	// Ensure the input is a valid hexadecimal color
	const hexRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
	if (!hexRegex.test(hexColor)) {
		console.error('Invalid hexadecimal color code');
		return;
	}

	// Remove the hash character (#) and convert to RGB
	const rgbColor = hexColor.substring(1);
	const bigint = parseInt(rgbColor, 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;

	// Convert RGB to HSL
	const hslColor = rgbToHsl(r, g, b);

	// Shift the hue
	hslColor.h += degree;

	// Ensure hue is within the valid range [0, 360)
	hslColor.h = (hslColor.h + 360) % 360;

	// Convert HSL back to RGB
	const finalRgbColor = hslToRgb(hslColor.h, hslColor.s, hslColor.l);

	// Convert RGB back to hexadecimal
	const finalHexColor = rgbToHex(finalRgbColor.r, finalRgbColor.g, finalRgbColor.b);

	return `#${finalHexColor}`;
}

// Convert RGB to HSL
export function rgbToHsl(r: number, g: number, b: number): HSL {
	r /= 255;
	g /= 255;
	b /= 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const lighting = (max + min) / 2;
	if (max === min) {
		return { h: 0, s: 0, l: lighting * 100 };
	}
	let hue;
	const gap = max - min;
	const saturation = lighting > 0.5 ? gap / (2 - max - min) : gap / (max + min);
	switch (max) {
		case r:
			hue = (g - b) / gap + (g < b ? 6 : 0);
			break;
		case g:
			hue = (b - r) / gap + 2;
			break;
		case b:
			hue = (r - g) / gap + 4;
			break;
	}

	if (hue) hue /= 6;

	return { h: hue || 1 * 360, s: saturation * 100, l: lighting * 100 };
}

// Convert HSL to RGB
export function hslToRgb(h: number, s: number, l: number): RGB {
	h /= 360;
	s /= 100;
	l /= 100;

	if (s === 0) {
		return { r: l, g: l, b: l };
	}
	const hue2rgb = (p: number, q: number, t: number) => {
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1 / 6) return p + (q - p) * 6 * t;
		if (t < 1 / 2) return q;
		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
		return p;
	};

	const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	const p = 2 * l - q;

	return {
		r: hue2rgb(p, q, h + 1 / 3) * 255,
		g: hue2rgb(p, q, h) * 255,
		b: hue2rgb(p, q, h - 1 / 3) * 255,
	};
}

// Convert RGB to Hex
export function rgbToHex(r: number, g: number, b: number): string {
	const toHex = (value: number) => {
		const hex = Math.round(value).toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};

	return toHex(r) + toHex(g) + toHex(b);
}
