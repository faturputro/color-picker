import IRGBColor from "./IRGBColor";
import IHSLColor from "./IHSLColor";

export default interface ICardProps {
  key?: string | number;
  hex: string;
  rgb: IRGBColor;
  hsl: IHSLColor;
  dismissible: boolean;
  _onRemove: (key: string) => void;
  _onClick: (key: string) => void;
}
