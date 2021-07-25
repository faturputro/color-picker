import { useState, useEffect } from 'react';
import defaultColors from "../defaultColors";
import Card from "../components/Card";
import { hexToRGB, RGBToHSL } from "../plugins/converter";
import { set, get } from '../plugins/localStorage';
import { ISetColorPayload } from "../interfaces/ISetColor";

const ColorList = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selected, setSelected]= useState<string[]>([]);
  const [inputVal, setInputVal]= useState<string>('');
  const [checkbox, setCheckbox]= useState([
    {
      checked: false,
      value: 'r',
      title: 'Red > 50%',
    },
    {
      checked: false,
      value: 'g',
      title: 'Green > 50%',
    },
    {
      checked: false,
      value: 'b',
      title: 'Blue > 50%',
    },
    {
      checked: false,
      value: 's',
      title: 'Saturation > 50%',
    }
  ]);
  const [colors, setColors] = useState<ISetColorPayload[]>(defaultColors.map((item: string) => {
    const rgb = hexToRGB(item);

    return {
      hex: item,
      hsl: RGBToHSL(rgb.code),
      rgb,
      isRemovable: false
    };
  }));

  useEffect(() => {
    fetchColors();
  }, [])

  const onRemove = (key: string) => {
    const filtered = colors.filter((item) => item.hex !== key);
    setColors((prev) => [...filtered]);
    set({ key: 'colors', payload: colors });
    alert('Color successfully removed.');
  }

  const onCardClicked = (key: string) => {
    setVisible(true);
  }

  const onCheckChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected((selected) => [...selected, e.target.value]);
    } else {
      const filtered = selected.filter((v: string) => v !== e.target.value);
      setSelected(filtered);
    }
  }

  const addColor = () => {
    if ((/[0-9A-Fa-f]{6}/g).test(inputVal)) {
      const rgb = hexToRGB(inputVal);
      const data = {
        hex: `#${inputVal}`,
        rgb,
        hsl: RGBToHSL(rgb.code),
        isRemovable: true,
      };
      setColors((prevColors) => [...prevColors, data]);
      set({ key: 'colors', payload: colors });
      alert('Color successfully added.')
    } else {
      alert('Please input a correct color value!')
    }
  }

  const fetchColors = () => {
    const items: ISetColorPayload[] = get('colors');
    if (items.length > 0) {
      setColors(items);
    }
  }

  return (
    <div>
      <div className="flex items-center">
        <label>Add New Color</label>
        <input className="ml-4" type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)}/>
        <button type="button" onClick={addColor}>Add</button>
      </div>
      <hr/>
      <div className="flex items-center mb-4">
        {
          checkbox.map((item) => (
            <div key={item.value} className="flex mr-4">
              <input
                type="checkbox"
                value={item.value}
                onChange={(e) => onCheckChanged(e)}/> {item.title}
            </div>
          ))
        }
      </div>
      <div className="grid grid-cols gap-2">
        {
          colors.map((item, i) => (
            <Card
              rgb={item.rgb}
              hex={item.hex}
              hsl={item.hsl}
              key={`${item.hex}-${i}`}
              dismissible={item.isRemovable}
              _onRemove={onRemove}
              _onClick={onCardClicked}
            />
          ))
        }
      </div>
    </div>
  );
}

export default ColorList;
