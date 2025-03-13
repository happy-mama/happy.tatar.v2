import styled from "styled-components";
import globals from "@/styles/globals";

const canvas = {
  container: styled.div`
    width: 100vw;
    height: calc(100vh - ${globals.size.height.header});

    background-color: white;
    transition: all 0.1s;
  `,

  controlWrapper: styled.div`
    position: fixed;
    display: flex;

    justify-content: space-between;
    width: 60%;

    top: 5px;
    left: 50%;

    transform: translateX(-50%);
    z-index: ${globals.zIndex.canvasController};
  `,
  controlContainer: styled.div<{ $hide?: boolean }>`
    display: flex;
    gap: 4px;

    padding: 4px;
    background-color: ${globals.color.bg.white};

    border: 1px solid black;
    border-radius: 4px;

    opacity: ${props => (props.$hide ? "0" : "1")};
    transition: opacity 0.1s;
  `,
  controlButton: styled.button<{ $active: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;

    border: 1px solid black;
    border-radius: 4px;

    background-color: ${props => (props.$active ? "#ccc" : "transparent")};

    cursor: ${props => (props.$active ? "default" : "pointer")};
  `,
  colorContainer: styled.div<{ $isSaved: boolean }>`
    display: flex;

    justify-content: center;
    align-items: center;

    border-radius: 4px;
    background-color: ${props =>
      props.$isSaved ? "transparent" : globals.color.text.warning};

    transition: background-color 0.1s;
  `,
  colorText: styled.div`
    height: min-content;

    margin-right: 2px;

    font-family: ${globals.fonts.Inter.default};
    font-size: 14px;
  `,
  colorInput: styled.input`
    width: 55px;
  `,
};

export default canvas;
