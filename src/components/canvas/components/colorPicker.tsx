import { Popover } from "react-tiny-popover";
import { HexColorPicker } from "react-colorful";
import { useEffect, useRef, useState } from "react";

import canvas from "@/styles/pages/canvas";
import useDebouncedValue from "./debounce";

type props = {
  value: string;
  onChange: (color: string) => void;
};

const ALLOWED_CHARACTERS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  null,
];

const colorToUser = (color: string) => {
  return color.replace("#", "").toUpperCase();
};
const colorToCode = (color: string) => {
  return color.replace("#", "").toLowerCase();
};

const validateCharacter = (char: string | null) => {
  if (!char) return true;

  if (ALLOWED_CHARACTERS.includes(char.toLowerCase())) return true;

  return false;
};

const validateColor = (color: string) => {
  if (!color) return false;

  color = colorToCode(color.replaceAll("#", ""));

  const result = color.match(/^(?:[0-9a-fA-F]{3}){1,2}$/);

  if (!result) return false;
  if (result.length > 1) return false;

  return true;
};

const ColorPicker = (p: props) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [inputValue, setInputValue] = useState(colorToUser(p.value));
  const ignoreCallback = useRef(true);
  const debouncedColor = useDebouncedValue(inputValue, 800);

  const handleColorChange = (color: string) => {
    ignoreCallback.current = false;
    setInputValue(colorToUser(color));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const curValue = colorToUser(e.currentTarget.value);

    if (curValue.length > 6) return;

    // @ts-expect-error nativeEvent has 'data' property
    const inputData = e.nativeEvent.data;

    if (validateColor(inputData) || validateCharacter(inputData)) {
      ignoreCallback.current = false;
      setInputValue(curValue);
    }
  };

  const onClickOutside = () => {
    setIsColorPickerOpen(false);

    if (validateColor(inputValue)) {
      p.onChange("#" + inputValue.toLowerCase());
    } else setInputValue(colorToUser(p.value));
  };

  useEffect(() => {
    setInputValue(colorToUser(p.value));
    ignoreCallback.current = true;
  }, [p.value]);

  useEffect(() => {
    if (!inputValue && ignoreCallback.current) {
      setInputValue(colorToUser(p.value));
    }
  }, [inputValue, p.value]);

  useEffect(() => {
    if (!ignoreCallback.current) {
      if (validateColor(debouncedColor)) {
        const newColor = "#" + debouncedColor.toLowerCase();

        if (newColor != p.value) p.onChange(newColor);
      } else {
        setInputValue(colorToUser(p.value));
      }

      ignoreCallback.current = true;
    }
  }, [debouncedColor, p]);

  return (
    <Popover
      positions={["bottom"]}
      isOpen={isColorPickerOpen}
      onClickOutside={onClickOutside}
      padding={10}
      content={
        <HexColorPicker color={inputValue} onChange={handleColorChange} />
      }
    >
      <canvas.colorContainer
        $isSaved={ignoreCallback.current}
        onClick={() => {
          setIsColorPickerOpen(!isColorPickerOpen);
        }}
      >
        <canvas.colorText>fill color</canvas.colorText>
        <canvas.colorInput value={inputValue} onChange={handleInputChange} />
      </canvas.colorContainer>
    </Popover>
  );
};

export default ColorPicker;
