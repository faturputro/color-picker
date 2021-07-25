import IRGBColor from "./IRGBColor";
import IHSLColor from "./IHSLColor";

export interface ISetColorPayload {
  hex: string;
  rgb: IRGBColor;
  hsl: IHSLColor;
  isRemovable: boolean;
};

export interface ISetColor {
  key: string;
  payload: ISetColorPayload[];
}
