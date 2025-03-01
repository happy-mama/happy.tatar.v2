import styled from "styled-components";
import globals from "../globals";

const calc = {
  container: styled.div`
    display: flex;

    flex-direction: column;

    margin: auto;
    width: 500px;

    font-family: ${globals.fonts.Zain.extraBold};

    transition: all 0.1s;

    @media (max-width: 700px) {
      width: 100%;
      height: 80%;
    }
  `,

  screen: styled.input`
    height: 50px;
    padding-left: 10px;

    color: ${globals.color.text.default};
    background-color: ${globals.color.bg.fsInput};

    border: 1px solid transparent;
    border-bottom: 1px solid ${globals.color.bg.blueNuclear};
    border-radius: 4px;

    font-size: 20px;
    font-family: inherit;

    transition: inherit;

    &:focus-visible {
      outline: none;
    }

    @media (max-width: 700px) {
      font-size: 40px;
      height: 80px;
    }
  `,
  keyboard: styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);

    gap: 5px;

    transition: inherit;

    @media (max-width: 700px) {
      gap: 20px;
    }
  `,
  button: styled.button`
    height: 40px;
    width: auto;

    color: ${globals.color.text.default};
    font-size: 20px;
    font-family: inherit;

    background-color: ${globals.color.bg.fsInput};

    border: 1px solid transparent;
    border-bottom: 1px solid ${globals.color.bg.blueNuclear};
    border-radius: 4px;

    cursor: pointer;
    transition: inherit;

    &:hover {
      background-color: ${globals.color.bg.blueHard};
    }
    &:active {
      background-color: ${globals.color.bg.blueLite};
    }

    @media (max-width: 700px) {
      height: 75px;
      font-size: 40px;
    }
  `,
};

export default calc;
