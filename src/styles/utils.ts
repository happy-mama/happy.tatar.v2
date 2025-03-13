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
  $width?: "fit-content" | "min-content";
  $height?: string;
  $code?: boolean;
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
  silentLink: styled(Link)`
    text-decoration: none;

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

    margin: 0;

    width: ${props => props.$width};
    height: ${props => props.$height};

    font-family: ${props =>
      props.$code ? "monospace" : globals.fonts.Inter.default};
    font-size: ${props =>
      globals.size.text[props.$size ? props.$size : "normal"]};

    color: ${props =>
      props.$color ? globals.color.text[props.$color] : "inherit"};
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
};

export default utils;
