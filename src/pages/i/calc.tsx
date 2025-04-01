import calc from "@/styles/pages/calc";
import utils from "@/styles/utils";
import Mexp from "math-expression-evaluator";
import { useRef, useState } from "react";

const NUMBERS = "0123456789.";
const OPERATORS = "+-*/";
const BRACKETS = "()";

const CalcPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [validateError, setValidateError] = useState("");
  const [validateErrorShow, setValidateErrorShow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const insert = (value: string) => {
    setValidateErrorShow(false);

    if (
      inputRef.current &&
      typeof inputRef.current.selectionStart == "number"
    ) {
      const index = inputRef.current.selectionStart;

      setInputValue(
        inputValue.slice(0, index) + value + inputValue.slice(index)
      );

      requestAnimationFrame(() => {
        inputRef.current!.select();
        inputRef.current!.setSelectionRange(index + 1, index + 1);
      });
    }
  };

  const erase = () => {
    setValidateErrorShow(false);

    if (
      inputRef.current &&
      typeof inputRef.current.selectionStart == "number"
    ) {
      const index = inputRef.current.selectionStart;

      if (index > 0) {
        setInputValue(inputValue.slice(0, index - 1) + inputValue.slice(index));
      }

      requestAnimationFrame(() => {
        inputRef.current!.select();
        inputRef.current!.setSelectionRange(index - 1, index - 1);
      });
    }
  };

  const moveSelector = (side: "left" | "right") => {
    if (!inputRef.current) return;

    const index = inputRef.current.selectionStart || 0;

    requestAnimationFrame(() => {
      inputRef.current!.select();

      if (side == "left") {
        inputRef.current!.setSelectionRange(index - 1, index - 1);
      } else {
        if (index + 1 > inputValue.length) {
          inputRef.current!.setSelectionRange(0, 0);
        } else {
          inputRef.current!.setSelectionRange(index + 1, index + 1);
        }
      }
    });
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setValidateErrorShow(false);

    const validate = (char: string) => {
      if (
        !NUMBERS.includes(char) &&
        !OPERATORS.includes(char) &&
        !BRACKETS.includes(char)
      ) {
        return false;
      } else {
        return true;
      }
    };

    if (e.nativeEvent.type == "input") {
      // @ts-expect-error e.nativeEvent has data property
      if (validate(e.nativeEvent.data)) {
        setInputValue(
          e.currentTarget.value.replaceAll("*", "×").replaceAll("/", "÷")
        );
      }
    }

    // @ts-expect-error e.nativeEvent has inputType property
    if (e.nativeEvent.inputType == "deleteContentBackward")
      setInputValue(
        e.currentTarget.value.replaceAll("*", "×").replaceAll("/", "÷")
      );
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") solve();
  };

  const clear = () => {
    setInputValue("");
    setValidateErrorShow(false);
  };

  const solve = () => {
    const mexp = new Mexp();

    const expression = inputValue.replaceAll("×", "*").replaceAll("÷", "/");

    if (!expression) return;

    try {
      const answer = mexp.eval(expression);

      if (isNaN(answer)) {
        setValidateError("Error: can't devide by zero");
        setValidateErrorShow(true);
      } else {
        setValidateErrorShow(false);
        setInputValue(String(answer));
      }
    } catch (e) {
      setValidateError(String(e).replaceAll("*", "×").replaceAll("/", "÷"));
      setValidateErrorShow(true);
    }
  };

  return (
    <calc.container>
      <calc.screen
        ref={inputRef}
        value={inputValue}
        onInput={handleInput}
        onKeyUp={handleKeyUp}
      />

      <utils.hider $show={validateErrorShow}>
        <utils.text $size="lite" $color="danger" $height="40px">
          {validateError}
        </utils.text>
      </utils.hider>

      <utils.spacer $height="10px" />

      <calc.keyboard>
        <calc.button onClick={clear}>AC</calc.button>
        <calc.button onClick={erase}>CE</calc.button>
        <calc.button onClick={() => insert("(")}>(</calc.button>
        <calc.button onClick={() => insert(")")}>)</calc.button>
        <calc.button onClick={() => insert("^")}>^</calc.button>

        <calc.button onClick={() => insert("7")}>7</calc.button>
        <calc.button onClick={() => insert("8")}>8</calc.button>
        <calc.button onClick={() => insert("9")}>9</calc.button>
        <calc.button onClick={() => insert("÷")}>÷</calc.button>
        <calc.button onClick={() => insert("×")}>×</calc.button>

        <calc.button onClick={() => insert("4")}>4</calc.button>
        <calc.button onClick={() => insert("5")}>5</calc.button>
        <calc.button onClick={() => insert("6")}>6</calc.button>
        <calc.button onClick={() => insert("-")}>-</calc.button>
        <calc.button onClick={() => insert("+")}>+</calc.button>

        <calc.button onClick={() => insert("1")}>1</calc.button>
        <calc.button onClick={() => insert("2")}>2</calc.button>
        <calc.button onClick={() => insert("3")}>3</calc.button>
        <calc.button onClick={solve}>=</calc.button>
        <calc.button />

        <calc.button onClick={() => insert("0")}>0</calc.button>
        <calc.button onClick={() => insert(".")}>.</calc.button>
        <calc.button />
        <calc.button onClick={() => moveSelector("left")}>←</calc.button>
        <calc.button onClick={() => moveSelector("right")}>→</calc.button>
      </calc.keyboard>
    </calc.container>
  );
};

export default CalcPage;
