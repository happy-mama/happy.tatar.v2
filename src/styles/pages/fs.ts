import styled from "styled-components";
import globals from "../globals";
import { Link } from "react-router-dom";

const fs = {
  container: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;

    max-height: calc(100vh - 142px);
    margin: 10px 40px 0px 40px;

    border-radius: 4px;

    transition: 0.2s;
  `,
  header: styled.div`
    padding: 5px 0px 5px 20px;
    border-radius: 4px 4px 0px 0px;
    border: 1px solid ${globals.color.bg.darkLite};
    border-bottom: 1px solid ${globals.color.bg.darkMiddle};

    background-color: ${globals.color.bg.transparent20};

    font-family: ${globals.fonts.Inter.default};
    color: ${globals.color.text.default};
    font-size: ${globals.size.text.large};
    line-height: ${globals.size.text.large};
  `,
  content: styled.div`
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;

    overflow: hidden;

    border-radius: 0px 0px 4px 4px;
    border: 1px solid ${globals.color.bg.darkLite};
    border-top: 0px;
  `,
  pathUrl: styled.div`
    margin-left: 10px;
    padding: 5px;

    height: fit-content;
    width: fit-content;

    background-color: ${globals.color.bg.darkStrong};
    border-radius: 4px;

    font-family: ${globals.fonts.Inter.default};
    color: ${globals.color.text.default};
    font-size: ${globals.size.text.small};
    line-height: ${globals.size.text.small};
  `,
  buttonsContainer: styled.div`
    display: flex;

    gap: 10px;

    padding: 5px 0px 5px 10px;

    align-items: center;

    min-height: 30px;
    height: 30px;
  `,
  files: styled.div`
    display: flex;
    flex-direction: column;

    gap: 5px;

    padding: 10px;

    overflow-x: hidden;
    overflow-y: auto;
  `,
  dir: styled(Link)`
    display: flex;
    gap: 10px;

    padding: 5px;

    border: 1px solid transparent;

    text-decoration: none;

    transition: 0.2s;

    &:hover {
      border: 1px solid ${globals.color.bg.darkLite};
      transform: translate(5px);
    }
  `,
  dirName: styled.div`
    font-family: ${globals.fonts.Inter.default};
    color: ${globals.color.text.default};
    font-size: ${globals.size.text.lite};
    line-height: ${globals.size.text.lite};
  `,
  dirImg: styled.img``,
  upload: {
    container: styled.div<{ $show: boolean }>`
      display: flex;
      flex-direction: column;
      gap: 5px;

      min-height: ${props => (props.$show ? "120px" : "0px")};
      height: ${props => (props.$show ? "120px" : "0px")};
      padding: ${props => (props.$show ? "10px" : "0px")};

      border-bottom: 1px solid ${globals.color.bg.darkMiddle};

      transition: 0.5s;

      overflow: hidden;
    `,
    inliner: styled.div`
      display: grid;
      gap: 10px 10px 10px;
      grid-template-columns: 100px 1fr;

      align-items: center;
    `,
    inputText: styled.input`
      height: 22px;

      background-color: ${globals.color.bg.fsInput};
      border: 1px solid transparent;
      border-bottom: 1px solid ${globals.color.bg.darkMiddle};
      border-radius: 4px;

      color: ${globals.color.text.default};

      &:focus-visible {
        outline: none;
        border-bottom: 1px solid ${globals.color.bg.darkLite};
      }
    `,
    buttonLabel: styled.label``,
    fileData: styled.div`
      font-family: ${globals.fonts.Inter.default};
      color: ${globals.color.text.default};
    `,
    status: styled.div<{ $type: "danger" | "success" | "warning" }>`
      display: inline-block;

      font-family: ${globals.fonts.Inter.default};
      color: ${props => globals.color.text[props.$type]};
    `,

    statusName: styled.div`
      display: inline-block;

      margin-right: 10px;
      height: 24px;
    `,
    statusSize: styled.div`
      display: inline-block;

      margin-right: 2px;
      height: 24px;
    `,
    statusLabel: styled.div`
      display: inline-block;
      height: 24px;
    `,
  },
  loading: styled.div<{ $show: boolean }>`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    opacity: ${props => (props.$show ? "1" : "0")};

    font-family: ${globals.fonts.Inter.default};
    color: ${globals.color.text.default};
    font-size: ${globals.size.text.large};
    line-height: ${globals.size.text.large};

    transition: 0.2s;
    pointer-events: ${props => (props.$show ? "all" : "none")};
    z-index: +1;
  `,
};

export default fs;
