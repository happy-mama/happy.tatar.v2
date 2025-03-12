import styled from "styled-components";
import globals from "@/styles/globals";

const canvas = {
  container: styled.div`
    width: calc(100vw - 50px);
    height: calc(100vh - 90px);

    margin-inline: 25px;
    background-color: white;
    transition: all 0.1s;
  `,

  controlsWrapper: styled.div`
    position: fixed;

    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    z-index: ${globals.zIndex.canvasController};
  `,
  controlsContainer: styled.div`
    display: flex;
    gap: 4px;

    padding: 4px;
    background-color: ${globals.color.bg.white};

    border: 1px solid black;
    border-radius: 4px;
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
};

export default canvas;
