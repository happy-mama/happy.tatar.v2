import { useEffect, useState } from "react";

import passgen from "@/styles/pages/passgen";
import utils from "@/styles/utils";

const Passgen = () => {
  const [checks, setChecks] = useState({
    numbers: true,
    uppercase: true,
    lowercase: true,
    special: false,
    dots: false,
    lines: false,
  });

  const [length, setLength] = useState(20);
  const [password, setPassword] = useState("");

  const handleCheckClick = (
    type: "numbers" | "uppercase" | "lowercase" | "special" | "dots" | "lines"
  ) => {
    checks[type] = !checks[type];
    setChecks({ ...checks });
  };

  const handleLength = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLength(Number(e.target.value));
  };

  const templates = [
    "0123456789",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "abcdefghijklmnopqrstuvwxyz",
    "!%*^()?@#$&~",
    ".,:;'\"`",
    "/\\|-_",
  ];

  const tryGen = (templateMap: string[]) => {
    let attempts = length;
    let pass = "";

    while (attempts > 0) {
      const templateIndex = Math.floor(Math.random() * templateMap.length);
      const templateSymbol = Math.floor(
        Math.random() * templateMap[templateIndex].length
      );

      pass += templateMap[templateIndex][templateSymbol];

      attempts--;
    }

    const st = Math.floor(Math.random() * length);
    const sc = Math.floor(Math.random() * length);

    if (st > sc) {
      pass = pass.slice(sc, st);
    } else {
      pass = pass.slice(st, sc);
    }

    pass = pass.split("").reverse().join("");

    let regen = length - pass.length;

    while (regen > 0) {
      const templateIndex = Math.floor(Math.random() * templateMap.length);
      const templateSymbol = Math.floor(
        Math.random() * templateMap[templateIndex].length
      );

      pass += templateMap[templateIndex][templateSymbol];

      regen--;
    }

    return pass;
  };

  const gen = () => {
    setPassword("Generating...");

    const templateMap: string[] = [];

    Object.values(checks).forEach((v, i) => {
      if (v) {
        templateMap.push(templates[i]);
      }
    });

    if (!templateMap.length) {
      return;
    }

    let attempts = 500;

    while (attempts > 0) {
      const tryPass = tryGen(templateMap);
      let pass = 0;

      templateMap.forEach(temp => {
        let any = false;

        temp.split("").forEach(t => {
          if (tryPass.includes(t)) {
            return (any = true);
          }
        });

        if (any) {
          pass++;
        }
      });

      if (pass >= templateMap.length) {
        setPassword(tryPass);
        attempts = -1;
      }

      attempts--;
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    gen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <passgen.container>
      <passgen.header>Passgen</passgen.header>
      <passgen.content>
        <passgen.litHeader>Options</passgen.litHeader>
        <utils.spacer $height="10px" />
        <passgen.checkboxBody>
          <passgen.select value={length} onChange={handleLength}>
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={16}>16</option>
            <option value={20}>20</option>
            <option value={24}>24</option>
            <option value={28}>28</option>
            <option value={32}>32</option>
          </passgen.select>
          <passgen.checkboxText>length</passgen.checkboxText>
        </passgen.checkboxBody>
        <passgen.checkboxBody>
          <passgen.checkBox
            type="checkbox"
            checked={checks.numbers}
            onChange={() => handleCheckClick("numbers")}
          />
          <passgen.checkboxText>
            numbers <utils.embedText>0 - 9</utils.embedText>
          </passgen.checkboxText>
        </passgen.checkboxBody>
        <passgen.checkboxBody>
          <passgen.checkBox
            type="checkbox"
            checked={checks.uppercase}
            onChange={() => handleCheckClick("uppercase")}
          />
          <passgen.checkboxText>
            uppercase letters <utils.embedText>A - Z</utils.embedText>
          </passgen.checkboxText>
        </passgen.checkboxBody>
        <passgen.checkboxBody>
          <passgen.checkBox
            type="checkbox"
            checked={checks.lowercase}
            onChange={() => handleCheckClick("lowercase")}
          />
          <passgen.checkboxText>
            lowercase letters <utils.embedText>a - z</utils.embedText>
          </passgen.checkboxText>
        </passgen.checkboxBody>
        <passgen.checkboxBody>
          <passgen.checkBox
            type="checkbox"
            checked={checks.special}
            onChange={() => handleCheckClick("special")}
          />
          <passgen.checkboxText>
            special symbols{" "}
            <utils.embedText>! % * ^ ( ) ? @ # $ & ~</utils.embedText>
          </passgen.checkboxText>
        </passgen.checkboxBody>
        <passgen.checkboxBody>
          <passgen.checkBox
            type="checkbox"
            checked={checks.dots}
            onChange={() => handleCheckClick("dots")}
          />
          <passgen.checkboxText>
            dots <utils.embedText>. , : ; ' " `</utils.embedText>
          </passgen.checkboxText>
        </passgen.checkboxBody>
        <passgen.checkboxBody>
          <passgen.checkBox
            type="checkbox"
            checked={checks.lines}
            onChange={() => handleCheckClick("lines")}
          />
          <passgen.checkboxText>
            lines <utils.embedText>/ \ | - _</utils.embedText>
          </passgen.checkboxText>
        </passgen.checkboxBody>
        <utils.spacer $height="10px" />

        <passgen.litHeader />
        <passgen.password>{password}</passgen.password>
        <passgen.footer>
          <utils.inlineElements>
            <utils.button onClick={gen}>Generate</utils.button>
            <utils.button onClick={copy}>Copy</utils.button>
          </utils.inlineElements>
        </passgen.footer>
      </passgen.content>
    </passgen.container>
  );
};

export default Passgen;
