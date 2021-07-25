import IRGBColor from "../interfaces/IRGBColor";
import IHSLColor from "../interfaces/IHSLColor";

export const hexToRGB = (hex: string): IRGBColor => {
  if (hex.length === 6 || hex !== '') {
    let r: string = '0';
    let g: string = '0';
    let b: string = '0';

    r = '0x' + hex[1] + hex[2];
    g = '0x' + hex[3] + hex[4];
    b = '0x' + hex[5] + hex[6];

    return {
      code: `rgb(${+r}, ${+g}, ${+b})`,
      r: +r,
      g: +g,
      b: +b,
    };
  }
  return {
    code: 'rgb(255, 255, 255)',
    r: 255,
    g: 255,
    b: 255,
  };
}

export const RGBToHSL = (rgb: string = 'rgb(255, 255, 255)'): IHSLColor => {
  const parsedRGB: string[] = rgb.replace(/[^0-9,]/g, '').split(',');

  for (let R in parsedRGB) {
    let r = parsedRGB[R];
    if (r.indexOf("%") > -1) {
      parsedRGB[R] = String(Math.round(Number(r.substr(0, r.length - 1)) / 100 * 255));
    }
  }
  let r: number = +parsedRGB[0] / 255;
  let g: number = +parsedRGB[1] / 255;
  let b: number = +parsedRGB[2] / 255;

  let cmin: number = Math.min(r,g,b);
  let cmax: number = Math.max(r,g,b);
  let delta: number = cmax - cmin;
  let h: number = 0;
  let s: number = 0;
  let l: number = 0;

  if (delta === 0) {
    h = 0;
  } else if (cmax === r) {
    h = ((g - b) / delta) % 6;
  } else if (cmax === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }
  h = Math.round(h * 60);
  if (h < 0) {
    h += 360;
  }
  l = (cmax + cmin) / 2;

  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return {
    code: `hsl(${h}, ${s}%, ${l}%)`,
    h,
    s,
    l,
  };
}
