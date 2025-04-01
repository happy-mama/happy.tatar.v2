import { Link } from "react-router-dom";
import styled from "styled-components";
import globals from "@/styles/globals";

interface Spacer {
  $width?: string;
  $height?: string;
}

interface Text {
  $size?: keyof (typeof globals)["size"]["text"];
  $color?: keyof (typeof globals)["color"]["text"];
  $ruby?: boolean;
  $width?: string;
  $minWidth?: string;
  $maxWidth?: string;
  $height?: string;
  $minHeight?: string;
  $maxHeight?: string;
  $code?: boolean;
  $elepsis?: boolean;
  $margin?: string;
}

interface Img {
  $height?: string;
  $width?: string;
}

interface ttMagic {
  $transition?: string;
  $translate?: string;
}

const utils = {
  center: styled.div`
    margin: auto;
  `,
  JustifySpaceAlign: styled.div`
    display: flex;

    gap: 10px;

    justify-content: space-between;
    align-items: center;
  `,
  silentLink: styled(Link)`
    text-decoration: none;

    transition: color 0.2s;

    :hover {
      color: ${globals.color.text.link};

      * {
        color: ${globals.color.text.link};
      }
    }
  `,
  spacer: styled.div<Spacer>`
    width: ${props => props.$width || "0px"};
    height: ${props => props.$height || "0px"};
  `,
  liner: styled.div<Spacer & { $color?: string }>`
    width: ${props => props.$width || "1px"};
    height: ${props => props.$height || "1px"};

    margin: auto;

    background-color: ${props => props.$color || globals.color.bg.liner};
  `,
  inlineElements: styled.div`
    display: flex;

    gap: 10px;
    width: fit-content;

    @media (max-width: 700px) {
      flex-flow: column;
      gap: 5px;
    }
  `,
  embedText: styled.div`
    display: ruby;
    font-size: inherit;
    line-height: inherit;

    padding: 0px 2px 0px 2px;
    background-color: ${globals.color.bg.embedText};
    border-radius: 3px;
  `,
  text: styled.div<Text>`
    display: ${props => (props.$ruby ? "ruby" : "block")};

    margin: ${props => props.$margin};

    width: ${props => props.$width};
    min-width: ${props => props.$minWidth};
    max-width: ${props => props.$maxWidth};
    height: ${props => props.$height};
    min-height: ${props => props.$minHeight};
    max-height: ${props => props.$maxHeight};

    font-family: ${props =>
      props.$code ? "monospace" : globals.fonts.Inter.default};
    font-size: ${props =>
      globals.size.text[props.$size ? props.$size : "normal"]};

    color: ${props =>
      props.$color ? globals.color.text[props.$color] : "inherit"};

    overflow: ${props => (props.$elepsis ? "hidden" : "")};
    text-overflow: ${props => (props.$elepsis ? "ellipsis" : "")};
    overflow-wrap: break-word;
    word-break: break-all;
  `,
  cursorPointer: styled.div`
    cursor: pointer;
  `,
  bgHoverHighLighter: styled.div`
    background-color: transparent;
    border-radius: 5px;

    width: fit-content;
    height: fit-content;

    &:hover {
      background-color: ${globals.color.bg.highlite};
    }
  `,
  img: styled.img<Img>`
    height: ${props => props.$height};
    width: ${props => props.$width};
  `,
  ttMagic: styled.div<ttMagic>`
    transition: ${props => props.$transition || "0.5s"};

    &:hover {
      transform: translate(${props => props.$translate || "-3px, -1px"});
    }
  `,
  wave: styled.pre`
    margin: 0px;

    font-family: monospace;
    font-size: 12px;
    color: ${globals.color.text.dark};

    mask-image: linear-gradient(to bottom, white, transparent);
    overflow: hidden;
  `,
  hider: styled.div<{ $show: boolean; $transition?: string }>`
    transition: ${props => props.$transition || "0.2s"};
    opacity: ${props => (props.$show ? "1" : "0")};
  `,
  textInput: styled.input`
    display: block;

    min-width: 300px;
    width: 100%;

    height: 22px;

    background-color: ${globals.color.bg.fsInput};
    border: 1px solid transparent;
    border-bottom: 1px solid ${globals.color.bg.darkMiddle};
    border-radius: 4px;

    color: ${globals.color.text.default};

    transition: all 0.2s;

    &:focus {
      border-bottom: 1px solid ${globals.color.bg.darkLite};
    }

    &:focus-visible {
      outline: none;
    }
  `,
  block: styled.div<{ $pos?: "top" | "bottom" }>`
    display: flex;
    flex-direction: column;
    gap: 10px;

    padding: 10px;

    border-radius: ${props =>
      props.$pos
        ? props.$pos == "top"
          ? "4px 4px 0px 0px"
          : "0px 0px 4px 4px"
        : "4px"};
    border: 1px solid ${globals.color.bg.darkLite};
    border-top: ${props =>
      props.$pos && props.$pos == "bottom" ? "none" : ""};

    background-color: ${globals.color.bg.transparent20};
  `,
  button: styled.div`
    display: flex;
    align-items: center;

    padding: 0px 4px 0px 4px;
    min-height: 24px;
    width: fit-content;

    border: 1px solid ${globals.color.bg.darkMiddle};
    border-radius: 4px;

    font-family: ${globals.fonts.Inter.default};
    color: ${globals.color.text.default};
    font-size: ${globals.size.text.small};
    line-height: ${globals.size.text.small};

    transition: 0.5s;
    cursor: pointer;

    &:hover {
      border: 1px solid ${globals.color.bg.darkLite};
    }
  `,
};

export default utils;
