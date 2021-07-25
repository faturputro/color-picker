import {ISetColor, ISetColorPayload} from "../interfaces/ISetColor";

export const set = (data: ISetColor): void => {
  const values = JSON.stringify(data.payload)
  localStorage.setItem(data.key, values);
};

export const get = (key: string): ISetColorPayload[] | [] => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data!);
  }
  return [];
}
